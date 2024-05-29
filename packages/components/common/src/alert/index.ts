import { withInstall } from '@td/adapter-vue';
import type { TdAlertProps } from '@td/intel/alert/type';
import _Alert from './alert';

import './style';

export * from '@td/intel/alert/type';
export type AlertProps = TdAlertProps;

export const Alert = withInstall(_Alert);
export default Alert;
