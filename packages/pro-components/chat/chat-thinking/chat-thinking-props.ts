import type { TdChatThinkContentProps } from 'tdesign-web-components/lib/chat-message/content/thinking-content';
import { PropType } from 'vue';
import type { TNode } from 'tdesign-vue-next';

export default {
  /** 布局方式 */
  layout: {
    type: String as PropType<TdChatThinkContentProps['layout']>,
    default: 'block' as TdChatThinkContentProps['layout'],
    validator(val: TdChatThinkContentProps['layout']): boolean {
      if (!val) return true;
      return ['block', 'border'].includes(val);
    },
  },
  /** 思考状态 */
  status: {
    type: String as PropType<TdChatThinkContentProps['status']>,
    default: 'pending' as TdChatThinkContentProps['status'],
    validator(val: TdChatThinkContentProps['status']): boolean {
      if (!val) return true;
      return ['pending', 'complete', 'stop', 'error'].includes(val);
    },
  },
  /** 内容区域最大高度，超出会自动滚动 */
  maxHeight: {
    type: Number as PropType<TdChatThinkContentProps['maxHeight']>,
  },
  /** 动画效果 */
  animation: {
    type: String as PropType<TdChatThinkContentProps['animation']>,
    default: 'moving' as TdChatThinkContentProps['animation'],
    validator(val: TdChatThinkContentProps['animation']): boolean {
      if (!val) return true;
      return ['dots', 'moving', 'gradient'].includes(val);
    },
  },
  /** 思考内容 */
  content: {
    type: [Object, Function] as PropType<TNode>,
  },
  collapsed: {
    type: Boolean as PropType<TdChatThinkContentProps['collapsed']>,
    default: false as TdChatThinkContentProps['collapsed'],
  },
};
