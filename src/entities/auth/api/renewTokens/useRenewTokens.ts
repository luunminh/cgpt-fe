import { responseWrapper } from '@shared/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { RenewTokensApi, RenewTokensPayload, RenewTokensResponse } from '.';

export function useRenewTokens(
  options?: UseMutationOptions<RenewTokensResponse, Error, RenewTokensPayload>,
) {
  const {
    mutate: onRenewTokens,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<RenewTokensResponse, Error, RenewTokensPayload>({
    mutationFn: (payload: RenewTokensPayload) =>
      responseWrapper(RenewTokensApi.renewTokens, [payload]),
    ...options,
  });

  return {
    onRenewTokens,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
