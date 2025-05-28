import withInstall from '../utils/withInstall';
import _ConfigProvider from './config-provider';
import { TdConfigProviderProps } from './type';

export * from './type';
export type ConfigProviderProps = TdConfigProviderProps;

export const ConfigProvider = withInstall(_ConfigProvider);
export default ConfigProvider;
