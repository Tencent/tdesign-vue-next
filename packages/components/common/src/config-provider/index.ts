import { withInstall } from '@td/adapter-utils';
import _ConfigProvider from './config-provider';

export * from '@td/intel/config-provider/type';

export const ConfigProvider = withInstall(_ConfigProvider);
export default ConfigProvider;
