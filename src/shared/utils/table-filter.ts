import dayjs from 'dayjs';
import { DateFormat } from './date';
import { isEmpty } from './validations';

export const updateSearchParamsTableFilter = ({
  searchParams,
  singleValues,
  arrayValues,
  dateRangeValues,
}: {
  searchParams: URLSearchParams;
  singleValues?: Object;
  arrayValues?: Object;
  dateRangeValues?: Object;
}) => {
  if (!searchParams) return;

  // input fields handler
  if (!isEmpty(singleValues)) {
    Object.entries(singleValues).forEach(([key, inputValue]: [key: string, arrValue: unknown]) => {
      if (isEmpty(inputValue)) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, inputValue.toString());
      }
    });
  }

  // array fields handler
  if (!isEmpty(arrayValues)) {
    Object.entries(arrayValues).forEach(([key, arrValue]: [key: string, arrValue: unknown[]]) => {
      if (isEmpty(arrValue)) {
        searchParams.delete(key);
      } else {
        searchParams.delete(key);
        arrValue.forEach((value) => {
          searchParams.append(key, value.toString());
        });
      }
    });
  }

  // date range fields handler

  if (!isEmpty(dateRangeValues)) {
    Object.entries(dateRangeValues).forEach(([key, dateRangeValue]) => {
      if (isEmpty(dateRangeValue) || !dateRangeValue[0] || !dateRangeValue[1]) {
        searchParams.delete(key);
      } else {
        searchParams.set(
          key,
          [
            dayjs(dateRangeValue[0]).format(DateFormat.ISO_FORMAT_WITHOUT_TIMEZONE) + 'Z',
            dayjs(dateRangeValue[1]).endOf('date').format(DateFormat.ISO_FORMAT_WITHOUT_TIMEZONE) +
              'Z',
          ].toString(),
        );
      }
    });
  }

  searchParams.delete('page');

  return searchParams;
};
