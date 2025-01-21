/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdOptionProps } from '../select/type';
import { PropType } from 'vue';

export default {
  /** 当前选项是否为全选，全选可以在顶部，也可以在底部。点击当前选项会选中禁用态除外的全部选项，即使是分组选择器也会选中全部选项 */
  checkAll: Boolean,
  /** 用于定义复杂的选项内容 */
  content: {
    type: [String, Function] as PropType<TdOptionProps['content']>,
  },
  /** 用于定义复杂的选项内容。同 content */
  default: {
    type: [String, Function] as PropType<TdOptionProps['default']>,
  },
  /** 是否禁用该选项 */
  disabled: Boolean,
  /** 选项名称 */
  label: {
    type: String,
    default: '',
  },
  /** 选项标题，在选项过长时hover选项展示 */
  title: {
    type: String,
    default: '',
  },
  /** 选项值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdOptionProps['value']>,
  },
};
