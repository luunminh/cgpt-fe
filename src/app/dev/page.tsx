'use client';

import { DateFormat, formatDate, isEmpty } from '@shared/utils';

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

import { Button } from '@ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { useEffect, useState } from 'react';
import { IoTrash } from 'react-icons/io5';
import { todoStore } from './todo-store';
import { useCustomStore } from './useCustomStore';

export default function Dev() {
  // const todos = useSyncExternalStore(todoStore.subscribe, todoStore.getTodos);
  const todos = useCustomStore(todoStore.subscribe, todoStore.getTodos);

  const [inputValue, setInputValue] = useState('');
  const debouchedInputValue = useDebounce(inputValue, 500);

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <Card className="w-[350px]">
      <input value={debouchedInputValue} onChange={handleOnChange} />

      <CardHeader>
        <CardTitle>Dev Test CMP</CardTitle>
        <CardDescription>Implement Zustand</CardDescription>
      </CardHeader>
      <CardContent>
        <>
          <ul>
            {isEmpty(todos) ? (
              <span>empty todods</span>
            ) : (
              todos.map((todo) => (
                <li key={todo.id}>
                  {todo.content}
                  <Button className="ml-2" onClick={() => todoStore.deleteTodo(todo.id)}>
                    <IoTrash />
                  </Button>
                </li>
              ))
            )}
          </ul>
        </>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() =>
            todoStore.addTodo(
              `Todo: ${formatDate(new Date(), DateFormat.MONTH_DATE_YEAR_TIME_SECOND_12)}`,
            )
          }
        >
          Add todo
        </Button>
      </CardFooter>
    </Card>
  );
}
