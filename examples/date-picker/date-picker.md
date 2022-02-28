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
format | String | undefined | 用于格式化日期，全局配置默认为：'YYYY-MM-DD'，[详细文档](https://day.js.org/docs/en/display/format) | N
inputProps | Object | - | 透传给输入框（Input）组件的参数。TS 类型：`InputProps` `import { InputProps } from '@Input'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
mode | String | month | 选择器模式。可选项：year/month/date | N
placeholder | String / Array | undefined | 占位符。TS 类型：`string | Array<string>` | N
popupProps | Object | - | 透传给 popup 组件的参数。TS 类型：`PopupProps` `import { PopupProps } from '@Popup'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
prefixIcon | Slot / Function | - | 用于自定义组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
presets | Object | - | 预设快捷日期选择，示例：`{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }`。TS 类型：`PresetDate` `interface PresetDate { [name: string]: DateValue | (() => DateValue) }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
range | Boolean | false | 是否呈现为日期范围选择器（临时 API，后期将调整为是 DateRangePicker 组件） | N
size | String | medium | 尺寸。可选项：small/medium/large | N
suffixIcon | Slot / Function | - | 用于自定义组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
timePickerProps | Boolean | - | 透传 TimePicker 组件属性。TS 类型：`TimePickerProps` `import { TimePickerProps } from '@TimePicker'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
value | String / Array / Date | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`DateValue` `type DateValue = string | Date | Array<DateValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
defaultValue | String / Array / Date | - | 选中值。非受控属性。TS 类型：`DateValue` `type DateValue = string | Date | Array<DateValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
onBlur | Function |  | TS 类型：`(context: { value: DateValue; e: FocusEvent }) => void`<br/>当输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: DateValue) => void`<br/>选中值发生变化时触发 | N
onFocus | Function |  | TS 类型：`(context: { value: DateValue; e: FocusEvent }) => void`<br/>输入框获得焦点时触发 | N
onInput | Function |  | TS 类型：`(context: { input: string; value: DateValue; e: InputEvent }) => void`<br/>输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 | N

### DatePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: DateValue; e: FocusEvent })` | 当输入框失去焦点时触发
change | `(value: DateValue)` | 选中值发生变化时触发
focus | `(context: { value: DateValue; e: FocusEvent })` | 输入框获得焦点时触发
input | `(context: { input: string; value: DateValue; e: InputEvent })` | 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值

### DateRangePicker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许输入日期 | N
clearable | Boolean | false | 是否显示清楚按钮 | N
disabled | Boolean / Array | false | 是否禁用组件，值为数组表示可分别控制开始日期和结束日期是否禁用。TS 类型：`boolean | Array<boolean>` | N
disableDate | Object / Array / Function | - | 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。{ from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。{ before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。其中 A = '2021-01-01'，B = '2021-02-01'。值类型为 Function 则表示返回值为 true 的日期会被禁用。TS 类型：`DisableRangeDate` `type DisableRangeDate = Array<DateValue> | DisableDateObj | ((context: { date: DateRangeValue; partial: DateRangePickerPartial }) => boolean)` `interface DisableDateObj { from?: string; to?: string; before?: string; after?: string }` `type DateRangePickerPartial = 'start' | 'end'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
firstDayOfWeek | Number | - | 第一天从星期几开始。可选项：1/2/3/4/5/6/7 | N
format | String | 'YYYY-MM-DD' | 用于格式化日期，[详细文档](https://day.js.org/docs/en/display/format) | N
mode | String | month | 选择器模式。可选项：year/month/date | N
placeholder | String / Array | - | 占位符，值为数组表示可分别为开始日期和结束日期设置占位符。TS 类型：`string | Array<string>` | N
prefixIcon | Slot / Function | - | 组件前置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
presets | Object | - | 预设快捷日期选择，示例：{ '特定日期范围': ['2021-01-01', '2022-01-01'], '本月': [dayjs().startOf('month'), dayjs().endOf('month')] }。TS 类型：`PresetRange` `interface PresetRange { [range: string]: DateRange | (() => DateRange)}` `type DateRange = [DateValue, DateValue]`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
separator | String | - | 日期分隔符 | N
size | String | medium | 尺寸。可选项：small/medium/large | N
suffixIcon | Slot / Function | - | 组件后置图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
value | Array | - | 选中值。支持语法糖 `v-model` 或 `v-model:value`。TS 类型：`DateRangeValue` `type DateRangeValue = Array<DateValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
defaultValue | Array | - | 选中值。非受控属性。TS 类型：`DateRangeValue` `type DateRangeValue = Array<DateValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts) | N
onBlur | Function |  | TS 类型：`(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent }) => void`<br/>当输入框失去焦点时触发 | N
onChange | Function |  | TS 类型：`(value: DateRangeValue) => void`<br/>选中值发生变化时触发 | N
onFocus | Function |  | TS 类型：`(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent }) => void`<br/>输入框获得焦点时触发 | N
onInput | Function |  | TS 类型：`(context: { input: string; value: DateRangeValue; partial: DateRangePickerPartial; e: InputEvent }) => void`<br/>输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 | N
onPick | Function |  | TS 类型：`(value: DateValue, context: PickContext) => void`<br/>选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`interface PickContext { e: MouseEvent; partial: DateRangePickerPartial }`<br/> | N

### DateRangePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent })` | 当输入框失去焦点时触发
change | `(value: DateRangeValue)` | 选中值发生变化时触发
focus | `(context: { value: DateRangeValue; partial: DateRangePickerPartial; e: FocusEvent })` | 输入框获得焦点时触发
input | `(context: { input: string; value: DateRangeValue; partial: DateRangePickerPartial; e: InputEvent })` | 输入框数据发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值
pick | `(value: DateValue, context: PickContext)` | 选中日期时触发，可能是开始日期，也可能是结束日期，第二个参数可以区分是开始日期或是结束日期。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/date-picker/type.ts)。<br/>`interface PickContext { e: MouseEvent; partial: DateRangePickerPartial }`<br/>
