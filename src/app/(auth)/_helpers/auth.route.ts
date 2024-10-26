const AUTH_PREFIX = '/auth';

const authPaths = {
  signin: `${AUTH_PREFIX}/signin`,
  signup: `${AUTH_PREFIX}/signup`,
  forgotPassword: `${AUTH_PREFIX}/forgot-password`,
  resetPassword: `${AUTH_PREFIX}/reset-password`,
};

export { AUTH_PREFIX, authPaths };
