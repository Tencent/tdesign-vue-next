import { withInstall } from '@td/adapter-vue';
import type { TdAlertProps } from '@td/components/alert/type';
import _Alert from '@td/components-common/src/alert/alert';

import '@td/components-common/src/alert/style';

export * from '@td/components/alert/type';
export type AlertProps = TdAlertProps;

export const Alert = withInstall(_Alert);
export default Alert;
