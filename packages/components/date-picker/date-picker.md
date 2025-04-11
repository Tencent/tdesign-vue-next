:: BASE_DOC ::

## API

### DatePicker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许输入日期 | N
borderless | Boolean | false | 无边框模式 | N
clearable | Boolean | false | 是否显示清除按钮 | N
defaultTime | String | '00:00:00' | 时间选择器默认值，当 value/defaultValue 未设置值时有效 | N
disableDate | Object / Array / Function | - | 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。`{ from: 'A', to: 'B' }` 表示在 A 到 B 之间的日期会被禁用。`{ before: 'A', after: 'B' }` 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用。TS 类型：`DisableDate` `type DisableDate = Array<DateValue> \| DisableDateObj \| ((date: DateValue) => boolean)` `interface DisableDateObj { from?: string; to?: string; before?: string; after?: string }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
disabled | Boolean | undefined | 是否禁用组件 | N
enableTimePicker | Boolean | false | 是否显示时间选择 | N
firstDayOfWeek | Number | 7 | 第一天从星期几开始。可选项：1/2/3/4/5/6/7 | N
format | String | 'YYYY-MM-DD' | 仅用于格式化日期显示的格式，不影响日期值。注意和 `valueType` 的区别，`valueType`会直接决定日期值 `value` 的格式。全局配置默认为：'YYYY-MM-DD'，[详细文档](https://day.js.org/docs/en/display/format) | N
inputProps | Object | - | 透传给输入框（Input）组件的参数。TS 类型：`InputProps`，[Input API Documents](./input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
mode | String | date | 选择器模式。可选项：year/quarter/month/week/date | N
multiple | Boolean | false | 支持多选日期，但不支持在range-picker中，或与enableTimePicker、allowInput 一起使用。TS 类型：`boolean` | N
needConfirm | Boolean | true | 决定在日期时间选择器的场景下是否需要点击确认按钮才完成选择动作，默认为`true` | N
placeholder | String / Array | undefined | 占位符。TS 类型：`string` | N
popupProps | Object | - | 透传给 popup 组件的参数。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
prefixIcon | Slot / Function | - | 用于自定义组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
presets | Object | - | 预设快捷日期选择，示例：`{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }`。TS 类型：`PresetDate` `interface PresetDate { [name: string]: DateValue \| (() => DateValue) }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
presetsPlacement | String | bottom | 预设面板展示区域（包含确定按钮）。可选项：left/top/right/bottom | N
readonly | Boolean | undefined | 是否只读，优先级大于 allowInput | N
selectInputProps | Object | - | 透传 SelectInput 筛选器输入框组件的全部属性。TS 类型：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
size | String | medium | 输入框尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
suffixIcon | Slot / Function | - | 用于自定义组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
timePickerProps | Object | - | 透传 TimePicker 组件属性。TS 类型：`TimePickerProps`，[TimePicker API Documents](./time-picker?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | String / Number / Array / Date | '' | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`DateValue \| DateMultipleValue` ` type DateValue = string \| number \| Date ` ` type DateMultipleValue = Array<DateValue> `。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
defaultValue | String / Number / Array / Date | '' | 选中值。非受控属性。TS 类型：`DateValue \| DateMultipleValue` ` type DateValue = string \| number \| Date ` ` type DateMultipleValue = Array<DateValue> `。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
valueDisplay | String / Slot / Function | - | 自定义选中项呈现的内容。TS 类型：`string \| TNode<{ value: DateValue; displayValue?: DateValue }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
valueType | String | - | 用于格式化日期的值，仅支持部分格式，时间戳、日期等。⚠️ `YYYYMMDD` 这种格式不支持，请勿使用，如果希望支持可以给 `dayjs` 提个 PR。注意和 `format` 的区别，`format` 仅用于处理日期在页面中呈现的格式。`ValueTypeEnum` 即将废弃，请更为使用 `DatePickerValueType`。TS 类型：`DatePickerValueType` `type DatePickerValueType = 'time-stamp' \| 'Date' \| 'YYYY' \| 'YYYY-MM' \| 'YYYY-MM-DD' \| 'YYYY-MM-DD HH' \| 'YYYY-MM-DD HH:mm' \| 'YYYY-MM-DD HH:mm:ss' \| 'YYYY-MM-DD HH:mm:ss:SSS'` `type ValueTypeEnum = DatePickerValueType`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
onBlur | Function |  | TS 类型：`(context: { value: DateValue \| DateMultipleValue; e: FocusEvent }) => void`<br/>当输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: DateValue\| DateMultipleValue, context: { dayjsValue?: Dayjs, trigger?: DatePickerTriggerSource }) => void`<br/>选中值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`import { Dayjs } from 'dayjs'`<br/><br/>`type DatePickerTriggerSource = 'confirm' \| 'pick' \| 'enter' \| 'preset' \| 'clear'`<br/> | N
onConfirm | Function |  | TS 类型：`(context: { date: Date, e: MouseEvent }) => void`<br/>如果存在“确定”按钮，则点击“确定”按钮时触发 | N
onFocus | Function |  | TS 类型：`(context: { value: DateValue \| DateMultipleValue; e: FocusEvent }) => void`<br/>输入框获得焦点时触发 | N
onPick | Function |  | TS 类型：`(value: DateValue) => void`<br/>面板选中值后触发 | N
onPresetClick | Function |  | TS 类型：`(context: { preset: PresetDate, e: MouseEvent }) => void`<br/>点击预设按钮后触发 | N

### DatePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: DateValue \| DateMultipleValue; e: FocusEvent })` | 当输入框失去焦点时触发
change | `(value: DateValue\| DateMultipleValue, context: { dayjsValue?: Dayjs, trigger?: DatePickerTriggerSource })` | 选中值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`import { Dayjs } from 'dayjs'`<br/><br/>`type DatePickerTriggerSource = 'confirm' \| 'pick' \| 'enter' \| 'preset' \| 'clear'`<br/>
confirm | `(context: { date: Date, e: MouseEvent })` | 如果存在“确定”按钮，则点击“确定”按钮时触发
focus | `(context: { value: DateValue \| DateMultipleValue; e: FocusEvent })` | 输入框获得焦点时触发
pick | `(value: DateValue)` | 面板选中值后触发
preset-click | `(context: { preset: PresetDate, e: MouseEvent })` | 点击预设按钮后触发


### DateRangePicker Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许输入日期 | N
borderless | Boolean | false | 无边框模式 | N
cancelRangeSelectLimit | Boolean | false | 默认的日期选择交互是根据点击前后日期的顺序来决定并且会加以限制。比如：用户先点击开始时间输入框，选择了一个日期例如2020-05-15，紧接着交互会自动将焦点跳到结束日期输入框，等待用户选择结束时间。此时用户只能选择大于2020-05-15的日期（之前的日期会被灰态禁止点击，限制用户的点击）。当该值传递`true`时，则取消该限制 | N
clearable | Boolean | false | 是否显示清除按钮 | N
defaultTime | Array | ["00:00:00", "23:59:59"] | 时间选择器默认值，当 value/defaultValue 未设置值时有效。TS 类型：`string[]` | N
disableDate | Object / Array / Function | - | 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用。TS 类型：`DisableRangeDate` `type DisableRangeDate = Array<DateValue> \| DisableDateObj \| ((context: { date: DateRangeValue; partial: DateRangePickerPartial }) => boolean)` `interface DisableDateObj { from?: string; to?: string; before?: string; after?: string }` `type DateRangePickerPartial = 'start' \| 'end'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
disableTime | Function | - | 禁用时间项的配置函数，仅在日期区间选择器中开启时间展示时可用。TS 类型：`(times: Array<Date \| null>, context: { partial: DateRangePickerPartial }) => Partial<{ hour: Array<number>, minute: Array<number>, second: Array<number> }>` | N
disabled | Boolean | undefined | 是否禁用组件 | N
enableTimePicker | Boolean | false | 是否显示时间选择 | N
firstDayOfWeek | Number | - | 第一天从星期几开始。可选项：1/2/3/4/5/6/7 | N
format | String | - | 用于格式化日期，[详细文档](https://day.js.org/docs/en/display/format) | N
label | String / Slot / Function | - | 左侧文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
mode | String | date | 选择器模式。可选项：year/quarter/month/week/date | N
needConfirm | Boolean | true | 决定在日期时间区间选择器的场景下是否需要点击确认按钮才完成选择动作，默认为 `true` | N
panelPreselection | Boolean | true | 在开始日期选中之前，面板是否显示预选状态，即是否高亮预选日期 | N
placeholder | String / Array | - | 占位符，值为数组表示可分别为开始日期和结束日期设置占位符。TS 类型：`string \| Array<string>` | N
popupProps | Object | - | 透传给 popup 组件的参数。TS 类型：`PopupProps`，[Popup API Documents](./popup?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
presets | Object | - | 预设快捷日期选择，示例：{ '特定日期范围': ['2021-01-01', '2022-01-01'], '本月': [dayjs().startOf('month'), dayjs().endOf('month')] }。TS 类型：`PresetRange` `interface PresetRange { [range: string]: DateRange \| (() => DateRange)}` `type DateRange = [DateValue, DateValue]`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
presetsPlacement | String | bottom | 预设面板展示区域（包含确定按钮）。可选项：left/top/right/bottom | N
readonly | Boolean | undefined | 是否只读，优先级大于 `allowInput` | N
rangeInputProps | Object | - | 透传给范围输入框 RangeInput 组件的参数。TS 类型：`RangeInputProps`，[RangeInput API Documents](./range-input?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
separator | String | - | 日期分隔符，支持全局配置，默认为 '-' | N
size | String | medium | 输入框尺寸。可选项：small/medium/large。TS 类型：`SizeEnum`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
status | String | default | 输入框状态。可选项：default/success/warning/error | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
timePickerProps | Object | - | 透传 TimePicker 组件属性。TS 类型：`TimePickerProps`，[TimePicker API Documents](./time-picker?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
tips | String / Slot / Function | - | 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
value | Array | [] | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`DateRangeValue` `type DateRangeValue = Array<DateValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
defaultValue | Array | [] | 选中值。非受控属性。TS 类型：`DateRangeValue` `type DateRangeValue = Array<DateValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts) | N
valueType | String | - | 用于格式化日期的值，仅支持部分格式，时间戳、日期等。⚠️ `YYYYMMDD` 这种格式不支持，请勿使用，如果希望支持可以给 `dayjs` 提个 PR。注意和 `format` 的区别，`format` 仅用于处理日期在页面中呈现的格式。可选项：time-stamp/Date/YYYY/YYYY-MM/YYYY-MM-DD/YYYY-MM-DD HH/YYYY-MM-DD HH:mm/YYYY-MM-DD HH:mm:ss/YYYY-MM-DD HH:mm:ss:SSS | N
onBlur | Function |  | TS 类型：`(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent }) => void`<br/>当输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: DateRangeValue, context: { dayjsValue?: Dayjs[], trigger?: DatePickerTriggerSource }) => void`<br/>选中值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`import { Dayjs } from 'dayjs'`<br/> | N
onConfirm | Function |  | TS 类型：`(context: { date: Date[], e: MouseEvent, partial: DateRangePickerPartial }) => void`<br/>如果存在“确定”按钮，则点击“确定”按钮时触发 | N
onFocus | Function |  | TS 类型：`(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent }) => void`<br/>输入框获得焦点时触发 | N
onInput | Function |  | TS 类型：`(context: { input: string; value: DateRangeValue; partial: DateRangePickerPartial; e: InputEvent }) => void`<br/>输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 | N
onPick | Function |  | TS 类型：`(value: DateValue, context: PickContext) => void`<br/>选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`interface PickContext { e: MouseEvent; partial: DateRangePickerPartial }`<br/> | N
onPresetClick | Function |  | TS 类型：`(context: { preset: PresetDate, e: MouseEvent }) => void`<br/>点击预设按钮后触发 | N

### DateRangePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent })` | 当输入框失去焦点时触发
change | `(value: DateRangeValue, context: { dayjsValue?: Dayjs[], trigger?: DatePickerTriggerSource })` | 选中值发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`import { Dayjs } from 'dayjs'`<br/>
confirm | `(context: { date: Date[], e: MouseEvent, partial: DateRangePickerPartial })` | 如果存在“确定”按钮，则点击“确定”按钮时触发
focus | `(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent })` | 输入框获得焦点时触发
input | `(context: { input: string; value: DateRangeValue; partial: DateRangePickerPartial; e: InputEvent })` | 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值
pick | `(value: DateValue, context: PickContext)` | 选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`interface PickContext { e: MouseEvent; partial: DateRangePickerPartial }`<br/>
preset-click | `(context: { preset: PresetDate, e: MouseEvent })` | 点击预设按钮后触发


### DatePickerPanel Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
defaultTime | String | '00:00:00' | 时间选择器默认值，当 value/defaultValue 未设置值时有效 | N
`Pick<DatePickerProps, 'value' \| 'defaultValue' \| 'disableDate' \| 'enableTimePicker' \| 'firstDayOfWeek' \| 'format' \| 'mode' \| 'presets' \| 'presetsPlacement' \| 'timePickerProps'>` | \- | - | 继承 `Pick<DatePickerProps, 'value' \| 'defaultValue' \| 'disableDate' \| 'enableTimePicker' \| 'firstDayOfWeek' \| 'format' \| 'mode' \| 'presets' \| 'presetsPlacement' \| 'timePickerProps'>` 中的全部属性 | N
onCellClick | Function |  | TS 类型：`(context: { date: Date, e: MouseEvent }) => void`<br/>点击日期单元格时触发 | N
onChange | Function |  | TS 类型：`(value: DateValue, context: { dayjsValue?: Dayjs, e?: MouseEvent, trigger?: DatePickerTriggerSource }) => void`<br/>选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同 | N
onConfirm | Function |  | TS 类型：`(context: { date: Date, e: MouseEvent }) => void`<br/>如果存在“确定”按钮，则点击“确定”按钮时触发 | N
onMonthChange | Function |  | TS 类型：`(context: { month: number, date: Date, e?: MouseEvent, trigger: DatePickerMonthChangeTrigger }) => void`<br/>月份切换发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`type DatePickerMonthChangeTrigger = 'month-select' \| 'month-arrow-next' \| 'month-arrow-previous' \| 'today'`<br/> | N
onPanelClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击面板时触发 | N
onPresetClick | Function |  | TS 类型：`(context: { preset: PresetDate, e: MouseEvent }) => void`<br/>点击预设按钮后触发 | N
onTimeChange | Function |  | TS 类型：`(context: { time: string, date: Date, trigger: DatePickerTimeChangeTrigger, e?: MouseEvent }) => void`<br/>时间切换发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`type DatePickerTimeChangeTrigger = 'time-hour' \| 'time-minute' \| 'time-second'`<br/> | N
onYearChange | Function |  | TS 类型：`(context: { year: number, date: Date, trigger: DatePickerYearChangeTrigger, e?: MouseEvent }) => void`<br/>年份切换发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`type DatePickerYearChangeTrigger = 'year-select' \| 'year-arrow-next' \| 'year-arrow-previous' \| 'today'`<br/> | N

### DatePickerPanel Events

名称 | 参数 | 描述
-- | -- | --
cell-click | `(context: { date: Date, e: MouseEvent })` | 点击日期单元格时触发
change | `(value: DateValue, context: { dayjsValue?: Dayjs, e?: MouseEvent, trigger?: DatePickerTriggerSource })` | 选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同
confirm | `(context: { date: Date, e: MouseEvent })` | 如果存在“确定”按钮，则点击“确定”按钮时触发
month-change | `(context: { month: number, date: Date, e?: MouseEvent, trigger: DatePickerMonthChangeTrigger })` | 月份切换发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`type DatePickerMonthChangeTrigger = 'month-select' \| 'month-arrow-next' \| 'month-arrow-previous' \| 'today'`<br/>
panel-click | `(context: { e: MouseEvent })` | 点击面板时触发
preset-click | `(context: { preset: PresetDate, e: MouseEvent })` | 点击预设按钮后触发
time-change | `(context: { time: string, date: Date, trigger: DatePickerTimeChangeTrigger, e?: MouseEvent })` | 时间切换发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`type DatePickerTimeChangeTrigger = 'time-hour' \| 'time-minute' \| 'time-second'`<br/>
year-change | `(context: { year: number, date: Date, trigger: DatePickerYearChangeTrigger, e?: MouseEvent })` | 年份切换发生变化时触发。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/date-picker/type.ts)。<br/>`type DatePickerYearChangeTrigger = 'year-select' \| 'year-arrow-next' \| 'year-arrow-previous' \| 'today'`<br/>


### DateRangePickerPanel Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
defaultTime | Array | ["00:00:00", "23:59:59"] | 时间选择器默认值，当 value/defaultValue 未设置值时有效。TS 类型：`string[]` | N
`Pick<DateRangePickerProps, 'value'\| 'defaultValue' \| 'disableDate' \| 'enableTimePicker' \| 'firstDayOfWeek' \| 'format' \| 'mode' \| 'presets' \| 'presetsPlacement' \| 'panelPreselection' \| 'timePickerProps'>` | \- | - | 继承 `Pick<DateRangePickerProps, 'value'\| 'defaultValue' \| 'disableDate' \| 'enableTimePicker' \| 'firstDayOfWeek' \| 'format' \| 'mode' \| 'presets' \| 'presetsPlacement' \| 'panelPreselection' \| 'timePickerProps'>` 中的全部属性 | N
onCellClick | Function |  | TS 类型：`(context: { date: Date[], partial: DateRangePickerPartial, e: MouseEvent }) => void`<br/>点击日期单元格时触发 | N
onChange | Function |  | TS 类型：`(value: DateRangeValue, context: { dayjsValue?: Dayjs[], partial: DateRangePickerPartial, e?: MouseEvent, trigger?: DatePickerTriggerSource }) => void`<br/>选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同 | N
onConfirm | Function |  | TS 类型：`(context: { date: Date[], e: MouseEvent }) => void`<br/>如果存在“确定”按钮，则点击“确定”按钮时触发 | N
onMonthChange | Function |  | TS 类型：`(context: { month: number, date: Date[], partial: DateRangePickerPartial, e?: MouseEvent, trigger: DatePickerMonthChangeTrigger }) => void`<br/>月份切换发生变化时触发 | N
onPanelClick | Function |  | TS 类型：`(context: { e: MouseEvent }) => void`<br/>点击面板时触发 | N
onPresetClick | Function |  | TS 类型：`(context: { preset: PresetDate, e: MouseEvent }) => void`<br/>点击预设按钮后触发 | N
onTimeChange | Function |  | TS 类型：`(context: { time: string, date: Date[], partial: DateRangePickerPartial, trigger: DatePickerTimeChangeTrigger, e?: MouseEvent }) => void`<br/>时间切换发生变化时触发 | N
onYearChange | Function |  | TS 类型：`(context: { year: number, date: Date[], partial: DateRangePickerPartial, trigger: DatePickerYearChangeTrigger, e?: MouseEvent }) => void`<br/>年份切换发生变化时触发 | N

### DateRangePickerPanel Events

名称 | 参数 | 描述
-- | -- | --
cell-click | `(context: { date: Date[], partial: DateRangePickerPartial, e: MouseEvent })` | 点击日期单元格时触发
change | `(value: DateRangeValue, context: { dayjsValue?: Dayjs[], partial: DateRangePickerPartial, e?: MouseEvent, trigger?: DatePickerTriggerSource })` | 选中值发生变化时触发。参数 `context.trigger` 表示触发当前事件的来源，不同的模式触发来源也会不同
confirm | `(context: { date: Date[], e: MouseEvent })` | 如果存在“确定”按钮，则点击“确定”按钮时触发
month-change | `(context: { month: number, date: Date[], partial: DateRangePickerPartial, e?: MouseEvent, trigger: DatePickerMonthChangeTrigger })` | 月份切换发生变化时触发
panel-click | `(context: { e: MouseEvent })` | 点击面板时触发
preset-click | `(context: { preset: PresetDate, e: MouseEvent })` | 点击预设按钮后触发
time-change | `(context: { time: string, date: Date[], partial: DateRangePickerPartial, trigger: DatePickerTimeChangeTrigger, e?: MouseEvent })` | 时间切换发生变化时触发
year-change | `(context: { year: number, date: Date[], partial: DateRangePickerPartial, trigger: DatePickerYearChangeTrigger, e?: MouseEvent })` | 年份切换发生变化时触发
