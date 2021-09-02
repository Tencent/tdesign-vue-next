import _LocaleProvider from './local-provider';
import { withInstall, WithInstallType } from '../utils/withInstall';

export * from './type';
export const LocaleProvider: WithInstallType<typeof _LocaleProvider> = withInstall(_LocaleProvider);
export default LocaleProvider;
