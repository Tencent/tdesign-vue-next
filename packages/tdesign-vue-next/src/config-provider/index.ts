import { withInstall } from '@td/adapter-vue';
import _ConfigProvider from '@td/components-common/src/config-provider/config-provider';

export * from '@td/components/config-provider/type';

export const ConfigProvider = withInstall(_ConfigProvider);
export default ConfigProvider;
