/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import inputProps from '../input/props';
import { PropType } from 'vue';
import { TdSearchProps } from './type';

export default {
  ...inputProps,
  /** 是否显示搜索图标 */
  showIcon: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  /** 是否为批量搜索 */
  batch: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 是否为批量搜索 */
  history: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  /** 输入框占位符 */
  placeholder: {
    type: String as PropType<string>,
    default: '请输入搜索内容',
  },
  /** 搜索建议、联想选项 */
  suggestions: {
    type: [String, Array] as PropType<TdSearchProps['suggestions']>,
    default: [],
  },
};
