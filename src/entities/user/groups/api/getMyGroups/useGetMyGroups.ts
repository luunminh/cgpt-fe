import { PaginationResponseType, responseWrapper } from '@vizplatform/react-api';
import { isEmpty } from '@core/common/utils';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetMyGroupsApi, GetMyGroupsResponse, GetMyGroupsParams } from '.';
import { useState } from 'react';

const QUERY_KEY = {
  GET_MY_GROUPS: '/cgpt-svc/groups',
}

type UseGetMyGroupsParams = {
  defaultParams?: GetMyGroupsParams,
  options?: UseQueryOptions<
    PaginationResponseType<GetMyGroupsResponse>, 
    Error, 
    PaginationResponseType<GetMyGroupsResponse>
  >;
}

export function useGetMyGroups({
  defaultParams, options
}: UseGetMyGroupsParams = {}) {
  const [params, setParams] = useState<GetMyGroupsParams>(defaultParams ?? {});

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    refetch: onGetMyGroups,
  } = useQuery<
    PaginationResponseType<GetMyGroupsResponse>, 
    Error, 
    PaginationResponseType<GetMyGroupsResponse>
  >({
    queryKey: [QUERY_KEY.GET_MY_GROUPS, params],
    queryFn: (query) => {
      const [, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<GetMyGroupsResponse>>(
        GetMyGroupsApi.getMyGroups,
        params
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateGetMyGroups = () => {
    return queryClient.invalidateQueries([QUERY_KEY.GET_MY_GROUPS]);
  }

  const { data: datas = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    datas,
    hasNext,
    payloadSize,
    totalRecords,
    isError,
    error,
    isLoading,
    onGetMyGroups,
    params,
    setParams,
    handleInvalidateGetMyGroups
  };
}
