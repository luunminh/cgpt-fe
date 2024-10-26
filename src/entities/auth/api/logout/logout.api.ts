import { HttpService } from '@shared/services';
import { newCancelToken } from '@shared/utils';
import { LogoutPayload } from '.';

const logout = (payload: LogoutPayload) => {
  return HttpService.post(`/cgpt-svc/auth/logout`, payload, newCancelToken());
};

export { logout };
