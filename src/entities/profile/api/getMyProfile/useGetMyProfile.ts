import { ApiResponseType, getResponseData, responseWrapper } from '@shared/services';
import { Callback } from '@shared/utils';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { GetMyProfileApi, GetMyProfileResponse } from '.';

const QUERY_KEY = {
  GET_MY_PROFILE: '/cgpt-svc/uam/me',
};

type UseGetMyProfileParams = {
  options?: UseQueryOptions<ApiResponseType<GetMyProfileResponse>, Error, GetMyProfileResponse>;
  onSuccess?: (data: GetMyProfileResponse) => void;
  onError?: Callback;
};

export function useGetMyProfile({ options, onSuccess, onError }: UseGetMyProfileParams = {}) {
  const {
    data,
    error,
    isError,
    isSuccess,
    isFetching: isLoading,
    refetch: onGetMyProfile,
  } = useQuery<ApiResponseType<GetMyProfileResponse>, Error, GetMyProfileResponse>({
    queryKey: [QUERY_KEY.GET_MY_PROFILE],
    queryFn: () => {
      return responseWrapper<ApiResponseType<GetMyProfileResponse>>(GetMyProfileApi.getMyProfile);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    select: getResponseData,
    enabled: false,
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateGetMyProfile = () => {
    return queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_MY_PROFILE] });
  };

  useEffect(() => {
    if (isSuccess && data) {
      onSuccess && onSuccess(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      onError && onError(error);
    }
  }, [isError, error]);

  return {
    data,
    isError,
    error,
    isLoading,
    onGetMyProfile,
    handleInvalidateGetMyProfile,
  };
}
