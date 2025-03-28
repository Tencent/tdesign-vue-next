/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdChatSenderProps } from '../chat/type';
import { PropType } from 'vue';

export default {
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
  /** 点击消息发送的回调方法 */
  onSend: Function as PropType<TdChatSenderProps['onSend']>,
  /** 点击消息终止的回调方法 */
  onStop: Function as PropType<TdChatSenderProps['onStop']>,
};
