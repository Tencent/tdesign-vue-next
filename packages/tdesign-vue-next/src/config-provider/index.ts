import { withInstall } from '@td/adapter-vue';
import _ConfigProvider from './config-provider';

export * from '@td/components/config-provider/type';

export const ConfigProvider = withInstall(_ConfigProvider);
export default ConfigProvider;
