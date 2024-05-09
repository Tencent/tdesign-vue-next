import withInstall from '../utils/withInstall';

import _Alert from './alert';
import { TdAlertProps } from './type';

import './style';

export * from './type';
export type AlertProps = TdAlertProps;

export const Alert = withInstall(_Alert);
export default Alert;
