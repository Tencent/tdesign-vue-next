import NotifyPlugin from './plugin';
import _Notification from './notification';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Notification: WithInstallType<typeof _Notification> = withInstall(_Notification);

export { Notification, NotifyPlugin };
export default Notification;
