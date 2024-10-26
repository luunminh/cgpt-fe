import parsePhoneNumber from 'libphonenumber-js';
import { isEmpty } from '../validations';

const COUNTRY_CALLING_CODE_OF_US = '1';

export const formatPhoneNumber = (
  mobile: string,
  type?: 'formatInternational' | 'formatNational' | 'getURI' | 'formatUSPhone',
) => {
  if (isEmpty(mobile)) return '';

  const phoneNumber = parsePhoneNumber(mobile);

  if (!phoneNumber) return '';

  switch (type) {
    case 'formatInternational':
      return phoneNumber.formatInternational();
    case 'formatNational':
      return phoneNumber.formatNational();
    case 'getURI':
      return phoneNumber.getURI();
    case 'formatUSPhone':
      if (phoneNumber.countryCallingCode === COUNTRY_CALLING_CODE_OF_US) {
        return phoneNumber.formatNational().replace(/\s+/g, '');
      } else {
        return phoneNumber.formatInternational();
      }
    default:
      return phoneNumber.formatInternational().replace(/^(\+\d+)/, '($1)');
  }
};
