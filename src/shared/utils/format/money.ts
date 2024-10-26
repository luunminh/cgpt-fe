export const moneyReg = /[\d,]+\.{0,1}\d{0,}/;

export const isMoneyInputFormat = (value: number | string) => `${value}`.match(moneyReg)?.[0] || '';

export const convertCurrencyInputToString = (value: string) => value.replace(/[^0-9.-]+/g, '');

export type FormatMoneyOptionsType = {
  defaultValue: string;
  style: string;
  currency: string;
  maximumFractionDigits: number;
  minimumFractionDigits: number;
};

export const formatMoney = (value: number, options?: Partial<FormatMoneyOptionsType>) => {
  const {
    defaultValue = '',
    currency = 'USD',
    maximumFractionDigits = 3,
    minimumFractionDigits = 3,
    style = 'currency',
  } = options || {};

  if (isNaN(value)) return defaultValue;

  return value.toLocaleString('en-US', {
    style: style as any,
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
  });
};
