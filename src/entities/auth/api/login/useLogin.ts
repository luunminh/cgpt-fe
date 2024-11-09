import { ApiResponseType, responseWrapper } from '@shared/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LoginApi, LoginPayload, LoginResponse } from '.';

export function useLogin(
  options?: UseMutationOptions<ApiResponseType<LoginResponse>, Error, LoginPayload>,
) {
  const {
    mutate: onLogin,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<ApiResponseType<LoginResponse>, Error, LoginPayload>({
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
