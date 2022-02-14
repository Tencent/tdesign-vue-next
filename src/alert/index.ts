import _Alert from './alert';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdAlertProps } from './type';

import './style';

export * from './type';
export type AlertProps = TdAlertProps;

export const Alert: WithInstallType<typeof _Alert> = withInstall(_Alert);
export default Alert;
