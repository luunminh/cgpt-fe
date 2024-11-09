import { newCancelToken } from '@shared/utils';
import { ErrorService } from '../error/error.service';
import { ApiResponseType, HttpService } from '../http/http.service';

const AUTHENTICATION_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export interface IToken {
  name: string;
  value: string;
}

export class TokenService {
  static saveTokens(tokens: IToken[]): void {
    tokens.forEach((token) => {
      window.localStorage.setItem(token.name, token.value);
    });
  }

  static getAccessToken(): string | null {
    return window.localStorage.getItem(AUTHENTICATION_KEY);
  }
  static getRefreshToken(): string | null {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static setAccessToken(accessToken: string): void {
    window.localStorage.setItem(AUTHENTICATION_KEY, accessToken);
  }
  static setRefreshToken(refreshToken: string): void {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  static clean(): void {
    window.localStorage.removeItem(AUTHENTICATION_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  static async renews(): Promise<void> {
    const refreshToken = this.getRefreshToken();

    try {
      const responses = await HttpService.post<
        ApiResponseType<{ accessToken: string; refreshToken: string }>
      >('/cgpt-svc/auth/renew-tokens', { refreshToken }, newCancelToken());

      const {
        data: { data },
      } = responses;

      TokenService.saveTokens([
        { name: 'accessToken', value: data.accessToken },
        { name: 'refreshToken', value: data.refreshToken },
      ]);
    } catch (error: any) {
      ErrorService.handler(error);
      this.clean();
    }
  }
}
