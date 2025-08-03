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
  /** 颜色风格，依次为 TDesign 风格的黑色、蓝色、红色、橙色、绿色。也可以为任何 [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) 支持的 RGB 等值 */
  color: {
    type: String as PropType<TdStatisticProps['color']>,
    validator(val: TdStatisticProps['color']): boolean {
      if (!val) return true;

      const predefinedColors = ['black', 'blue', 'red', 'orange', 'green'];
      if (predefinedColors.includes(val)) return true;

      // 验证是否为有效的 CSS 颜色值
      if (typeof document !== 'undefined') {
        const tempElement = document.createElement('div');
        tempElement.style.color = val;
        return tempElement.style.color !== '';
      }

      // 在服务端环境下，检查常见的 CSS 颜色格式
      const cssColorRegex =
        /^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|rgba?\(\s*(\d{1,3}%?)\s+(\d{1,3}%?)\s+(\d{1,3}%?)(?:\s*\/\s*(0|1|0?\.\d+))?\s*\)|hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%(?:\s*,\s*(0|1|0?\.\d+))?\s*\)|currentColor|transparent|inherit|initial|unset|black|blue|red|orange|green)$/i;
      return cssColorRegex.test(val);
    },
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
