/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-10 17:18:59
 * */

import { TdDatePickerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许输入日期 */
  allowInput: Boolean,
  /** 是否显示清楚按钮 */
  clearable: Boolean,
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用 */
  disableDate: {
    type: [Object, Array, Function] as PropType<TdDatePickerProps['disableDate']>,
  },
  /** 是否显示时间选择 */
  enableTimePicker: Boolean,
  /** 用于格式化日期，[详细文档](https://day.js.org/docs/en/display/format) */
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  /** 透传给输入框（Input）组件的参数 */
  inputProps: {
    type: Object as PropType<TdDatePickerProps['inputProps']>,
  },
  /** 选择器模式 */
  mode: {
    type: String as PropType<TdDatePickerProps['mode']>,
    default: 'month' as TdDatePickerProps['mode'],
    validator(val: TdDatePickerProps['mode']): boolean {
      return ['year', 'month', 'date'].includes(val);
    },
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 透传给 popup 组件的参数 */
  popupProps: {
    type: Object as PropType<TdDatePickerProps['popupProps']>,
  },
  /** 组件前置图标 */
  prefixIcon: {
    type: Function as PropType<TdDatePickerProps['prefixIcon']>,
  },
  /** 预设快捷日期选择，示例：{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] } */
  presets: {
    type: Object as PropType<TdDatePickerProps['presets']>,
  },
  /** 是否呈现为日期范围选择器（临时 API，后期将调整为是 DateRangePicker 组件） */
  range: Boolean,
  /** 尺寸 */
  size: {
    type: String as PropType<TdDatePickerProps['size']>,
    default: 'medium' as TdDatePickerProps['size'],
    validator(val: TdDatePickerProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 组件后置图标 */
  suffixIcon: {
    type: Function as PropType<TdDatePickerProps['suffixIcon']>,
  },
  /** 选中值 */
  value: {
    type: [String, Object, Array] as PropType<TdDatePickerProps['value']>,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Object, Array] as PropType<TdDatePickerProps['defaultValue']>,
  },
  /** 当输入框失去焦点时触发 */
  onBlur: Function as PropType<TdDatePickerProps['onBlur']>,
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdDatePickerProps['onChange']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<TdDatePickerProps['onFocus']>,
  /** 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 */
  onInput: Function as PropType<TdDatePickerProps['onInput']>,
};
