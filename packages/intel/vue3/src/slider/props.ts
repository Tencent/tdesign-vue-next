/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdSliderProps } from './type';

export default {
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 用于控制数字输入框组件，值为 false 表示不显示数字输入框；值为 true 表示呈现默认数字输入框；值类型为 Object 表示透传属性到数字输入框组件 */
  inputNumberProps: {
    type: [Boolean, Object] as PropType<TdSliderProps['inputNumberProps']>,
    default: false as TdSliderProps['inputNumberProps'],
  },
  /** 滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值 */
  label: {
    type: [String, Boolean, Function] as PropType<TdSliderProps['label']>,
    default: true as TdSliderProps['label'],
  },
  /** 滑块布局方向 */
  layout: {
    type: String as PropType<TdSliderProps['layout']>,
    default: 'horizontal' as TdSliderProps['layout'],
    validator(val: TdSliderProps['layout']): boolean {
      if (!val) {
        return true;
      }
      return ['vertical', 'horizontal'].includes(val);
    },
  },
  /** 刻度标记，示例：[0, 10, 40, 200] 或者 `{ 10: (val) => val + '%', 50: (h) => <button>50</button> }` */
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
  /** 控制步长刻度值显示 */
  showStep: Boolean,
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
    default: undefined as TdSliderProps['value'],
  },
  modelValue: {
    type: [Number, Array] as PropType<TdSliderProps['value']>,
    default: undefined as TdSliderProps['value'],
  },
  /** 滑块值，非受控属性 */
  defaultValue: {
    type: [Number, Array] as PropType<TdSliderProps['defaultValue']>,
    default: 0 as TdSliderProps['defaultValue'],
  },
  /** 滑块值变化时触发 */
  onChange: Function as PropType<TdSliderProps['onChange']>,
  /** 松开拖动`mouseup` 或点击滑块条时触发，适合不希望在拖动滑块过程频繁触发回调的场景实用 */
  onChangeEnd: Function as PropType<TdSliderProps['onChangeEnd']>,
};
