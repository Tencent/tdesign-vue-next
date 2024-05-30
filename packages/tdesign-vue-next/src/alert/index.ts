import { withInstall } from '@td/adapter-vue';
import type { TdAlertProps } from './type';
import _Alert from '@td/components-common/src/alert/alert';

import '@td/components-common/src/alert/style';

export * from './type';
export type AlertProps = TdAlertProps;

export const Alert = withInstall(_Alert);
export default Alert;
