export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
