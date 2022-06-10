:: BASE_DOC ::

## API
### DatePicker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许输入日期 | N
clearable | Boolean | false | 是否显示清除按钮 | N
disabled | Boolean | false | 是否禁用组件 | N
disableDate | Object / Array / Function | - | 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。`{ from: 'A', to: 'B' }` 表示在 A 到 B 之间的日期会被禁用。`{ before: 'A', after: 'B' }` 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用。TS 类型：`DisableDate` `type DisableDate = Array<DateValue> | DisableDateObj | ((date: DateValue) => boolean)` `interface DisableDateObj { from?: string; to?: string; before?: string; after?: string }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
enableTimePicker | Boolean | false | 是否显示时间选择 | N
firstDayOfWeek | Number | - | 第一天从星期几开始。可选项：1/2/3/4/5/6/7 | N
format | String | - | 用于格式化日期，全局配置默认为：'YYYY-MM-DD'，[详细文档](https://day.js.org/docs/en/display/format) | N
inputProps | Object | - | 透传给输入框（Input）组件的参数。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
mode | String | date | 选择器模式。可选项：year/month/date | N
placeholder | String / Array | undefined | 占位符。TS 类型：`string` | N
popupProps | Object | - | 透传给 popup 组件的参数。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
prefixIcon | Slot / Function | - | 用于自定义组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
presets | Object | - | 预设快捷日期选择，示例：`{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }`。TS 类型：`PresetDate` `interface PresetDate { [name: string]: DateValue | (() => DateValue) }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
presetsPlacement | String | bottom | 预设面板展示区域（包含确定按钮）。可选项：left/top/right/bottom | N
suffixIcon | Slot / Function | - | 用于自定义组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
timePickerProps | Object | - | 透传 TimePicker 组件属性。TS 类型：`TimePickerProps`，[TimePicker API Documents](./time-picker?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
value | String / Number / Array / Date | '' | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`DateValue` `type DateValue = string | number | Date`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
defaultValue | String / Number / Array / Date | '' | 选中值。非受控属性。TS 类型：`DateValue` `type DateValue = string | number | Date`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
valueType | String | - | 用于格式化日期，默认为：'YYYY-MM-DD'，可选值：'date/time-stamp/YYY-MM-DD' 等，[更多可选值见 Dayjs 详细文档](https://day.js.org/docs/en/display/format)。<br /> 其中 `valueType=date` 表示 `value` 数据类型为 `Date`；`valueType='time-stamp'` 表示 `value` 数据类型为时间戳 | N
onBlur | Function |  | TS 类型：`(context: { value: DateValue; e: FocusEvent }) => void`<br/>当输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: DateValue, context: { dayjsValue?: Dayjs, trigger?: DatePickerTriggerSource }) => void`<br/>选中值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`import { Dayjs } from 'dayjs'`<br/><br/>`type DatePickerTriggerSource = 'confirm' | 'pick' | 'enter' | 'preset' | 'clear'`<br/> | N
onFocus | Function |  | TS 类型：`(context: { value: DateValue; e: FocusEvent }) => void`<br/>输入框获得焦点时触发 | N
onInput | Function |  | TS 类型：`(context: { input: string; value: DateValue; e: InputEvent }) => void`<br/>输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 | N
onPick | Function |  | TS 类型：`(value: DateValue) => void`<br/>面板选中值后触发 | N

### DatePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: DateValue; e: FocusEvent })` | 当输入框失去焦点时触发
change | `(value: DateValue, context: { dayjsValue?: Dayjs, trigger?: DatePickerTriggerSource })` | 选中值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`import { Dayjs } from 'dayjs'`<br/><br/>`type DatePickerTriggerSource = 'confirm' | 'pick' | 'enter' | 'preset' | 'clear'`<br/>
focus | `(context: { value: DateValue; e: FocusEvent })` | 输入框获得焦点时触发
input | `(context: { input: string; value: DateValue; e: InputEvent })` | 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值
pick | `(value: DateValue)` | 面板选中值后触发

### DateRangePicker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许输入日期 | N
clearable | Boolean | false | 是否显示清楚按钮 | N
disabled | Boolean | false | 是否禁用组件，值为数组表示可分别控制开始日期和结束日期是否禁用 | N
disableDate | Object / Array / Function | - | 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用。TS 类型：`DisableRangeDate` `type DisableRangeDate = Array<DateValue> | DisableDateObj | ((context: { date: DateRangeValue; partial: DateRangePickerPartial }) => boolean)` `interface DisableDateObj { from?: string; to?: string; before?: string; after?: string }` `type DateRangePickerPartial = 'start' | 'end'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
enableTimePicker | Boolean | false | 是否显示时间选择 | N
firstDayOfWeek | Number | - | 第一天从星期几开始。可选项：1/2/3/4/5/6/7 | N
format | String | - | 用于格式化日期，[详细文档](https://day.js.org/docs/en/display/format) | N
mode | String | date | 选择器模式。可选项：year/month/date | N
placeholder | String / Array | - | 占位符，值为数组表示可分别为开始日期和结束日期设置占位符。TS 类型：`string | Array<string>` | N
popupProps | Object | - | 透传给 popup 组件的参数。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
presets | Object | - | 预设快捷日期选择，示例：{ '特定日期范围': ['2021-01-01', '2022-01-01'], '本月': [dayjs().startOf('month'), dayjs().endOf('month')] }。TS 类型：`PresetRange` `interface PresetRange { [range: string]: DateRange | (() => DateRange)}` `type DateRange = [DateValue, DateValue]`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
presetsPlacement | String | bottom | 预设面板展示区域（包含确定按钮）。可选项：left/top/right/bottom | N
rangeInputProps | Object | - | 透传给范围输入框 RangeInput 组件的参数。TS 类型：`RangeInputProps`，[RangeInput API Documents](./range-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
separator | String | - | 日期分隔符 | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
timePickerProps | Object | - | 透传 TimePicker 组件属性。TS 类型：`TimePickerProps`，[TimePicker API Documents](./time-picker?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
value | Array | [] | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`DateRangeValue` `type DateRangeValue = Array<DateValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
defaultValue | Array | [] | 选中值。非受控属性。TS 类型：`DateRangeValue` `type DateRangeValue = Array<DateValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
valueType | String | - | 用于格式化日期，默认为：'YYYY-MM-DD'，可选值：'date/time-stamp/YYY-MM-DD' 等，[更多可选值见 Dayjs 详细文档](https://day.js.org/docs/en/display/format)。<br /> 其中 `valueType=date` 表示 `value` 数据类型为 `Date`；`valueType='time-stamp'` 表示 `value` 数据类型为时间戳 | N
onBlur | Function |  | TS 类型：`(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent }) => void`<br/>当输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: DateRangeValue, context: { dayjsValue?: Dayjs[], trigger?: DatePickerTriggerSource }) => void`<br/>选中值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`import { Dayjs } from 'dayjs'`<br/> | N
onFocus | Function |  | TS 类型：`(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent }) => void`<br/>输入框获得焦点时触发 | N
onInput | Function |  | TS 类型：`(context: { input: string; value: DateRangeValue; partial: DateRangePickerPartial; e: InputEvent }) => void`<br/>输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 | N
onPick | Function |  | TS 类型：`(value: DateValue, context: PickContext) => void`<br/>选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`interface PickContext { e: MouseEvent; partial: DateRangePickerPartial }`<br/> | N

### DateRangePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent })` | 当输入框失去焦点时触发
change | `(value: DateRangeValue, context: { dayjsValue?: Dayjs[], trigger?: DatePickerTriggerSource })` | 选中值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`import { Dayjs } from 'dayjs'`<br/>
focus | `(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent })` | 输入框获得焦点时触发
input | `(context: { input: string; value: DateRangeValue; partial: DateRangePickerPartial; e: InputEvent })` | 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值
pick | `(value: DateValue, context: PickContext)` | 选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`interface PickContext { e: MouseEvent; partial: DateRangePickerPartial }`<br/>


### DatePickerPanel Events

名称 | 参数 | 描述
-- | -- | --
cell-click | `(context: { date: Date, e: MouseEvent })` | 点击日期单元格时触发
change | `(value: DateValue, context: { dayjsValue?: Dayjs, e?: MouseEvent, trigger?: DatePickerTriggerSource })` | 选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同
confirm | `(context: { date: Date, e: MouseEvent })` | 如果存在“确认”按钮，则点击“确认”按钮时触发
month-change | `(context: { month: number, date: Date, e?: MouseEvent, trigger: DatePickerMonthChangeTrigger })` | 月份切换发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`type DatePickerMonthChangeTrigger = 'month-select' | 'month-arrow-next' | 'month-arrow-previous'`<br/>
panel-click | `(context: { e: MouseEvent })` | 点击面板时触发
preset-click | `(context: { preset: PresetDate, e: MouseEvent })` | 如果存在“确认”按钮，则点击“确认”按钮时触发
time-change | `(context: { time: string, date: Date, trigger: DatePickerTimeChangeTrigger, e?: MouseEvent })` | 时间切换发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`type DatePickerTimeChangeTrigger = 'time-hour' | 'time-minute' | 'time-second'`<br/>
year-change | `(context: { year: number, date: Date, trigger: DatePickerYearChangeTrigger, e?: MouseEvent })` | 年份切换发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`type DatePickerYearChangeTrigger = 'year-select' | 'year-arrow-next' | 'year-arrow-previous'`<br/>
### DatePickerPanel Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
`Pick<DatePickerProps, 'value' | 'defaultValue' | 'valueType' | 'disabled' | 'disableDate' | 'enableTimePicker' | 'firstDayOfWeek' | 'format' | 'mode' | 'presets' | 'presetsPlacement' | 'timePickerProps'>` | \- | - | 继承 `Pick<DatePickerProps, 'value' | 'defaultValue' | 'valueType' | 'disabled' | 'disableDate' | 'enableTimePicker' | 'firstDayOfWeek' | 'format' | 'mode' | 'presets' | 'presetsPlacement' | 'timePickerProps'>` 中的全部 API | N


### DateRangePickerPanel Events

名称 | 参数 | 描述
-- | -- | --
cell-click | `(context: { date: Date[], partial: DateRangePickerPartial, e: MouseEvent })` | 点击日期单元格时触发
change | `(value: DateRangeValue, context: { dayjsValue?: Dayjs[], partial: DateRangePickerPartial, e?: MouseEvent, trigger?: DatePickerTriggerSource })` | 选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同
confirm | `(context: { date: Date[], e: MouseEvent })` | 如果存在“确认”按钮，则点击“确认”按钮时触发
month-change | `(context: { month: number, date: Date[], partial: DateRangePickerPartial, e?: MouseEvent, trigger: DatePickerMonthChangeTrigger })` | 月份切换发生变化时触发
panel-click | `(context: { e: MouseEvent })` | 点击面板时触发
time-change | `(context: { time: string, date: Date[], partial: DateRangePickerPartial, trigger: DatePickerTimeChangeTrigger, e?: MouseEvent })` | 时间切换发生变化时触发
year-change | `(context: { year: number, date: Date[], partial: DateRangePickerPartial, trigger: DatePickerYearChangeTrigger, e?: MouseEvent })` | 年份切换发生变化时触发
### DateRangePickerPanel Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
`Pick<DateRangePickerProps, 'value'| 'defaultValue' | 'valueType' | 'size' | 'disabled' | 'disableDate' | 'enableTimePicker' | 'firstDayOfWeek' | 'format' | 'mode' | 'presets' | 'presetsPlacement' | 'timePickerProps'>` | \- | - | 继承 `Pick<DateRangePickerProps, 'value'| 'defaultValue' | 'valueType' | 'size' | 'disabled' | 'disableDate' | 'enableTimePicker' | 'firstDayOfWeek' | 'format' | 'mode' | 'presets' | 'presetsPlacement' | 'timePickerProps'>` 中的全部 API | N
