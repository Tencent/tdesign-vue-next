/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdChatLoadingProps } from '../chat/type';
import { PropType } from 'vue';

export default {
  /** 加载的状态形式 */
  animation: {
    type: String as PropType<TdChatLoadingProps['animation']>,
    default: 'gradient' as TdChatLoadingProps['animation'],
    validator(val: TdChatLoadingProps['animation']): boolean {
      if (!val) return true;
      return ['moving', 'gradient'].includes(val);
    },
  },
  /** 加载过程展示的文字内容 */
  text: {
    type: String,
    default: '',
  },
};
