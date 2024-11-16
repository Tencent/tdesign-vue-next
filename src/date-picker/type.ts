/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { InputProps } from '../input';
import { PopupProps } from '../popup';
import { SelectInputProps } from '../select-input';
import { TimePickerProps } from '../time-picker';
import { Dayjs } from 'dayjs';
import { RangeInputProps } from '../range-input';
import { TNode, SizeEnum } from '../common';

export interface TdDatePickerProps {
  /**
   * 是否允许输入日期
   * @default false
   */
  allowInput?: boolean;
  /**
   * 无边框模式
   * @default false
   */
  borderless?: boolean;
  /**
   * 是否显示清除按钮
   * @default false
   */
  clearable?: boolean;
  /**
   * 时间选择器默认值，当 value/defaultValue 未设置值时有效
   * @default '00:00:00'
   */
  defaultTime?: string;
  /**
   * 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。`{ from: 'A', to: 'B' }` 表示在 A 到 B 之间的日期会被禁用。`{ before: 'A', after: 'B' }` 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用
   */
  disableDate?: DisableDate;
  /**
   * 是否禁用组件
   */
  disabled?: boolean;
  /**
   * 是否显示时间选择
   * @default false
   */
  enableTimePicker?: boolean;
  /**
   * 第一天从星期几开始
   */
  firstDayOfWeek?: number;
  /**
   * 仅用于格式化日期显示的格式，不影响日期值。注意和 `valueType` 的区别，`valueType`会直接决定日期值 `value` 的格式。全局配置默认为：'YYYY-MM-DD'，[详细文档](https://day.js.org/docs/en/display/format)
   */
  format?: string;
  /**
   * 透传给输入框（Input）组件的参数
   */
  inputProps?: InputProps;
  /**
   * 左侧文本
   */
  label?: string | TNode;
  /**
   * 选择器模式
   * @default date
   */
  mode?: 'year' | 'quarter' | 'month' | 'week' | 'date';
  /**
   * 决定在日期时间选择器的场景下是否需要点击确认按钮才完成选择动作，默认为`true`
   * @default true
   */
  needConfirm?: boolean;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 透传给 popup 组件的参数
   */
  popupProps?: PopupProps;
  /**
   * 用于自定义组件前置图标
   */
  prefixIcon?: TNode;
  /**
   * 预设快捷日期选择，示例：`{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }`
   */
  presets?: PresetDate;
  /**
   * 预设面板展示区域（包含确定按钮）
   * @default bottom
   */
  presetsPlacement?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * 透传 SelectInput 筛选器输入框组件的全部属性
   */
  selectInputProps?: SelectInputProps;
  /**
   * 输入框尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 输入框状态
   * @default default
   */
  status?: 'default' | 'success' | 'warning' | 'error';
  /**
   * 用于自定义组件后置图标
   */
  suffixIcon?: TNode;
  /**
   * 透传 TimePicker 组件属性
   */
  timePickerProps?: TimePickerProps;
  /**
   * 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式
   */
  tips?: string | TNode;
  /**
   * 选中值
   * @default ''
   */
  value?: DateValue;
  /**
   * 选中值，非受控属性
   * @default ''
   */
  defaultValue?: DateValue;
  /**
   * 选中值
   * @default ''
   */
  modelValue?: DateValue;
  /**
   * 自定义选中项呈现的内容
   */
  valueDisplay?: string | TNode<{ value: DateValue; displayValue?: DateValue }>;
  /**
   * 用于格式化日期的值，仅支持部分格式，时间戳、日期等。⚠️ `YYYYMMDD` 这种格式不支持，请勿使用，如果希望支持可以给 `dayjs` 提个 PR。注意和 `format` 的区别，`format` 仅用于处理日期在页面中呈现的格式。`ValueTypeEnum` 即将废弃，请更为使用 `DatePickerValueType`
   * @default ''
   */
  valueType?: DatePickerValueType;
  /**
   * 当输入框失去焦点时触发
   */
  onBlur?: (context: { value: DateValue; e: FocusEvent }) => void;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: DateValue, context: { dayjsValue?: Dayjs; trigger?: DatePickerTriggerSource }) => void;
  /**
   * 如果存在“确定”按钮，则点击“确定”按钮时触发
   */
  onConfirm?: (context: { date: Date; e: MouseEvent }) => void;
  /**
   * 输入框获得焦点时触发
   */
  onFocus?: (context: { value: DateValue; e: FocusEvent }) => void;
  /**
   * 面板选中值后触发
   */
  onPick?: (value: DateValue) => void;
  /**
   * 点击预设按钮后触发
   */
  onPresetClick?: (context: { preset: PresetDate; e: MouseEvent }) => void;
}

export interface TdDateRangePickerProps {
  /**
   * 是否允许输入日期
   * @default false
   */
  allowInput?: boolean;
  /**
   * 无边框模式
   * @default false
   */
  borderless?: boolean;
  /**
   * 默认的日期选择交互是根据点击前后日期的顺序来决定并且会加以限制。比如：用户先点击开始时间输入框，选择了一个日期例如2020-05-15，紧接着交互会自动将焦点跳到结束日期输入框，等待用户选择结束时间。此时用户只能选择大于2020-05-15的日期（之前的日期会被灰态禁止点击，限制用户的点击）。当该值传递`true`时，则取消该限制。
   * @default false
   */
  cancelRangeSelectLimit?: boolean;
  /**
   * 是否显示清除按钮
   * @default false
   */
  clearable?: boolean;
  /**
   * 时间选择器默认值，当 value/defaultValue 未设置值时有效
   * @default ["00:00:00", "23:59:59"]
   */
  defaultTime?: string[];
  /**
   * 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用
   */
  disableDate?: DisableRangeDate;
  /**
   * 是否禁用组件
   */
  disabled?: boolean;
  /**
   * 是否显示时间选择
   * @default false
   */
  enableTimePicker?: boolean;
  /**
   * 第一天从星期几开始
   */
  firstDayOfWeek?: number;
  /**
   * 用于格式化日期，[详细文档](https://day.js.org/docs/en/display/format)
   * @default ''
   */
  format?: string;
  /**
   * 左侧文本
   */
  label?: string | TNode;
  /**
   * 选择器模式
   * @default date
   */
  mode?: 'year' | 'quarter' | 'month' | 'week' | 'date';
  /**
   * 决定在日期时间区间选择器的场景下是否需要点击确认按钮才完成选择动作，默认为 `true`
   * @default true
   */
  needConfirm?: boolean;
  /**
   * 在开始日期选中之前，面板是否显示预选状态，即是否高亮预选日期
   * @default true
   */
  panelPreselection?: boolean;
  /**
   * 占位符，值为数组表示可分别为开始日期和结束日期设置占位符
   */
  placeholder?: string | Array<string>;
  /**
   * 透传给 popup 组件的参数
   */
  popupProps?: PopupProps;
  /**
   * 组件前置图标
   */
  prefixIcon?: TNode;
  /**
   * 预设快捷日期选择，示例：{ '特定日期范围': ['2021-01-01', '2022-01-01'], '本月': [dayjs().startOf('month'), dayjs().endOf('month')] }
   */
  presets?: PresetRange;
  /**
   * 预设面板展示区域（包含确定按钮）
   * @default bottom
   */
  presetsPlacement?: 'left' | 'top' | 'right' | 'bottom';
  /**
   * 透传给范围输入框 RangeInput 组件的参数
   */
  rangeInputProps?: RangeInputProps;
  /**
   * 日期分隔符，支持全局配置，默认为 '-'
   * @default ''
   */
  separator?: string;
  /**
   * 输入框尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 输入框状态
   * @default default
   */
  status?: 'default' | 'success' | 'warning' | 'error';
  /**
   * 组件后置图标
   */
  suffixIcon?: TNode;
  /**
   * 透传 TimePicker 组件属性
   */
  timePickerProps?: TimePickerProps;
  /**
   * 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式
   */
  tips?: string | TNode;
  /**
   * 选中值
   * @default []
   */
  value?: DateRangeValue;
  /**
   * 选中值，非受控属性
   * @default []
   */
  defaultValue?: DateRangeValue;
  /**
   * 选中值
   * @default []
   */
  modelValue?: DateRangeValue;
  /**
   * 用于格式化日期的值，仅支持部分格式，时间戳、日期等。⚠️ `YYYYMMDD` 这种格式不支持，请勿使用，如果希望支持可以给 `dayjs` 提个 PR。注意和 `format` 的区别，`format` 仅用于处理日期在页面中呈现的格式
   */
  valueType?:
    | 'time-stamp'
    | 'Date'
    | 'YYYY'
    | 'YYYY-MM'
    | 'YYYY-MM-DD'
    | 'YYYY-MM-DD HH'
    | 'YYYY-MM-DD HH:mm'
    | 'YYYY-MM-DD HH:mm:ss'
    | 'YYYY-MM-DD HH:mm:ss:SSS'
    | 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  /**
   * 当输入框失去焦点时触发
   */
  onBlur?: (context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent }) => void;
  /**
   * 选中值发生变化时触发
   */
  onChange?: (value: DateRangeValue, context: { dayjsValue?: Dayjs[]; trigger?: DatePickerTriggerSource }) => void;
  /**
   * 如果存在“确定”按钮，则点击“确定”按钮时触发
   */
  onConfirm?: (context: { date: Date[]; e: MouseEvent; partial: DateRangePickerPartial }) => void;
  /**
   * 输入框获得焦点时触发
   */
  onFocus?: (context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent }) => void;
  /**
   * 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值
   */
  onInput?: (context: { input: string; value: DateRangeValue; partial: DateRangePickerPartial; e: InputEvent }) => void;
  /**
   * 选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期
   */
  onPick?: (value: DateValue, context: PickContext) => void;
  /**
   * 点击预设按钮后触发
   */
  onPresetClick?: (context: { preset: PresetDate; e: MouseEvent }) => void;
}

export interface TdDatePickerPanelProps
  extends Pick<
    TdDatePickerProps,
    | 'value'
    | 'defaultValue'
    | 'disableDate'
    | 'enableTimePicker'
    | 'firstDayOfWeek'
    | 'format'
    | 'mode'
    | 'presets'
    | 'presetsPlacement'
    | 'timePickerProps'
  > {
  /**
   * 时间选择器默认值，当 value/defaultValue 未设置值时有效
   * @default '00:00:00'
   */
  defaultTime?: string;
  /**
   * 点击日期单元格时触发
   */
  onCellClick?: (context: { date: Date; e: MouseEvent }) => void;
  /**
   * 选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同
   */
  onChange?: (
    value: DateValue,
    context: { dayjsValue?: Dayjs; e?: MouseEvent; trigger?: DatePickerTriggerSource },
  ) => void;
  /**
   * 如果存在“确定”按钮，则点击“确定”按钮时触发
   */
  onConfirm?: (context: { date: Date; e: MouseEvent }) => void;
  /**
   * 月份切换发生变化时触发
   */
  onMonthChange?: (context: {
    month: number;
    date: Date;
    e?: MouseEvent;
    trigger: DatePickerMonthChangeTrigger;
  }) => void;
  /**
   * 点击面板时触发
   */
  onPanelClick?: (context: { e: MouseEvent }) => void;
  /**
   * 点击预设按钮后触发
   */
  onPresetClick?: (context: { preset: PresetDate; e: MouseEvent }) => void;
  /**
   * 时间切换发生变化时触发
   */
  onTimeChange?: (context: { time: string; date: Date; trigger: DatePickerTimeChangeTrigger; e?: MouseEvent }) => void;
  /**
   * 年份切换发生变化时触发
   */
  onYearChange?: (context: { year: number; date: Date; trigger: DatePickerYearChangeTrigger; e?: MouseEvent }) => void;
}

export interface TdDateRangePickerPanelProps
  extends Pick<
    TdDateRangePickerProps,
    | 'value'
    | 'defaultValue'
    | 'disableDate'
    | 'enableTimePicker'
    | 'firstDayOfWeek'
    | 'format'
    | 'mode'
    | 'presets'
    | 'presetsPlacement'
    | 'panelPreselection'
    | 'timePickerProps'
  > {
  /**
   * 时间选择器默认值，当 value/defaultValue 未设置值时有效
   * @default ["00:00:00", "23:59:59"]
   */
  defaultTime?: string[];
  /**
   * 点击日期单元格时触发
   */
  onCellClick?: (context: { date: Date[]; partial: DateRangePickerPartial; e: MouseEvent }) => void;
  /**
   * 选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同
   */
  onChange?: (
    value: DateRangeValue,
    context: {
      dayjsValue?: Dayjs[];
      partial: DateRangePickerPartial;
      e?: MouseEvent;
      trigger?: DatePickerTriggerSource;
    },
  ) => void;
  /**
   * 如果存在“确定”按钮，则点击“确定”按钮时触发
   */
  onConfirm?: (context: { date: Date[]; e: MouseEvent }) => void;
  /**
   * 月份切换发生变化时触发
   */
  onMonthChange?: (context: {
    month: number;
    date: Date[];
    partial: DateRangePickerPartial;
    e?: MouseEvent;
    trigger: DatePickerMonthChangeTrigger;
  }) => void;
  /**
   * 点击面板时触发
   */
  onPanelClick?: (context: { e: MouseEvent }) => void;
  /**
   * 点击预设按钮后触发
   */
  onPresetClick?: (context: { preset: PresetDate; e: MouseEvent }) => void;
  /**
   * 时间切换发生变化时触发
   */
  onTimeChange?: (context: {
    time: string;
    date: Date[];
    partial: DateRangePickerPartial;
    trigger: DatePickerTimeChangeTrigger;
    e?: MouseEvent;
  }) => void;
  /**
   * 年份切换发生变化时触发
   */
  onYearChange?: (context: {
    year: number;
    date: Date[];
    partial: DateRangePickerPartial;
    trigger: DatePickerYearChangeTrigger;
    e?: MouseEvent;
  }) => void;
}

export type DisableDate = Array<DateValue> | DisableDateObj | ((date: DateValue) => boolean);

export interface DisableDateObj {
  from?: string;
  to?: string;
  before?: string;
  after?: string;
}

export interface PresetDate {
  [name: string]: DateValue | (() => DateValue);
}

export type DateValue = string | number | Date;

export type DatePickerValueType =
  | 'time-stamp'
  | 'Date'
  | 'YYYY'
  | 'YYYY-MM'
  | 'YYYY-MM-DD'
  | 'YYYY-MM-DD HH'
  | 'YYYY-MM-DD HH:mm'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'YYYY-MM-DD HH:mm:ss:SSS';

export type ValueTypeEnum = DatePickerValueType;

export type DatePickerTriggerSource = 'confirm' | 'pick' | 'enter' | 'preset' | 'clear';

export type DisableRangeDate =
  | Array<DateValue>
  | DisableDateObj
  | ((context: { date: DateRangeValue; partial: DateRangePickerPartial }) => boolean);

export type DateRangePickerPartial = 'start' | 'end';

export interface PresetRange {
  [range: string]: DateRange | (() => DateRange);
}

export type DateRange = [DateValue, DateValue];

export type DateRangeValue = Array<DateValue>;

export interface PickContext {
  e: MouseEvent;
  partial: DateRangePickerPartial;
}

export type DatePickerMonthChangeTrigger = 'month-select' | 'month-arrow-next' | 'month-arrow-previous' | 'today';

export type DatePickerTimeChangeTrigger = 'time-hour' | 'time-minute' | 'time-second';

export type DatePickerYearChangeTrigger = 'year-select' | 'year-arrow-next' | 'year-arrow-previous' | 'today';
