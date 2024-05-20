import { withInstall } from '@td/adapter-utils';
import type { TdMessageProps } from '@td/intel/message/type';
import _Message from './message';

import './style';

export * from '@td/intel/message/type';
export * from './plugin';
export type MessageProps = TdMessageProps;

export const Message = withInstall(_Message);
export { default as MessagePlugin } from './plugin';
export default Message;
