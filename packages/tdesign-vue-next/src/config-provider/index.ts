import { withInstall } from '@td/adapter-vue';
import _ConfigProvider from '@td/components-common/src/config-provider/config-provider';

export * from './type';

export const ConfigProvider = withInstall(_ConfigProvider);
export default ConfigProvider;
