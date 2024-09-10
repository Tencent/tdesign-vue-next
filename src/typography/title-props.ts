/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTitleProps } from '../typography/type';
import { PropType } from 'vue';

export default {
  /** 段落内容 */
  content: {
    type: [String, Function] as PropType<TdTitleProps['content']>,
  },
  /** 标题内容 */
  default: {
    type: [String, Function] as PropType<TdTitleProps['default']>,
  },
  /** 是否省略展示，可通过配置参数自定义省略操作的具体功能和样式 */
  ellipsis: {
    type: [Boolean, Object] as PropType<TdTitleProps['ellipsis']>,
    default: false as TdTitleProps['ellipsis'],
  },
  /** 标题等级 */
  level: {
    type: String as PropType<TdTitleProps['level']>,
    default: 'h1' as TdTitleProps['level'],
    validator(val: TdTitleProps['level']): boolean {
      if (!val) return true;
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(val);
    },
  },
};
