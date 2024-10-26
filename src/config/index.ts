import { common } from './common.config';
import { envConfigs } from './env.config';

export const configs = {
  ...envConfigs,
  ...common,
};
