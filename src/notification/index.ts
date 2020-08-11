import NotificationPlugin from './plugin';
import Notification from './notification';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Notification', Notification);

export { Notification, NotificationPlugin };
export default Notification;
