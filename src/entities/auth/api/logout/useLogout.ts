import { responseWrapper } from '@shared/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LogoutApi, LogoutPayload, LogoutResponse } from '.';

export function useLogout(options?: UseMutationOptions<LogoutResponse, Error, LogoutPayload>) {
  const {
    mutate: onLogout,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<LogoutResponse, Error, LogoutPayload>({
    mutationFn: (payload: LogoutPayload) => responseWrapper(LogoutApi.logout, [payload]),
    ...options,
  });

  return {
    onLogout,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
