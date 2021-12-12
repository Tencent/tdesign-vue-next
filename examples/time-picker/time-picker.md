:: BASE_DOC ::

## API

### TimePicker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许直接输入时间 | N
clearable | Boolean | false | 是否允许清除选中值 | N
disabled | Boolean | false | 是否禁用组件 | N
disableTime | Function | - | 禁用时间项。TS 类型：`(h: number, m: number, s: number) => boolean` | N
format | String | 'HH:mm:ss' | 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format) | N
hideDisabledTime | Boolean | true | 是否隐藏禁用状态的时间项 | N
placeholder | String | - | 占位符 | N
size | String | medium | 尺寸。可选项：small/medium/large | N
steps | Array | () => [1, 1, 1] | 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']。TS 类型：`Array<string | number>` | N
value | String | - | 选中值。支持语法糖。TS 类型：`TimePickerValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
defaultValue | String | - | 选中值。非受控属性。TS 类型：`TimePickerValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
onBlur | Function |  | 当输入框失去焦点时触发，参数 input 表示输入框内容，value 表示组件当前有效值，trigger 表示触发源头。`(context: { trigger: 'hour' | 'minute' | 'second'; input: string; value: TimePickerValue; e: FocusEvent }) => {}` | N
onChange | Function |  | 选中值发生变化时触发。`(value: TimePickerValue) => {}` | N
onClose | Function |  | 面板关闭时触发。`(context: { e: MouseEvent }) => {}` | N
onFocus | Function |  | 输入框获得焦点时触发，参数 input 表示输入框内容，value 表示组件当前有效值，trigger 表示触发源头。`(context: { trigger: 'hour' | 'minute' | 'second'; input: string; value: TimePickerValue; e: FocusEvent }) => {}` | N
onInput | Function |  | 当输入框内容发生变化时触发，参数 input 表示输入框内容，value 表示组件当前有效值。`(context: { input: string; value: TimePickerValue; e: InputEvent }) => {}` | N
onOpen | Function |  | 面板打开时触发。`(context: { e: MouseEvent }) => {}` | N

### TimePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { trigger: 'hour' | 'minute' | 'second'; input: string; value: TimePickerValue; e: FocusEvent })` | 当输入框失去焦点时触发，参数 input 表示输入框内容，value 表示组件当前有效值，trigger 表示触发源头
change | `(value: TimePickerValue)` | 选中值发生变化时触发
close | `(context: { e: MouseEvent })` | 面板关闭时触发
focus | `(context: { trigger: 'hour' | 'minute' | 'second'; input: string; value: TimePickerValue; e: FocusEvent })` | 输入框获得焦点时触发，参数 input 表示输入框内容，value 表示组件当前有效值，trigger 表示触发源头
input | `(context: { input: string; value: TimePickerValue; e: InputEvent })` | 当输入框内容发生变化时触发，参数 input 表示输入框内容，value 表示组件当前有效值
open | `(context: { e: MouseEvent })` | 面板打开时触发

### TimeRangePicker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowInput | Boolean | false | 是否允许直接输入时间 | N
clearable | Boolean | false | 是否允许清除选中值 | N
disabled | Boolean / Array | false | 是否禁用组件，值为数组表示可分别控制开始日期和结束日期是否禁用。TS 类型：`boolean | Array<boolean>` | N
disableTime | Function | - | 禁用时间项。TS 类型：`(h: number, m: number, s: number, context: { partial: TimeRangePickerPartial }) => boolean`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
format | String | 'HH:mm:ss' | 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format) | N
hideDisabledTime | Boolean | true | 是否隐藏禁用状态的时间项 | N
placeholder | String / Array | - | 占位符，值为数组表示可分别为开始日期和结束日期设置占位符。TS 类型：`string | Array<string>` | N
size | String | medium | 尺寸。可选项：small/medium/large | N
steps | Array | () => [1, 1, 1] | 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1']。TS 类型：`Array<string | number>` | N
value | Array | - | 选中值。支持语法糖。TS 类型：`TimeRangeValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
defaultValue | Array | - | 选中值。非受控属性。TS 类型：`TimeRangeValue`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
onBlur | Function |  | 当输入框失去焦点时触发。`(context: { value: TimeRangeValue; e: FocusEvent }) => {}` | N
onChange | Function |  | 选中值发生变化时触发。`(value: TimeRangeValue) => {}` | N
onFocus | Function |  | 输入框获得焦点时触发。`(context: { value: TimeRangeValue; e: FocusEvent }) => {}` | N
onInput | Function |  | 当输入框内容发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值。`(context: { input: string; value: TimeRangeValue; e: InputEvent }) => {}` | N

### TimeRangePicker Events

名称 | 参数 | 描述
-- | -- | --
blur | `(context: { value: TimeRangeValue; e: FocusEvent })` | 当输入框失去焦点时触发
change | `(value: TimeRangeValue)` | 选中值发生变化时触发
focus | `(context: { value: TimeRangeValue; e: FocusEvent })` | 输入框获得焦点时触发
input | `(context: { input: string; value: TimeRangeValue; e: InputEvent })` | 当输入框内容发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值
