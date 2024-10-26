import { responseWrapper } from '@shared/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { SignupApi, SignupPayload, SignupResponse } from '.';

export function useSignup(options?: UseMutationOptions<SignupResponse, Error, SignupPayload>) {
  const {
    mutate: onSignup,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<SignupResponse, Error, SignupPayload>({
    mutationFn: (payload: SignupPayload) => responseWrapper(SignupApi.signup, [payload]),
    ...options,
  });

  return {
    onSignup,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
