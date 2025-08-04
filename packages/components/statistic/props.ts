/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdStatisticProps } from './type';
import { PropType } from 'vue';

export default {
  /** 动画效果控制，`duration` 指动画的过渡时间`单位：毫秒`，`valueFrom` 指动画的起始数值。`{ duration, valueFrom }` */
  animation: {
    type: Object as PropType<TdStatisticProps['animation']>,
  },
  /** 是否开始动画 */
  animationStart: Boolean,
  /** 颜色风格可以为 TDesign 风格的黑色（black）、蓝色（blue）、红色（red）、橙色（orange）、绿色（green），可以支持 TDesign 的浅色和深色模式。也可以为任何 [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) 支持颜色值，但不支持 TDesign 的浅色和深色模式。 */
  color: {
    type: String,
    default: '',
  },
  /** 小数保留位数 */
  decimalPlaces: {
    type: Number,
  },
  /** 额外的显示内容 */
  extra: {
    type: [String, Function] as PropType<TdStatisticProps['extra']>,
  },
  /** 格式化数值显示值 */
  format: {
    type: Function as PropType<TdStatisticProps['format']>,
  },
  /** 是否加载中 */
  loading: Boolean,
  /** 前缀内容，展示优先级高于 trend */
  prefix: {
    type: [String, Function] as PropType<TdStatisticProps['prefix']>,
  },
  /** 默认展示千位分隔符，可以自定义为其他内容，`separator = ''` 设置为空字符串/null/undefined 时展示默认分隔符 */
  separator: {
    type: String,
    default: ',',
  },
  /** 后缀内容，展示优先级高于 trend */
  suffix: {
    type: [String, Function] as PropType<TdStatisticProps['suffix']>,
  },
  /** 数值显示的标题 */
  title: {
    type: [String, Function] as PropType<TdStatisticProps['title']>,
  },
  /** 趋势 */
  trend: {
    type: String as PropType<TdStatisticProps['trend']>,
    validator(val: TdStatisticProps['trend']): boolean {
      if (!val) return true;
      return ['increase', 'decrease'].includes(val);
    },
  },
  /** 趋势展示位置 */
  trendPlacement: {
    type: String as PropType<TdStatisticProps['trendPlacement']>,
    default: 'left' as TdStatisticProps['trendPlacement'],
    validator(val: TdStatisticProps['trendPlacement']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** 单位内容 */
  unit: {
    type: [String, Function] as PropType<TdStatisticProps['unit']>,
  },
  /** 数值显示的值 */
  value: {
    type: Number,
  },
};
