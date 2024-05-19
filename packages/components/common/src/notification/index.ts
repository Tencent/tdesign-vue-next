import _Notification from './notification';
import { withInstall } from '@td/adapter-utils';
import { TdNotificationProps } from '@td/intel/notification/type';

import './style';

export * from '@td/intel/notification/type';
export * from './plugin';
export type NotificationProps = TdNotificationProps;

export const Notification = withInstall(_Notification);
export { default as NotifyPlugin } from './plugin';
export default Notification;
