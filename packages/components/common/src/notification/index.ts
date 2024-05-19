import { withInstall } from '@td/adapter-utils';
import type { TdNotificationProps } from '@td/intel/notification/type';
import _Notification from './notification';

import './style';

export * from '@td/intel/notification/type';
export * from './plugin';
export type NotificationProps = TdNotificationProps;

export const Notification = withInstall(_Notification);
export { default as NotifyPlugin } from './plugin';
export default Notification;
