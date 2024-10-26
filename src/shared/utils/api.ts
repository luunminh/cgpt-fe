import { common } from '@config/common.config';
import { CancelToken } from 'apisauce';
import { isEmpty } from './validations';

export function newCancelToken(timeout = common.CONNECTION_TIMEOUT) {
  const source = CancelToken.source();
  setTimeout(() => {
    source.cancel();
  }, timeout);

  return { cancelToken: source.token };
}

/**
 *
 * @param params - Object to stringify
 * @param excludeKey - Exclude list keys to stringify, example key with type boolean
 * @returns string
 */
export const stringify = (
  params: { [key: string]: number | string | string[] | boolean },
  excludeKey: string[] = [],
) => {
  let result = '';

  if (!params) return '';

  Object.keys(params).forEach((key) => {
    if (!isEmpty(params[`${key}`]) || excludeKey.includes(`${key}`)) {
      if (Array.isArray(params[`${key}`])) {
        const array = params[`${key}`] as string[];
        array.forEach((param: string) => {
          result += `&${key}=${encodeURIComponent(param)}`;
        });
      } else {
        result += `&${key}=${encodeURIComponent(params[`${key}`].toString())}`;
      }
    }
  });

  result = result.replace(/^&/, '');

  return result;
};
