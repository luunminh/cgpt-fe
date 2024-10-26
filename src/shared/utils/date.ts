import dayjs, { Dayjs, OpUnitType, QUnitType } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { isEmpty } from './validations';

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export interface GetFromNowOptions {
  thresholdUnit?: QUnitType | OpUnitType;
  thresholdValue?: number;
  format?: string;
}

export const DateFormat = {
  DEFAULT: 'MM/DD/YYYY',
  MONTH_LONG_DATE_YEAR: 'MMMM DD, YYYY',
  YEAR_MONTH_DATE: 'YYYY-MM-DD',
  MONTH_DATE_YEAR: 'MMM DD, YYYY',
  MONTH_DATE_YEAR_TIME_24: 'MM/DD/YYYY HH:mm',
  MONTH_DATE_YEAR_TIME_12: 'MM/DD/YYYY hh:mm A',

  TIME_24: 'HH:mm',
  TIME_12: 'hh:mm A',
  TIME_24_SECOND: 'HH:mm:ss',
  HST_TIMEZONE: 'Pacific/Honolulu',

  TIME_SECOND_12_MONTH_LONG_DATE_YEAR: 'h:mm:ss A, MMMM DD, YYYY',
  MONTH_DATE_YEAR_TIME_SECOND_12: 'MM/DD/YYYY HH:mm:ss A',
  MONTH_DATE_YEAR_TIME_SECOND_24: 'MM/DD/YYYY HH:mm:ss',
  TIME_12_MONTH_DATE_YEAR: 'HH:mm MM-DD-YYYY',
  ISO_FORMAT_WITHOUT_TIMEZONE: 'YYYY-MM-DDTHH:mm:ss.sss',
  ISO_FORMAT: 'YYYY-MM-DDTHH:mm:ss.sssZ',
};

export enum WeekDateEnum {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0,
}

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getDateDisplay = (value: string, format: string = DateFormat.DEFAULT) =>
  value ? dayjs(value).format(format) : null;

/**
 * Get date display
 * @param {string|date|Dayjs} value
 * @param {string} languageCode
 */
export const getTimeDisplay = (value: string) => dayjs(value).format(DateFormat.TIME_24);

export const formatDate = (
  value: string | number | Date | dayjs.Dayjs,
  format = 'MM/DD/YYYY',
  { initValueFormat = '' } = {},
) => {
  if (isEmpty(value) || (typeof value === 'string' && value === 'null')) return '--';
  if (!isEmpty(initValueFormat)) {
    return dayjs(value, initValueFormat).format(format);
  }

  return dayjs(value).format(format);
};

export const getTimeDisplayFromNow = (value: string) => dayjs(value).fromNow();

/// dayjs has many cases incorrect format with timezone so using moment-timezone for this case
/// Reference issues : https://github.com/iamkun/dayjs/issues/1827
export const localTimeToHawaii = (
  dateTime: Dayjs | Date,
  format = DateFormat.MONTH_DATE_YEAR_TIME_24,
) => {
  if (!dateTime) return null;

  const date = dayjs(dateTime).format(DateFormat.MONTH_DATE_YEAR_TIME_24);
  return dayjs(date, DateFormat.MONTH_DATE_YEAR_TIME_24).tz(DateFormat.HST_TIMEZONE).format(format);
};

export const localTimeToHawaiiTz = (dateTime?: Date | string | Dayjs | undefined) => {
  dayjs.tz.setDefault(DateFormat.HST_TIMEZONE);
  const date = dayjs(dateTime).set('hour', 0).set('minute', 0).set('second', 0);
  return dayjs(date).tz();
};

export const formatDateUtc = (value: Date | string) => {
  if (!value || (typeof value === 'string' && isEmpty(value))) {
    return '';
  }
  return dayjs(value).utc().format();
};

export const formatSecondToTimer = (seconds: number, format = DateFormat.TIME_24_SECOND) => {
  if (!seconds) return `${format}`;
  const durationObject = dayjs.duration(seconds, 'seconds');
  const formattedTime = durationObject.format(format);
  return formattedTime;
};

export const getFromNow = (value: string, options?: GetFromNowOptions) => {
  if (!value) return null;

  const {
    thresholdUnit = 'hour',
    thresholdValue = 24,
    format = DateFormat.DEFAULT,
  } = options || {};
  const timeDifference = dayjs().diff(dayjs(value), thresholdUnit, true);
  if (timeDifference > thresholdValue) return dayjs(value).format(format);

  return dayjs(value).fromNow();
};

/**
 * Get timezone offset in minutes
 * @param timezone
 * @returns
 */
export const getTimezoneOffset = (timezone: string) => {
  // Set the timezone
  const now = dayjs().tz(timezone);

  // Get the timezone offset in minutes
  const offset = now.utcOffset();

  return offset;
};

export const isSameDate = (date1: string | Date | Dayjs, date2: string | Date | Dayjs) => {
  if (!date1 || !date2) return false;
  return dayjs(date1).isSame(dayjs(date2), 'day');
};

/**
 * Get week day
 * @param value - string
 * @returns dddd
 */
export const getWeekDay = (value: string) => {
  if (!value) return '';
  return dayjs(value).format('dddd');
};

export const getSpecificDayOfWeek = ({
  extendWeek = 1,
  weekDate = WeekDateEnum.MONDAY,
}: {
  extendWeek?: number;
  weekDate: WeekDateEnum;
}) => {
  // Get the current date
  const today = dayjs();

  // Get the next Monday
  return today.add(extendWeek, 'week').startOf('week').add(weekDate, 'day').startOf('day');
};

export const getSpecificDayOfMonth = ({
  extendMonths = 1,
  monthDate = 0,
}: {
  extendMonths?: number;
  monthDate: WeekDateEnum;
}) => {
  // Get the current date
  const today = dayjs();

  // Get the next Monday
  return today.add(extendMonths, 'month').startOf('month').add(monthDate, 'day').startOf('day');
};

export const getEndDateOfMonth = ({ extendMonths = 1 }: { extendMonths?: number }) => {
  // Get the current date
  const today = dayjs();

  // Get the next Monday
  return today.add(extendMonths, 'month').endOf('month').startOf('day');
};

export const getSpecificDayOfQuarter = ({
  extendQuarters = 1,
  date = 0,
}: {
  extendQuarters?: number;
  date: number;
}) => {
  const today = dayjs();

  const nextQuarter = Math.floor((today.month() + 3 * extendQuarters) / 3);

  return today
    .set('month', nextQuarter * 3)
    .startOf('month')
    .add(date, 'day')
    .startOf('day');
};

export const getDateWithoutTimeZone = (
  date: string | Date,
  formatDate = DateFormat.DEFAULT,
): string => {
  if (!date) return '';

  const utcDate = dayjs.tz(date).toISOString();
  return dayjs(utcDate).format(formatDate);
};

export const isValidDate = (date: Date) => {
  return !isNaN(date?.getTime());
};

export const getUTCDateDisplay = (value: string, format = DateFormat.DEFAULT) => {
  if (!value) return '';

  return dayjs.utc(value).format(format);
};

export const getUtcDateWithFormat = (date: string | Date, format = DateFormat.DEFAULT) => {
  if (!date) return null;

  const utcOffset = dayjs(date).utcOffset();
  return dayjs(date).subtract(utcOffset, 'minutes').format(format);
};

export const getCurrentTimeZone = () => {
  const formatCurrentDate = dayjs(new Date()).format(DateFormat.ISO_FORMAT);
  const currentTimeZone = dayjs(formatCurrentDate).utcOffset() / 60;

  return currentTimeZone;
};
