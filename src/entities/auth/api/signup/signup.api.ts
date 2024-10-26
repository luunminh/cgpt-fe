import { HttpService } from '@shared/services';
import { newCancelToken } from '@shared/utils';
import { SignupPayload } from '.';

const signup = (payload: SignupPayload) => {
  return HttpService.post(`/cgpt-svc/auth/signup`, payload, newCancelToken());
};

export { signup };
