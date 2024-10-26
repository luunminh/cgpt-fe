import { configs } from '@config';
import axios from 'axios';
import { AxiosClient } from './axios-client';

axios.defaults.withCredentials = true;

export const HttpService = new AxiosClient({
  baseURL: configs.API_URL,
  timeout: configs.CONNECTION_TIMEOUT,
  headers: { Accept: 'application/json' },
});

export { configApiInstance, getResponseData, responseWrapper } from './http.helper';

export type {
  ApiPaginationResponseType,
  ApiResponseType,
  PaginationResponseType,
} from './http.helper';
