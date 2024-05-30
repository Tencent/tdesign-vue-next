import { withInstall } from '@td/adapter-vue';
import type { TdMessageProps } from '@td/components/message/type';
import _Message from '@td/components-common/src/message/message';

import '@td/components-common/src/message/style';

export * from '@td/components/message/type';
export * from '@td/components-common/src/message/plugin';
export type MessageProps = TdMessageProps;

export const Message = withInstall(_Message);
export { default as MessagePlugin } from '@td/components-common/src/message/plugin';
export default Message;
