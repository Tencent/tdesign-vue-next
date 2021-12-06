/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdBreadcrumbProps } from './type';
import { PropType } from 'vue';

export default {
  /** 单项最大宽度，超出后会以省略号形式呈现 */
  maxItemWidth: {
    type: String,
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
      return ['light'].includes(val);
    },
  },
};
