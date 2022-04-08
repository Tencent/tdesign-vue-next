import { withInstall, WithInstallType } from '../utils/withInstall';
import _ConfigProvider from './config-provider';

export * from './type';

export const ConfigProvider: WithInstallType<typeof _ConfigProvider> = withInstall(_ConfigProvider);
export default ConfigProvider;
