import _Alert from './alert';
import withInstall from '../utils/withInstall';
import { TdAlertProps } from '@td/intel/alert/type';

import './style';

export * from '@td/intel/alert/type';
export type AlertProps = TdAlertProps;

export const Alert = withInstall(_Alert);
export default Alert;
