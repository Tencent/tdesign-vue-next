import { withInstall } from '@td/adapter-vue';
import type { TdMessageProps } from '@td/components/message/type';
import _Message from './message';

import './style';

export * from '@td/components/message/type';
export * from './plugin';
export type MessageProps = TdMessageProps;

export const Message = withInstall(_Message);
export { default as MessagePlugin } from './plugin';
export default Message;
