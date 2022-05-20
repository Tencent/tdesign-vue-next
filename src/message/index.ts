import _Message from './message';
import withInstall from '../utils/withInstall';
import { TdMessageProps } from './type';

import './style';

export * from './type';
export * from './plugin';
export type MessageProps = TdMessageProps;

export const Message = withInstall(_Message);
export { default as MessagePlugin } from './plugin';
export default Message;
