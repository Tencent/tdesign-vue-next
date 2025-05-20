/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TdChatActionProps } from './type';
import { PropType } from 'vue';

export default {
  /** 被复制的内容 */
  content: {
    type: String,
    default: '',
  },
  /** 操作按钮是否可点击 */
  disabled: Boolean,
  /** 是否点踩 */
  isBad: Boolean,
  /** 是否点赞 */
  isGood: Boolean,
  /** 操作按钮配置项，可配置操作按钮选项和顺序 */
  operationBtn: {
    type: Array as PropType<TdChatActionProps['operationBtn']>,
    default: (): TdChatActionProps['operationBtn'] => ['replay', 'copy', 'good', 'bad'],
  },
  /** 点击点赞，点踩，复制，重新生成按钮时触发 */
  onOperation: Function as PropType<TdChatActionProps['onOperation']>,
};
