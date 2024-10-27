import { HttpService } from '@shared/services';
import { newCancelToken } from '@shared/utils';
import { SignUpPayload } from '.';

const signup = (payload: SignUpPayload) => {
  return HttpService.post(`/cgpt-svc/auth/signup`, payload, newCancelToken());
};

export { signup };
