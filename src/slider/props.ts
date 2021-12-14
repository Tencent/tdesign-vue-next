/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdSliderProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 用于控制数字输入框组件，值为 false 表示不显示数字输入框；值为 true 表示呈现默认数字输入框；值类型为 Object 表示透传属性到数字输入框组件 */
  inputNumberProps: {
    type: [Boolean, Object] as PropType<TdSliderProps['inputNumberProps']>,
    default: false,
  },
  /** 滑块当前值文本。值为 true 显示默认文案，值为 false 不显示滑块当前值文本，值为 `\${value}%` 则表示组件会根据占位符渲染文案 */
  label: {
    type: [String, Boolean, Function] as PropType<TdSliderProps['label']>,
    default: false,
  },
  /** 滑块布局方向 */
  layout: {
    type: String as PropType<TdSliderProps['layout']>,
    default: 'horizontal' as TdSliderProps['layout'],
    validator(val: TdSliderProps['layout']): boolean {
      return ['vertical', 'horizontal'].includes(val);
    },
  },
  /** 刻度标记，示例：[0, 10, 40, 200] 或者 `{ 10: (val) => val + '%', 50: (h, val) => <button>{val}</button> }` */
  marks: {
    type: [Object, Array] as PropType<TdSliderProps['marks']>,
  },
  /** 滑块范围最大值 */
  max: {
    type: Number,
    default: 100,
  },
  /** 滑块范围最小值 */
  min: {
    type: Number,
    default: 0,
  },
  /** 双游标滑块 */
  range: Boolean,
  /** 步长 */
  step: {
    type: Number,
    default: 1,
  },
  /** 透传提示组件属性 */
  tooltipProps: {
    type: Object as PropType<TdSliderProps['tooltipProps']>,
  },
  /** 滑块值 */
  value: {
    type: [Number, Array] as PropType<TdSliderProps['value']>,
  },
  /** 滑块值，非受控属性 */
  defaultValue: {
    type: [Number, Array] as PropType<TdSliderProps['defaultValue']>,
  },
  /** 滑块值变化时触发 */
  onChange: Function as PropType<TdSliderProps['onChange']>,
};
