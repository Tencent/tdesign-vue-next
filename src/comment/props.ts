/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdCommentProps } from './type';
import { PropType } from 'vue';

export default {
  /** 操作 */
  actions: {
    type: Array as PropType<TdCommentProps['actions']>,
  },
  /** 作者 */
  author: {
    type: [String, Function] as PropType<TdCommentProps['author']>,
  },
  /** 头像 */
  avatar: {
    type: [String, Object, Function] as PropType<TdCommentProps['avatar']>,
  },
  /** 内容 */
  content: {
    type: [String, Function] as PropType<TdCommentProps['content']>,
  },
  /** 时间 */
  datetime: {
    type: [String, Function] as PropType<TdCommentProps['datetime']>,
  },
  /** 引用 */
  quote: {
    type: [String, Function] as PropType<TdCommentProps['quote']>,
  },
  /** 回复 */
  reply: {
    type: [String, Function] as PropType<TdCommentProps['reply']>,
  },
};
