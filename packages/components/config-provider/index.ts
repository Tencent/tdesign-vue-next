import { withInstall } from '@tdesign/shared-utils';
import _ConfigProvider from './config-provider';
import { TdConfigProviderProps } from './type';

export * from './type';
export type ConfigProviderProps = TdConfigProviderProps;

export const ConfigProvider = withInstall(_ConfigProvider);
export default ConfigProvider;
