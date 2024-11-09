export type TableParams = {
  skip?: number;
  take?: number;
  order?: string;
  search?: string;
  sort?: string;
  [key: string]: number | boolean | string | string[] | undefined;
};

export type GetPropertiesParams = TableParams & {
  [key: string]: string | number | string[] | boolean;
};

export interface OptionType {
  label: string;
  value: string;
  [key: string]: any;
}

export type Callback<T = any> = (..._args: T[]) => void;
