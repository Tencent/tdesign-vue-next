/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdContentProps } from '../layout/type';
import { PropType } from 'vue';

export default {
  /** 内容 */
  content: {
    type: [String, Function] as PropType<TdContentProps['content']>,
  },
  /** 内容，同 content */
  default: {
    type: [String, Function] as PropType<TdContentProps['default']>,
  },
};
