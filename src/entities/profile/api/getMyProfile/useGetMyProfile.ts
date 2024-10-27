import { responseWrapper } from '@shared/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GetMyProfileApi, GetMyProfilePayload, GetMyProfileResponse } from '.';

export function useGetMyProfile(
  options?: UseMutationOptions<GetMyProfileResponse, Error, GetMyProfilePayload>,
) {
  const {
    mutate: onGetMyProfile,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation<GetMyProfileResponse, Error, GetMyProfilePayload>({
    mutationFn: (payload: GetMyProfilePayload) =>
      responseWrapper(GetMyProfileApi.getMyProfile, [payload]),
    ...options,
  });

  return {
    onGetMyProfile,
    isPending,
    isSuccess,
    isError,
    error,
  };
}
