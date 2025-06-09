import 'tdesign-web-components/lib/attachments';
import type { TdAttachmentsProps } from 'tdesign-web-components';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
// 附件
export const ChatAttachments = omiVueify('t-attachments', {
  methodNames: [],
}) as DefineComponent<TdAttachmentsProps>;
export default ChatAttachments;
