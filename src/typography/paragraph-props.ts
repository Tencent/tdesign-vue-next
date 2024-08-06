/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdParagraphProps } from '../typography/type';
import { PropType } from 'vue';

export default {
  /** 段落内容 */
  content: {
    type: [String, Function] as PropType<TdParagraphProps['content']>,
  },
  /** 段落内容 */
  default: {
    type: [String, Function] as PropType<TdParagraphProps['default']>,
  },
  /** 是否省略展示，可通过配置参数自定义省略操作的具体功能和样式 */
  ellipsis: {
    type: [Boolean, Object] as PropType<TdParagraphProps['ellipsis']>,
    default: false as TdParagraphProps['ellipsis'],
  },
};
