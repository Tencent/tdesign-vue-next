/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TdChatInputProps } from './type';
import { PropType } from 'vue';

export default {
  /** 输入框是否自动聚焦 */
  autofocus: Boolean,
  /** 高度自动撑开。 autosize = true 表示组件高度自动撑开，同时，依旧允许手动拖高度。如果设置了 autosize.maxRows 或者 autosize.minRows 则不允许手动调整高度 */
  autosize: {
    type: [Boolean, Object] as PropType<TdChatInputProps['autosize']>,
    default: { minRows: 1, maxRows: 5 } as TdChatInputProps['autosize'],
  },
  /** 是否禁用输入框 */
  disabled: Boolean,
  /** 输入框默认文案 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 中止按钮是否可点击。等流式数据全部返回结束置为false，注意跟textLoading的控制时机不是同一个 */
  stopDisabled: Boolean,
  /** 发送按钮的自定义扩展 */
  suffixIcon: {
    type: Function as PropType<TdChatInputProps['suffixIcon']>,
  },
  /** 输入框的值 */
  value: {
    type: [String, Number] as PropType<TdChatInputProps['value']>,
    default: undefined as TdChatInputProps['value'],
  },
  modelValue: {
    type: [String, Number] as PropType<TdChatInputProps['value']>,
    default: undefined as TdChatInputProps['value'],
  },
  /** 输入框的值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdChatInputProps['defaultValue']>,
  },
  /** 输入框聚焦时触发 */
  onBlur: Function as PropType<TdChatInputProps['onBlur']>,
  /** 输入框值发生变化时触发 */
  onChange: Function as PropType<TdChatInputProps['onChange']>,
  /** 输入框聚焦时触发 */
  onFocus: Function as PropType<TdChatInputProps['onFocus']>,
  /** 点击消息发送的回调方法 */
  onSend: Function as PropType<TdChatInputProps['onSend']>,
  /** 点击消息终止的回调方法 */
  onStop: Function as PropType<TdChatInputProps['onStop']>,
};
