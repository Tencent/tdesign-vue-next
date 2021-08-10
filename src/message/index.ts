import _Message from './message';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdMessageProps } from './type';

export * from './type';
export * from './plugin';
export type MessageProps = TdMessageProps;

export const Message: WithInstallType<typeof _Message> = withInstall(_Message);
export { default as MessagePlugin } from './plugin';
export default Message;
