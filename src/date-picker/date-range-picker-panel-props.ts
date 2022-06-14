/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDateRangePickerPanelProps, TdDateRangePickerProps } from '../date-picker/type';
import { PropType } from 'vue';

export default {
  disabled: Boolean,
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
  format: {
    type: String,
    default: '',
  },
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
    default: (): TdDateRangePickerProps['defaultValue'] => [],
  },
  /** 用于格式化日期，默认为：'YYYY-MM-DD'，可选值：'date/time-stamp/YYY-MM-DD' 等，[更多可选值见 Dayjs 详细文档](https://day.js.org/docs/en/display/format)。<br /> 其中 `valueType=date` 表示 `value` 数据类型为 `Date`；`valueType='time-stamp'` 表示 `value` 数据类型为时间戳 */
  valueType: {
    type: String,
    default: '',
  },
  /** 点击日期单元格时触发 */
  onCellClick: Function as PropType<TdDateRangePickerPanelProps['onCellClick']>,
  /** 选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同 */
  onChange: Function as PropType<TdDateRangePickerPanelProps['onChange']>,
  /** 如果存在“确认”按钮，则点击“确认”按钮时触发 */
  onConfirm: Function as PropType<TdDateRangePickerPanelProps['onConfirm']>,
  /** 月份切换发生变化时触发 */
  onMonthChange: Function as PropType<TdDateRangePickerPanelProps['onMonthChange']>,
  /** 点击面板时触发 */
  onPanelClick: Function as PropType<TdDateRangePickerPanelProps['onPanelClick']>,
  /** 时间切换发生变化时触发 */
  onTimeChange: Function as PropType<TdDateRangePickerPanelProps['onTimeChange']>,
  /** 年份切换发生变化时触发 */
  onYearChange: Function as PropType<TdDateRangePickerPanelProps['onYearChange']>,
};
