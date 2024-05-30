import { withInstall } from '@td/adapter-vue';
import type { TdNotificationProps } from './type';
import _Notification from '@td/components-common/src/notification/notification';

import '@td/components-common/src/notification/style';

export * from './type';
export * from '@td/components-common/src/notification/plugin';
export type NotificationProps = TdNotificationProps;

export const Notification = withInstall(_Notification);
export { default as NotifyPlugin } from '@td/components-common/src/notification/plugin';
export default Notification;
