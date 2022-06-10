/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdInputAdornmentProps } from './type';
import { PropType } from 'vue';

export default {
  /** 后缀装饰 */
  append: {
    type: [String, Function] as PropType<TdInputAdornmentProps['append']>,
  },
  /** 前缀装饰 */
  prepend: {
    type: [String, Function] as PropType<TdInputAdornmentProps['prepend']>,
  },
};
