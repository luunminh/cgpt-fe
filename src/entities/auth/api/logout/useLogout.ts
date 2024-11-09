import { responseWrapper, TokenService } from '@shared/services';
import { useAuthStore } from '@shared/store';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LogoutApi, LogoutPayload, LogoutResponse } from '.';

export function useLogout(options?: UseMutationOptions<LogoutResponse, Error, LogoutPayload>) {
  const { onSetUserProfile, onSetIsAuthenticated } = useAuthStore();

  const {
    mutate: onLogout,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<LogoutResponse, Error, LogoutPayload>({
    mutationFn: (payload: LogoutPayload) => responseWrapper(LogoutApi.logout, [payload]),
    onSuccess: () => {
      TokenService.clean();
      onSetUserProfile(null);
      onSetIsAuthenticated(false);
    },
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
