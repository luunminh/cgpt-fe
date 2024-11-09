import { HttpService } from '@shared/services';
import { newCancelToken } from '@shared/utils';

const getMyProfile = () => {
  return HttpService.get(`/cgpt-svc/uam/me`, {}, newCancelToken());
};

export { getMyProfile };
