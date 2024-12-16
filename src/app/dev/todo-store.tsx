import { Callback } from '@shared/utils';

enum ActionTypes {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
}

type Action = {
  type: ActionTypes;
  id?: string;
  content?: string;
};

interface State {
  id: string;
  content: string;
}

let store: State[] = [];
let listeners: Array<Callback> = [];

const reducer = (state: State[], action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODO:
      return [...state, { id: action.id, content: action.content }];
    case ActionTypes.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case ActionTypes.UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, content: action.content } : todo,
      );
    default:
      return state;
  }
};

const dispatch = (action: Action) => {
  store = reducer(store, action);
  emitChange();
};

const emitChange = () => {
  for (let listener of listeners) {
    listener();
  }
};

/**
 * @see https://react.dev/reference/react/useSyncExternalStore#subscribing-to-an-external-store
 */
export const todoStore = {
  /**
   * - The subscribe function returns an unsubscribe function.
   * - When the component using useCustomStore unmounts or the subscribe function changes, React will call this unsubscribe function.
   * - The unsubscribe function removes handleStoreChange from the listeners array, stopping it from being called on future store changes.
   * @param listener
   * @returns
   */
  subscribe: (listener: (callBack: Callback) => void) => {
    /**
     * push the internal onChange function to the listeners array
     * the listener will be called when the store changes (dispatch is called) to force render a internal state inside the hook
     */
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  addTodo: (content: string) =>
    dispatch({ type: ActionTypes.ADD_TODO, content, id: Math.random().toString(36).substring(7) }),
  deleteTodo: (id: string) => dispatch({ type: ActionTypes.DELETE_TODO, id }),
  updateTodo: (id: string, content: string) =>
    dispatch({ type: ActionTypes.UPDATE_TODO, id, content }),
  getTodos: () => store,
};
