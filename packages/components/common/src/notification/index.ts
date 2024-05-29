import { withInstall } from '@td/adapter-vue';
import type { TdNotificationProps } from '@td/components/notification/type';
import _Notification from './notification';

import './style';

export * from '@td/components/notification/type';
export * from './plugin';
export type NotificationProps = TdNotificationProps;

export const Notification = withInstall(_Notification);
export { default as NotifyPlugin } from './plugin';
export default Notification;
