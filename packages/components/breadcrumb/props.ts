/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdBreadcrumbProps } from './type';
import { PropType } from 'vue';

export default {
  /** 自定义折叠时省略号的内容 */
  ellipsis: {
    type: [String, Function] as PropType<TdBreadcrumbProps['ellipsis']>,
  },
  /** 超过面包屑最大显示数量时，省略号后显示几项。`maxItems > 0`时有效 */
  itemsAfterCollapse: {
    type: Number,
    default: undefined,
  },
  /** 超过面包屑最大显示数量时，省略号前显示几项。`maxItems > 0`时有效 */
  itemsBeforeCollapse: {
    type: Number,
    default: undefined,
  },
  /** 单项最大宽度，超出后会以省略号形式呈现 */
  maxItemWidth: {
    type: String,
    default: undefined,
  },
  /** 显示的面包屑的最大数量，超出该值后中间的面包屑内容将会显示为省略号。值`<= 0`代表不限制 */
  maxItems: {
    type: Number,
    default: undefined,
  },
  /** 面包屑项，功能同 BreadcrumbItem */
  options: {
    type: Array as PropType<TdBreadcrumbProps['options']>,
  },
  /** 自定义分隔符 */
  separator: {
    type: [String, Function] as PropType<TdBreadcrumbProps['separator']>,
  },
  /** 组件风格 */
  theme: {
    type: String as PropType<TdBreadcrumbProps['theme']>,
    default: 'light' as TdBreadcrumbProps['theme'],
    validator(val: TdBreadcrumbProps['theme']): boolean {
      if (!val) return true;
      return ['light'].includes(val);
    },
  },
};
