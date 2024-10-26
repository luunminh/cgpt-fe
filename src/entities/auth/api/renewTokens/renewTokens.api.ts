import { HttpService } from '@shared/services';
import { newCancelToken } from '@shared/utils';
import { RenewTokensPayload } from '.';

const renewTokens = (payload: RenewTokensPayload) => {
  return HttpService.post(`/cgpt-svc/auth/renew-tokens`, payload, newCancelToken());
};

export { renewTokens };
