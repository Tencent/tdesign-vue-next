import _Message from './message';
import { withInstall } from '@td/adapter-utils';
import type { TdMessageProps } from '@td/intel/components/message/type';

import './style';

export * from '@td/intel/components/message/type';
export * from './plugin';
export type MessageProps = TdMessageProps;

export const Message = withInstall(_Message);
export { default as MessagePlugin } from './plugin';
export default Message;
