import _ from 'lodash';
import { deepKeys } from '.';

export const isEqualPrevAndNextObjByPath = <T>({
  prevValues,
  nextValues,
  path,
  checkEqualLengthArray,
}: {
  prevValues: T;
  nextValues: T;
  path: string;
  checkEqualLengthArray?: boolean;
}) => {
  const prev = _.get(prevValues, path);
  const next = _.get(nextValues, path);
  return checkEqualLengthArray && Array.isArray(prev) && Array.isArray(next)
    ? prev.length === next.length
    : _.isEqual(prev, next);
};

export const getErrorMessage = (
  fieldName: string,
  { touched, errors }: { touched: any; errors: any },
) => {
  if (!fieldName || !touched || !errors) return '';

  const error = _.get(errors, fieldName);

  return _.get(touched, fieldName) && error ? error : '';
};

export const deepKeysHookFormErrors = (t: unknown, path: string[] = []) => {
  const res: string[] = deepKeys(t, path);

  const filteredRes = res.reduce((output: string[], item) => {
    if (/\d$/.test(item)) {
      return output;
    }

    const replacedItem = item.replace(/(\.type|\.message|\d)$/, '');

    output.push(replacedItem);

    return output;
  }, []);

  return [...new Set(filteredRes)];
};
