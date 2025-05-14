/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdChatSenderProps } from '../chat/type';
import { PropType } from 'vue';

export default {
  /** 是否禁用输入框 */
  disabled: Boolean,
  /** 输入框默认文案 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 输入框左下角区域扩展 */
  prefix: {
    type: [String, Function] as PropType<TdChatSenderProps['prefix']>,
  },
  /** 中止按钮是否可点击。等流式数据全部返回结束置为false，注意跟textLoading的控制时机不是同一个 */
  stopDisabled: Boolean,
  /** 输入框右下角区域扩展 */
  suffix: {
    type: [String, Function] as PropType<TdChatSenderProps['suffix']>,
  },
  /** 透传给  Textarea 组件的全部属性 */
  textareaProps: {
    type: Object as PropType<TdChatSenderProps['textareaProps']>,
  },
  /** 输入框的值 */
  value: {
    type: [String, Number] as PropType<TdChatSenderProps['value']>,
    default: undefined as TdChatSenderProps['value'],
  },
  modelValue: {
    type: [String, Number] as PropType<TdChatSenderProps['value']>,
    default: undefined as TdChatSenderProps['value'],
  },
  /** 输入框的值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdChatSenderProps['defaultValue']>,
  },
  autoClearValue: {
    type: Boolean,
    default: true,
  },
  /** 输入框聚焦时触发 */
  onBlur: Function as PropType<TdChatSenderProps['onBlur']>,
  /** 输入框值发生变化时触发 */
  onChange: Function as PropType<TdChatSenderProps['onChange']>,
  /** 输入框聚焦时触发 */
  onFocus: Function as PropType<TdChatSenderProps['onFocus']>,
  /** 点击消息发送的回调方法 */
  onSend: Function as PropType<TdChatSenderProps['onSend']>,
  /** 点击消息终止的回调方法 */
  onStop: Function as PropType<TdChatSenderProps['onStop']>,
};
