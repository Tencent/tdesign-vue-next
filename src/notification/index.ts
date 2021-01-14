import NotifyPlugin from './plugin';
import Notification from './notification';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Notification', Notification);

export { Notification, NotifyPlugin };
export default Notification;
