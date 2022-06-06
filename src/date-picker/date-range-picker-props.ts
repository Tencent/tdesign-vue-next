/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDateRangePickerProps } from '../date-picker/type';
import { PropType } from 'vue';

export default {
  /** 是否允许输入日期 */
  allowInput: Boolean,
  /** 是否显示清楚按钮 */
  clearable: Boolean,
  /** 是否禁用组件，值为数组表示可分别控制开始日期和结束日期是否禁用 */
  disabled: {
    type: Boolean as PropType<TdDateRangePickerProps['disabled']>,
    default: false,
  },
  /** 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用 */
  disableDate: {
    type: [Object, Array, Function] as PropType<TdDateRangePickerProps['disableDate']>,
  },
  /** 是否显示时间选择 */
  enableTimePicker: Boolean,
  /** 第一天从星期几开始 */
  firstDayOfWeek: {
    type: Number,
    validator(val: TdDateRangePickerProps['firstDayOfWeek']): boolean {
      if (!val) return true;
      return [1, 2, 3, 4, 5, 6, 7].includes(val);
    },
  },
  /** 用于格式化日期，[详细文档](https://day.js.org/docs/en/display/format) */
  format: String,
  /** 选择器模式 */
  mode: {
    type: String as PropType<TdDateRangePickerProps['mode']>,
    default: 'date' as TdDateRangePickerProps['mode'],
    validator(val: TdDateRangePickerProps['mode']): boolean {
      if (!val) return true;
      return ['year', 'month', 'date'].includes(val);
    },
  },
  /** 占位符，值为数组表示可分别为开始日期和结束日期设置占位符 */
  placeholder: {
    type: [String, Array] as PropType<TdDateRangePickerProps['placeholder']>,
  },
  /** 透传给 popup 组件的参数 */
  popupProps: {
    type: Object as PropType<TdDateRangePickerProps['popupProps']>,
  },
  /** 组件前置图标 */
  prefixIcon: {
    type: Function as PropType<TdDateRangePickerProps['prefixIcon']>,
  },
  /** 预设快捷日期选择，示例：{ '特定日期范围': ['2021-01-01', '2022-01-01'], '本月': [dayjs().startOf('month'), dayjs().endOf('month')] } */
  presets: {
    type: Object as PropType<TdDateRangePickerProps['presets']>,
  },
  /** 预设面板展示区域（包含确定按钮） */
  presetsPlacement: {
    type: String as PropType<TdDateRangePickerProps['presetsPlacement']>,
    default: 'bottom' as TdDateRangePickerProps['presetsPlacement'],
    validator(val: TdDateRangePickerProps['presetsPlacement']): boolean {
      if (!val) return true;
      return ['left', 'top', 'right', 'bottom'].includes(val);
    },
  },
  /** 透传给范围输入框 RangeInput 组件的参数 */
  rangeInputProps: {
    type: Object as PropType<TdDateRangePickerProps['rangeInputProps']>,
  },
  /** 日期分隔符 */
  separator: {
    type: String,
    default: '',
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdDateRangePickerProps['size']>,
    default: 'medium' as TdDateRangePickerProps['size'],
    validator(val: TdDateRangePickerProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 组件后置图标 */
  suffixIcon: {
    type: Function as PropType<TdDateRangePickerProps['suffixIcon']>,
  },
  /** 透传 TimePicker 组件属性 */
  timePickerProps: {
    type: Object as PropType<TdDateRangePickerProps['timePickerProps']>,
  },
  /** 选中值 */
  value: {
    type: Array as PropType<TdDateRangePickerProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: Array as PropType<TdDateRangePickerProps['value']>,
    default: undefined,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdDateRangePickerProps['defaultValue']>,
    default: [],
  },
  /** 用于格式化日期，默认为：'YYYY-MM-DD'，可选值：'date/time-stamp/YYY-MM-DD' 等，[更多可选值见 Dayjs 详细文档](https://day.js.org/docs/en/display/format)。<br /> 其中 `valueType=date` 表示 `value` 数据类型为 `Date`；`valueType='time-stamp'` 表示 `value` 数据类型为时间戳 */
  valueType: String,
  /** 当输入框失去焦点时触发 */
  onBlur: Function as PropType<TdDateRangePickerProps['onBlur']>,
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdDateRangePickerProps['onChange']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<TdDateRangePickerProps['onFocus']>,
  /** 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 */
  onInput: Function as PropType<TdDateRangePickerProps['onInput']>,
  /** 选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期 */
  onPick: Function as PropType<TdDateRangePickerProps['onPick']>,
};
