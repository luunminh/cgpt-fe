import { HttpService } from '@shared/services';
import { newCancelToken, stringify } from '@shared/utils';
import { GetMyGroupsParams } from '.';

const getMyGroups = (params: GetMyGroupsParams) => {
  const queryString = stringify(params);
  return HttpService.get(`/cgpt-svc/groups?${queryString}`, {}, newCancelToken());
};

export const GetMyGroupsApi = {
  getMyGroups,
};
