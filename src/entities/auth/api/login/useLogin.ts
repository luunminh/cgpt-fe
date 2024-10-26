import { responseWrapper } from '@shared/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LoginApi, LoginPayload, LoginResponse } from '.';

export function useLogin(options?: UseMutationOptions<LoginResponse, Error, LoginPayload>) {
  const {
    mutate: onLogin,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) => responseWrapper(LoginApi.login, [payload]),
    ...options,
  });

  return {
    onLogin,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
