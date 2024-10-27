import { responseWrapper } from '@shared/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { SignupApi, SignUpPayload, SignUpResponse } from '.';

export function useSignUp(options?: UseMutationOptions<SignUpResponse, Error, SignUpPayload>) {
  const {
    mutate: onSignUp,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<SignUpResponse, Error, SignUpPayload>({
    mutationFn: (payload: SignUpPayload) => responseWrapper(SignupApi.signup, [payload]),
    ...options,
  });

  return {
    onSignUp,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
