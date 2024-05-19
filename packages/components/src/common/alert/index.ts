import _Alert from './alert';
import { withInstall } from '@td/adapter-utils';
import type { TdAlertProps } from '@td/intel/components/alert/type';

import './style';

export * from '@td/intel/components/alert/type';
export type AlertProps = TdAlertProps;

export const Alert = withInstall(_Alert);
export default Alert;
