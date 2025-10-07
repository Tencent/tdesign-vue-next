/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
// TODO: need fix
import { TdChatContentProps } from '../type';
import { PropType } from 'vue';

export default {
  /** 聊天内容，支持多种内容类型 */
  content: {
    type: [String, Object] as PropType<TdChatContentProps['content']>,
    default: '',
  },
  /** 角色，不同选项配置不同的样式，支持类型包括用户、助手、错误、模型切换、系统消息
   * @deprecated
   */
  role: {
    type: String as PropType<TdChatContentProps['role']>,
    validator(val: TdChatContentProps['role']): boolean {
      if (!val) return true;
      return ['user', 'assistant', 'model-change', 'system'].includes(val);
    },
  },
  status: {
    type: String as PropType<TdChatContentProps['status']>,
    default: '',
  },
  markdownProps: {
    type: Object as PropType<TdChatContentProps['markdownProps']>,
    default: () => ({
      engine: 'cherry-markdown',
      options: {},
    }),
  },
};
