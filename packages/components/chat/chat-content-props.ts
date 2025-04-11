/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdChatContentProps } from '../chat/type';
import { PropType } from 'vue';

export default {
  /** 聊天内容，支持 markdown 格式 */
  content: {
    type: String,
    default: '',
  },
  /** 角色，不同选项配置不同的样式，支持类型包括用户、助手、错误、模型切换、系统消息 */
  role: {
    type: String as PropType<TdChatContentProps['role']>,
    validator(val: TdChatContentProps['role']): boolean {
      if (!val) return true;
      return ['user', 'assistant', 'error', 'model-change', 'system'].includes(val);
    },
  },
};
