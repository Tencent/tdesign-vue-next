import Message from './message';
import MessagePlugin from './plugin';
import setInstallFn from '../utils/setInstallFn';

setInstallFn('Message', Message);

export {
  Message,
  MessagePlugin,
};

export default Message;
