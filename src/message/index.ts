import _Message from './message';
import MessagePlugin from './plugin';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Message: WithInstallType<typeof _Message> = withInstall(_Message);

export { Message, MessagePlugin };
export default Message;
