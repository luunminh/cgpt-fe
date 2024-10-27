import { HttpService } from '@shared/services';
import { newCancelToken } from '@shared/utils';
import { GetMyProfilePayload } from '.';

const getMyProfile = (payload: GetMyProfilePayload) => {
  return HttpService.get(`/cgpt-svc/uam/me`, payload, newCancelToken());
};

export { getMyProfile };
