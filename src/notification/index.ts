import withInstall from '../utils/withInstall';

import _Notification from './notification';
import { TdNotificationProps } from './type';

import './style';

export * from './type';
export * from './plugin';
export type NotificationProps = TdNotificationProps;

export const Notification = withInstall(_Notification);
export { default as NotifyPlugin } from './plugin';
export default Notification;
