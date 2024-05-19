:: BASE_DOC ::

## API
### TimePicker Props

name | type | default | description | required
-- | -- | -- | -- | --
allowInput | Boolean | false | \- | N
clearable | Boolean | false | \- | N
disableTime | Function | - | disable time config function。Typescript：`(h: number, m: number, s: number, ms: number) => Partial<{ hour: Array<number>, minute: Array<number>, second: Array<number>, millisecond: Array<number>  }>` | N
disabled | Boolean | - | \- | N
format | String | HH:mm:ss | \- | N
hideDisabledTime | Boolean | true | \- | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
placeholder | String | undefined | \- | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
presets | Object | - | Typescript：`PresetTime` `interface PresetTime { [presetName: string]: TimePickerValue \| (() => TimePickerValue) }`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
size | String | medium | options: small/medium/large | N
status | String | default | options: default/success/warning/error | N
steps | Array | [1, 1, 1] | Typescript：`Array<string \| number>` | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
value | String | - | `v-model` is supported。Typescript：`TimePickerValue` `type TimePickerValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
defaultValue | String | - | uncontrolled property。Typescript：`TimePickerValue` `type TimePickerValue = string`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
onBlur | Function | | Typescript：`(context: { value: TimePickerValue; e: FocusEvent }) => void`<br/> | N
onChange | Function |  | Typescript：`(value: TimePickerValue) => void`<br/> | N
onClose | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onFocus | Function |  | Typescript：`(context: { value: TimePickerValue; e: FocusEvent }) => void`<br/> | N
onInput | Function |  | Typescript：`(context: { value: TimePickerValue; e: InputEvent }) => void`<br/> | N
onOpen | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onPick | Function |  | Typescript：`(value: TimePickerValue, context: { e: MouseEvent }) => void`<br/> | N

### TimePicker Events

name | params | description
-- | -- | --
blur | `(context: { value: TimePickerValue; e: FocusEvent })` | \-
change | `(value: TimePickerValue)` | \-
close | `(context: { e: MouseEvent })` | \-
focus | `(context: { value: TimePickerValue; e: FocusEvent })` | \-
input | `(context: { value: TimePickerValue; e: InputEvent })` | \-
open | `(context: { e: MouseEvent })` | \-
pick | `(value: TimePickerValue, context: { e: MouseEvent })` | \-

### TimeRangePicker Props

name | type | default | description | required
-- | -- | -- | -- | --
allowInput | Boolean | false | \- | N
clearable | Boolean | false | \- | N
disableTime | Function | - | Typescript：`(h: number, m: number, s: number, context: { partial: TimeRangePickerPartial }) =>Partial<{ hour: Array<number>, minute: Array<number>, second: Array<number> }>` `type TimeRangePickerPartial = 'start' \| 'end'`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
disabled | Boolean / Array | - | Typescript：`boolean \| Array<boolean>` | N
format | String | HH:mm:ss | \- | N
hideDisabledTime | Boolean | true | \- | N
placeholder | String / Array | undefined | Typescript：`string \| Array<string>` | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
presets | Object | - | Typescript：`PresetTimeRange` `interface PresetTimeRange { [presetRageName: string]: TimeRangeValue \| (() => TimeRangeValue)}`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
rangeInputProps | Object | - | Typescript：`RangeInputProps`，[RangeInput API Documents](./range-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
size | String | medium | options: small/medium/large | N
status | String | default | options: default/success/warning/error | N
steps | Array | [1, 1, 1] | Typescript：`Array<string \| number>` | N
tips | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
value | Array | - | `v-model` is supported。Typescript：`TimeRangeValue` `type TimeRangeValue = Array<string>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
defaultValue | Array | - | uncontrolled property。Typescript：`TimeRangeValue` `type TimeRangeValue = Array<string>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts) | N
onBlur | Function |  | Typescript：`(context: { value: TimeRangeValue; e?: FocusEvent; position?: TimeRangePickerPartial })  => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/> | N
onChange | Function |  | Typescript：`(value: TimeRangeValue) => void`<br/> | N
onFocus | Function |  | Typescript：`(context?: { value: TimeRangeValue; e?: FocusEvent; position?: TimeRangePickerPartial })  => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/> | N
onInput | Function |  | Typescript：`(context: { value: TimeRangeValue; e?: InputEvent; position?: TimeRangePickerPartial  })  => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/> | N
onPick | Function |  | Typescript：`(value: TimeRangeValue, context: { e: MouseEvent, position?: TimeRangePickerPartial }) => void`<br/> | N

### TimeRangePicker Events

name | params | description
-- | -- | --
blur | `(context: { value: TimeRangeValue; e?: FocusEvent; position?: TimeRangePickerPartial }) ` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/>
change | `(value: TimeRangeValue)` | \-
focus | `(context?: { value: TimeRangeValue; e?: FocusEvent; position?: TimeRangePickerPartial }) ` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/>
input | `(context: { value: TimeRangeValue; e?: InputEvent; position?: TimeRangePickerPartial  }) ` | [see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/time-picker/type.ts)。<br/>`type TimeRangePickerPartial = 'start' \| 'end'`<br/>
pick | `(value: TimeRangeValue, context: { e: MouseEvent, position?: TimeRangePickerPartial })` | \-
