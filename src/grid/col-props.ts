/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdColProps } from '../grid/type';
import { PropType } from 'vue';

export default {
  /** flex 布局填充。CSS 属性 flex 值。示例：2 / 3 / '100px' / 'auto' / '1 1 200px' */
  flex: {
    type: [String, Number] as PropType<TdColProps['flex']>,
  },
  /** ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象（小尺寸电脑） */
  lg: {
    type: [Number, Object] as PropType<TdColProps['lg']>,
  },
  /** ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象（超小尺寸电脑） */
  md: {
    type: [Number, Object] as PropType<TdColProps['md']>,
  },
  /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
  offset: {
    type: Number,
    default: 0,
  },
  /** 栅格顺序，flex 布局模式下有效 */
  order: {
    type: Number,
    default: 0,
  },
  /** 栅格向左移动格数 */
  pull: {
    type: Number,
    default: 0,
  },
  /** 栅格向左移动格数 */
  push: {
    type: Number,
    default: 0,
  },
  /** ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象（平板） */
  sm: {
    type: [Number, Object] as PropType<TdColProps['sm']>,
  },
  /** 栅格占位格数，为 0 时相当于 display: none */
  span: {
    type: Number,
    default: 12,
  },
  /** 自定义元素标签 */
  tag: {
    type: String,
    default: 'div',
  },
  /** ≥1400px 响应式栅格，可为栅格数或一个包含其他属性的对象（中尺寸电脑） */
  xl: {
    type: [Number, Object] as PropType<TdColProps['xl']>,
  },
  /** <768px 响应式栅格，可为栅格数或一个包含其他属性的对象（手机） */
  xs: {
    type: [Number, Object] as PropType<TdColProps['xs']>,
  },
  /** ≥1880px 响应式栅格，可为栅格数或一个包含其他属性的对象（大尺寸电脑） */
  xxl: {
    type: [Number, Object] as PropType<TdColProps['xxl']>,
  },
};
