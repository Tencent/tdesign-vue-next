/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TdChatActionProps } from '../type';
import { PropType } from 'vue';

export default {
  /** 被复制的内容 */
  content: {
    type: String,
    default: '',
  },
  /** 操作按钮是否可点击 */
  disabled: Boolean,
  /** 评价类型， 可选值： 'good(点赞)'/'bad(点踩)', 默认值为空 */
  comment: {
    type: String as PropType<'good' | 'bad'>,
    validator: (value: string) => ['good', 'bad'].includes(value),
    default: '',
  },
  /** 操作按钮配置项，可配置操作按钮选项和顺序 */
  actionBar: {
    type: Array as PropType<TdChatActionProps['actionBar']>,
    default: (): TdChatActionProps['actionBar'] => ['replay', 'copy', 'good', 'bad', 'share'],
  },
  /** 点击点赞，点踩，复制，重新生成按钮时触发 */
  onActions: Function as PropType<TdChatActionProps['onActions']>,
};
