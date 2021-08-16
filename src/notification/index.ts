import _Notification from './notification';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdNotificationProps } from './type';

export * from './type';
export * from './plugin';
export type NotificationProps = TdNotificationProps;

export const Notification: WithInstallType<typeof _Notification> = withInstall(_Notification);
export { default as NotifyPlugin } from './plugin';
export default Notification;
