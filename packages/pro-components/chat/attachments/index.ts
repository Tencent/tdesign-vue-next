import '@tdesign/web-components-chat/attachments';
import type { TdAttachmentsProps } from '@tdesign/web-components-chat/attachments';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
// 附件
export const Attachments = omiVueify('t-attachments', {
  methodNames: [],
}) as unknown as DefineComponent<TdAttachmentsProps>;
export default Attachments;
