/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdRowProps } from '../grid/type';
import { PropType } from 'vue';

export default {
  /** 纵向对齐方式 */
  align: {
    type: String as PropType<TdRowProps['align']>,
    default: 'top' as TdRowProps['align'],
    validator(val: TdRowProps['align']): boolean {
      return ['top', 'middle', 'bottom'].includes(val);
    },
  },
  /** 栅格间隔，示例：`{ xs: 8, sm: 16, md: 24}`。当数据类型为 Number 和 Object 时，用于指定横向间隔。当数据类型为数组时，第一个参数为横向间隔，第二个参数为纵向间隔， [水平间隔, 垂直间隔] */
  gutter: {
    type: [Number, Object, Array] as PropType<TdRowProps['gutter']>,
    default: 0,
  },
  /** flex 布局下的水平排列方式 */
  justify: {
    type: String as PropType<TdRowProps['justify']>,
    default: 'start' as TdRowProps['justify'],
    validator(val: TdRowProps['justify']): boolean {
      return ['start', 'end', 'center', 'space-around', 'space-between'].includes(val);
    },
  },
  /** 自定义元素标签 */
  tag: {
    type: String,
    default: 'div',
  },
};
