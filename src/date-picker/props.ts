/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDatePickerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许输入日期 */
  allowInput: Boolean,
  /** 是否显示清除按钮 */
  clearable: Boolean,
  /** 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。`{ from: 'A', to: 'B' }` 表示在 A 到 B 之间的日期会被禁用。`{ before: 'A', after: 'B' }` 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用 */
  disableDate: {
    type: [Object, Array, Function] as PropType<TdDatePickerProps['disableDate']>,
  },
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 是否显示时间选择 */
  enableTimePicker: Boolean,
  /** 第一天从星期几开始 */
  firstDayOfWeek: {
    type: Number,
    validator(val: TdDatePickerProps['firstDayOfWeek']): boolean {
      if (!val) return true;
      return [1, 2, 3, 4, 5, 6, 7].includes(val);
    },
  },
  /** 用于格式化日期，全局配置默认为：'YYYY-MM-DD'，[详细文档](https://day.js.org/docs/en/display/format) */
  format: {
    type: String,
    default: undefined,
  },
  /** 透传给输入框（Input）组件的参数 */
  inputProps: {
    type: Object as PropType<TdDatePickerProps['inputProps']>,
  },
  /** 选择器模式 */
  mode: {
    type: String as PropType<TdDatePickerProps['mode']>,
    default: 'date' as TdDatePickerProps['mode'],
    validator(val: TdDatePickerProps['mode']): boolean {
      if (!val) return true;
      return ['year', 'quarter', 'month', 'week', 'date'].includes(val);
    },
  },
  /** 占位符 */
  placeholder: {
    type: [String, Array] as PropType<TdDatePickerProps['placeholder']>,
    default: undefined,
  },
  /** 透传给 popup 组件的参数 */
  popupProps: {
    type: Object as PropType<TdDatePickerProps['popupProps']>,
  },
  /** 用于自定义组件前置图标 */
  prefixIcon: {
    type: Function as PropType<TdDatePickerProps['prefixIcon']>,
  },
  /** 预设快捷日期选择，示例：`{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }` */
  presets: {
    type: Object as PropType<TdDatePickerProps['presets']>,
  },
  /** 预设面板展示区域（包含确定按钮） */
  presetsPlacement: {
    type: String as PropType<TdDatePickerProps['presetsPlacement']>,
    default: 'bottom' as TdDatePickerProps['presetsPlacement'],
    validator(val: TdDatePickerProps['presetsPlacement']): boolean {
      if (!val) return true;
      return ['left', 'top', 'right', 'bottom'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdDatePickerProps['status']>,
    validator(val: TdDatePickerProps['status']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 用于自定义组件后置图标 */
  suffixIcon: {
    type: Function as PropType<TdDatePickerProps['suffixIcon']>,
  },
  /** 透传 TimePicker 组件属性 */
  timePickerProps: {
    type: Object as PropType<TdDatePickerProps['timePickerProps']>,
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdDatePickerProps['tips']>,
  },
  /** 选中值 */
  value: {
    type: [String, Number, Array, Date] as PropType<TdDatePickerProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number, Array, Date] as PropType<TdDatePickerProps['value']>,
    default: undefined,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number, Array, Date] as PropType<TdDatePickerProps['defaultValue']>,
    default: '',
  },
  /** 当输入框失去焦点时触发 */
  onBlur: Function as PropType<TdDatePickerProps['onBlur']>,
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdDatePickerProps['onChange']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<TdDatePickerProps['onFocus']>,
  /** 面板选中值后触发 */
  onPick: Function as PropType<TdDatePickerProps['onPick']>,
};
