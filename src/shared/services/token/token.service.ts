const AUTHENTICATION_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export type Tokens = {
  tokens: {
    name: string;
    value: string;
  }[];
};

export class TokenService {
  static saveTokens(tokens: Tokens): void {
    tokens.tokens.forEach((token) => {
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
    const rfToken = this.getRefreshToken();
  }
}
