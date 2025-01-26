/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDateRangePickerProps } from '../date-picker/type';
import { PropType } from 'vue';

export default {
  /** 是否允许输入日期 */
  allowInput: Boolean,
  /** 无边框模式 */
  borderless: Boolean,
  /** 默认的日期选择交互是根据点击前后日期的顺序来决定并且会加以限制。比如：用户先点击开始时间输入框，选择了一个日期例如2020-05-15，紧接着交互会自动将焦点跳到结束日期输入框，等待用户选择结束时间。此时用户只能选择大于2020-05-15的日期（之前的日期会被灰态禁止点击，限制用户的点击）。当该值传递`true`时，则取消该限制 */
  cancelRangeSelectLimit: Boolean,
  /** 是否显示清除按钮 */
  clearable: Boolean,
  /** 时间选择器默认值，当 value/defaultValue 未设置值时有效 */
  defaultTime: {
    type: Array as PropType<TdDateRangePickerProps['defaultTime']>,
    default: (): TdDateRangePickerProps['defaultTime'] => ['00:00:00', '23:59:59'],
  },
  /** 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用 */
  disableDate: {
    type: [Object, Array, Function] as PropType<TdDateRangePickerProps['disableDate']>,
  },
  /** 是否禁用组件 */
  disabled: {
    type: Boolean,
    default: undefined,
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
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdDateRangePickerProps['label']>,
  },
  /** 选择器模式 */
  mode: {
    type: String as PropType<TdDateRangePickerProps['mode']>,
    default: 'date' as TdDateRangePickerProps['mode'],
    validator(val: TdDateRangePickerProps['mode']): boolean {
      if (!val) return true;
      return ['year', 'quarter', 'month', 'week', 'date'].includes(val);
    },
  },
  /** 决定在日期时间区间选择器的场景下是否需要点击确认按钮才完成选择动作，默认为 `true` */
  needConfirm: {
    type: Boolean,
    default: true,
  },
  /** 在开始日期选中之前，面板是否显示预选状态，即是否高亮预选日期 */
  panelPreselection: {
    type: Boolean,
    default: true,
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
  /** 只读状态 */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /** 日期分隔符，支持全局配置，默认为 '-' */
  separator: {
    type: String,
    default: '',
  },
  /** 输入框尺寸 */
  size: {
    type: String as PropType<TdDateRangePickerProps['size']>,
    default: 'medium' as TdDateRangePickerProps['size'],
    validator(val: TdDateRangePickerProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdDateRangePickerProps['status']>,
    default: 'default' as TdDateRangePickerProps['status'],
    validator(val: TdDateRangePickerProps['status']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
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
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdDateRangePickerProps['tips']>,
  },
  /** 选中值 */
  value: {
    type: Array as PropType<TdDateRangePickerProps['value']>,
    default: undefined as TdDateRangePickerProps['value'],
  },
  modelValue: {
    type: Array as PropType<TdDateRangePickerProps['value']>,
    default: undefined as TdDateRangePickerProps['value'],
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdDateRangePickerProps['defaultValue']>,
    default: (): TdDateRangePickerProps['defaultValue'] => [],
  },
  /** 用于格式化日期的值，仅支持部分格式，时间戳、日期等。⚠️ `YYYYMMDD` 这种格式不支持，请勿使用，如果希望支持可以给 `dayjs` 提个 PR。注意和 `format` 的区别，`format` 仅用于处理日期在页面中呈现的格式 */
  valueType: {
    type: String as PropType<TdDateRangePickerProps['valueType']>,
    validator(val: TdDateRangePickerProps['valueType']): boolean {
      if (!val) return true;
      return [
        'time-stamp',
        'Date',
        'YYYY',
        'YYYY-MM',
        'YYYY-MM-DD',
        'YYYY-MM-DD HH',
        'YYYY-MM-DD HH:mm',
        'YYYY-MM-DD HH:mm:ss',
        'YYYY-MM-DD HH:mm:ss:SSS',
      ].includes(val);
    },
  },
  /** 当输入框失去焦点时触发 */
  onBlur: Function as PropType<TdDateRangePickerProps['onBlur']>,
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdDateRangePickerProps['onChange']>,
  /** 如果存在“确定”按钮，则点击“确定”按钮时触发 */
  onConfirm: Function as PropType<TdDateRangePickerProps['onConfirm']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<TdDateRangePickerProps['onFocus']>,
  /** 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 */
  onInput: Function as PropType<TdDateRangePickerProps['onInput']>,
  /** 选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期 */
  onPick: Function as PropType<TdDateRangePickerProps['onPick']>,
  /** 点击预设按钮后触发 */
  onPresetClick: Function as PropType<TdDateRangePickerProps['onPresetClick']>,
};
