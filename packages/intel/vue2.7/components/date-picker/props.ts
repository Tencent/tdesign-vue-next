/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdDatePickerProps } from './type';

export default {
  /** 是否允许输入日期 */
  allowInput: Boolean,
  /** 是否显示清除按钮 */
  clearable: Boolean,
  /** 时间选择器默认值，当 value/defaultValue 未设置值时有效 */
  defaultTime: {
    type: String,
    default: '00:00:00',
  },
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
      if (!val) {
        return true;
      }
      return [1, 2, 3, 4, 5, 6, 7].includes(val);
    },
  },
  /** 仅用于格式化日期显示的格式，不影响日期值。注意和 `valueType` 的区别，`valueType`会直接决定日期值 `value` 的格式。全局配置默认为：'YYYY-MM-DD'，[详细文档](https://day.js.org/docs/en/display/format) */
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
      if (!val) {
        return true;
      }
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
      if (!val) {
        return true;
      }
      return ['left', 'top', 'right', 'bottom'].includes(val);
    },
  },
  /** 输入框尺寸 */
  size: {
    type: String as PropType<TdDatePickerProps['size']>,
    default: 'medium' as TdDatePickerProps['size'],
    validator(val: TdDatePickerProps['size']): boolean {
      if (!val) {
        return true;
      }
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdDatePickerProps['status']>,
    default: 'default' as TdDatePickerProps['status'],
    validator(val: TdDatePickerProps['status']): boolean {
      if (!val) {
        return true;
      }
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
    default: '',
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number, Array, Date] as PropType<TdDatePickerProps['defaultValue']>,
    default: '',
  },
  /** 用于格式化日期的值，仅支持部分格式，时间戳、日期等。⚠️ `YYYYMMDD` 这种格式不支持，请勿使用，如果希望支持可以给 `dayjs` 提个 PR。注意和 `format` 的区别，`format` 仅用于处理日期在页面中呈现的格式。`ValueTypeEnum` 即将废弃，请更为使用 `DatePickerValueType` */
  valueType: {
    type: String as PropType<TdDatePickerProps['valueType']>,
    default: '',
  },
  /** 当输入框失去焦点时触发 */
  onBlur: Function as PropType<TdDatePickerProps['onBlur']>,
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdDatePickerProps['onChange']>,
  /** 如果存在“确定”按钮，则点击“确定”按钮时触发 */
  onConfirm: Function as PropType<TdDatePickerProps['onConfirm']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<TdDatePickerProps['onFocus']>,
  /** 面板选中值后触发 */
  onPick: Function as PropType<TdDatePickerProps['onPick']>,
  /** 点击预设按钮后触发 */
  onPresetClick: Function as PropType<TdDatePickerProps['onPresetClick']>,
};
