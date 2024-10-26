import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from './validations';

export const emptyFunction = (..._args: any[]) => {};

export const getRandomId = (): string => uuidv4();

export const dataURLtoFile = (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime });
};

export const generateArray = (length: number, initial = '') => Array(length).fill(initial);

export const handleGetError = (touched: any, errors: any, prefix: any) => {
  return _.get(touched, prefix) ? _.get(errors, prefix) : '';
};

export const waiter = (time = 100) => {
  return new Promise<Array<any>>((res) => setTimeout(() => res([]), time));
};

export const trimUrlHasEndDate = (url: string) => {
  const trimUrl = url.split('?')[0];
  const items = trimUrl.split('_');
  return items.slice(0, items.length - 1).join('');
};

export const trimUrl = (url: string) => {
  if (!url) return null;
  return url.split('?')[0];
};

/**
 * Wrap your callback with func skip event propagation and prevent default
 */
export const handleClick = (callback: (_arg0: MouseEvent) => void) => (event: MouseEvent) => {
  event.stopPropagation();
  event.preventDefault();
  if (callback) callback(event);
};

// link https://stackoverflow.com/questions/42674473/get-all-keys-of-a-deep-object-in-javascript
export const deepKeys = (t: unknown, path: string[] = []) => {
  const res: string[] =
    Object(t) === t
      ? Object.entries(t) // 1
          .flatMap(([k, v]) => deepKeys(v, [...path, k]))
      : [path.join('.')]; // 2
  return res?.filter((x: string) => !/\d$/.test(x));
};

export const scrollToTopError = (error: string[]) => {
  if (!isEmpty(error)) {
    const input = document.querySelector(`[name='${error[0]}']`);
    if (input) {
      const { parentElement } = input;
      parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      parentElement?.focus({ preventScroll: true });
    }
  }
};

export const handleScrollToTopError = <T>(errors: T) =>
  setTimeout(() => {
    scrollToTopError(deepKeys(errors));
  }, 100);

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const getFieldNameByPrefix = (prefix: string, name: string) => {
  if (!prefix) return name;

  return `${prefix}.${name}`;
};

export const formatTextEllipsisStyles = (numberLine = 2) => {
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: numberLine,
    overflowWrap: 'break-word',
    WebkitBoxOrient: 'vertical',
  };
};
