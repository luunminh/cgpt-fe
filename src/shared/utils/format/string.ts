import _ from 'lodash';
import { isEmpty } from '../validations';

export const formatStringToNumber = (value: string) => {
  if (isEmpty(value)) return null;
  return Number(value);
};

export const capitalizeWords = (string: string) =>
  string.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

export const getStartCase = (value: string) => (value ? _.startCase(value.toLowerCase()) : '');

export const getTitleCase = (str: string): string => {
  if (!str) return '';
  return _.startCase(_.toLower(str));
};

export const getInputMask = (mask: '0' | 'a' | '*', length = 1) => mask.repeat(length);

export const removeSpecialCharacterFromString = (value: string) =>
  value.replace(/[^a-zA-Z0-9 ]/g, '');

export const getStringWithinLength = (value = '', allowedLength = 50, wordLength = 0) => {
  if (!value) return '';
  let trimmedValue = value;
  if (wordLength) {
    trimmedValue = value
      .split(/\s+/)
      .map((x) => (x.length > wordLength ? `${x.slice(0, wordLength)}...` : x))
      .join(' ');
  }
  return trimmedValue.length > allowedLength
    ? `${trimmedValue.slice(0, allowedLength)}...`
    : trimmedValue;
};

export const getWordsWithinLength = (string: string, allowedLength = 10) =>
  string.length > allowedLength ? `${string.slice(0, allowedLength)}...` : string;

export const getFirstLetter = (name: string) => {
  if (!name) return '';

  return name
    .match(/\b(\w)/g)
    ?.join('')
    .toUpperCase();
};

export const formatStringCellValue = (value: string | null) => {
  return !isEmpty(value) ? value : '--';
};

export const getFullName = ({ firstName = '', middleName = '', lastName = '' } = {}) =>
  `${firstName}${middleName ? ` ${middleName} ` : ' '}${lastName ? lastName : ''}`;
