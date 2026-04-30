import '@tdesign/web-components-chat/lib/attachments';
import type { TdAttachmentsProps } from '@tdesign/web-components-chat';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
// 附件
export const Attachments = omiVueify('t-attachments', {
  methodNames: [],
}) as DefineComponent<TdAttachmentsProps>;
export default Attachments;
