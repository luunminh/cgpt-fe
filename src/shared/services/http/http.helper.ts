import { isEmpty } from '@shared/utils';
import { ApisauceInstance } from 'apisauce';
import { ErrorService } from '../error/error.service';
import { TokenService } from '../token/token.service';

type ApiCall = (..._args: any[]) => Promise<any>;

export async function responseWrapper<T>(func: ApiCall, [...args]: any[] = []): Promise<T> {
  return new Promise(async (res, rej) => {
    try {
      const response = (await func(...args)) || {};
      if (response.ok) res(response.data);
      if (response?.originalError?.message === 'CONNECTION_TIMEOUT') {
        ErrorService.showErrorToast({
          message: 'Connection timeout. Please check your network and try again.',
        });
      }
      rej(response.data);
    } catch (err) {
      rej(err);
    }
  });
}

export const getResponseData = (data: { data: any }) => data.data;

export interface ApiResponseType<T> {
  data: T;
  code: number;
  success: boolean;
  timestamp: string;
}

export interface PaginationResponseType<T> {
  data: T[];
  payloadSize?: number;
  hasNext?: boolean;
  skippedRecords?: number;
  totalRecords?: number;
  skip?: number;
  take?: number;
}

export interface ApiPaginationResponseType<T> {
  data: PaginationResponseType<T>;
  code?: number;
  success?: boolean;
  timestamp?: string;
  query?: Object;
}

export const configApiInstance = (api: ApisauceInstance) => {
  api.axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (err) => Promise.reject(err),
  );

  api.axiosInstance.interceptors.response.use(undefined, async (error) => {
    if (error.response.status === 401) {
      const refreshToken = TokenService.getRefreshToken();

      if (refreshToken) {
        await TokenService.renews();

        const accessToken = TokenService.getAccessToken();

        if (isEmpty(accessToken)) {
          TokenService.clean();
          ErrorService.showErrorToast({ message: error.response.data.message });

          return Promise.reject(error);
        }

        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return api.axiosInstance(error.config);
      } else {
        console.log('No refresh token found');
      }
    }
    return Promise.reject(error);
  });
};
