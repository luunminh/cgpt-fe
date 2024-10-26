import { HttpService } from '@shared/services';
import { newCancelToken } from '@shared/utils';
import { LoginPayload } from '.';

const login = (payload: LoginPayload) => {
  return HttpService.post(`/cgpt-svc/auth/login`, payload, newCancelToken());
};

export { login };
