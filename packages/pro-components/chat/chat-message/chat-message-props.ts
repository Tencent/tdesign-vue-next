/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TdChatItemProps } from '../type';
import type { TdChatMessageProps } from 'tdesign-web-components';
import { PropType } from 'vue';
import type { TNode } from 'tdesign-vue-next';

export default {
  /** 动画效果 */
  animation: {
    type: String as PropType<TdChatMessageProps['animation']>,
    default: 'skeleton' as TdChatMessageProps['animation'],
    validator(val: TdChatMessageProps['animation']): boolean {
      if (!val) return true;
      return ['skeleton', 'moving', 'gradient', 'circle'].includes(val);
    },
  },
  /** 自定义的头像配置 */
  avatar: {
    type: [String, Object, Function] as PropType<TdChatMessageProps['avatar']>,
  },
  /** 对话单元的时间配置 */
  datetime: {
    type: [String, Function] as PropType<TdChatMessageProps['datetime']>,
  },
  /** 自定义的昵称 */
  name: {
    type: [String, Function] as PropType<TdChatMessageProps['name']>,
  },
  /** 气泡框样式，支持基础、线框、文字三种类型 */
  variant: {
    type: String as PropType<TdChatMessageProps['variant']>,
    default: 'text' as TdChatMessageProps['variant'],
    validator(val: TdChatMessageProps['variant']): boolean {
      if (!val) return true;
      return ['base', 'outline', 'text'].includes(val);
    },
  },
  message: {
    type: Object as PropType<TdChatMessageProps['message']>,
  },
  placement: {
    type: String as PropType<TdChatMessageProps['placement']>,
    default: 'left' as TdChatMessageProps['placement'],
  },
  chatContentProps: {
    type: Object as PropType<TdChatMessageProps['chatContentProps']>,
  },
};
