:: BASE_DOC ::

## API
### ColorPicker Props

name | type | default | description | required
-- | -- | -- | -- | --
borderless | Boolean | false | \- | N
clearable | Boolean | false | \- | N
closeBtn | String / Boolean / Slot / Function | true | Typescript：`string \| boolean \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
colorModes | Array | ["monochrome", "linear-gradient"] | Typescript：`Array<'monochrome' \| 'linear-gradient'>` | N
disabled | Boolean | - | \- | N
enableAlpha | Boolean | false | \- | N
enableMultipleGradient | Boolean | true | \- | N
format | String | RGB | options: RGB/RGBA/HSL/HSLA/HSB/HSV/HSVA/HEX/CMYK/CSS | N
inputProps | Object | - | Typescript：`InputProps`，[Input API Documents](./input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/color-picker/type.ts) | N
multiple | Boolean | false | \- | N
popupProps | Object | - | Typescript：`PopupProps`，[Popup API Documents](./popup?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/color-picker/type.ts) | N
recentColors | Array | [] | used color recently。`v-model:recentColors` is supported。Typescript：`boolean \| Array<string> \| null` | N
defaultRecentColors | Array | [] | used color recently。uncontrolled property。Typescript：`boolean \| Array<string> \| null` | N
selectInputProps | Object | - | Typescript：`SelectInputProps`，[SelectInput API Documents](./select-input?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/color-picker/type.ts) | N
showPrimaryColorPreview | Boolean | true | \- | N
size | String | medium | options: small/medium/large。Typescript：`SizeEnum`。[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/common.ts) | N
swatchColors | Array | - | swatch colors。Typescript：`Array<string> \| null` | N
value | String | - | color value。`v-model` and `v-model:value` is supported | N
defaultValue | String | - | color value。uncontrolled property | N
onChange | Function |  | Typescript：`(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette-saturation-brightness' \| 'palette-saturation' \| 'palette-brightness' \| 'palette-hue-bar' \| 'palette-alpha-bar' \| 'input' \| 'preset' \| 'recent' `<br/> | N
onClear | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
onPaletteBarChange | Function |  | Typescript：`(context: { color: ColorObject }) => void`<br/>[see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/color-picker/type.ts)。<br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; saturation: number; value: number; isGradient: boolean; linearGradient?: string; }`<br/> | N
onRecentColorsChange | Function |  | Typescript：`(value: Array<string>) => void`<br/> | N

### ColorPicker Events

name | params | description
-- | -- | --
change | `(value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger })` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette-saturation-brightness' \| 'palette-saturation' \| 'palette-brightness' \| 'palette-hue-bar' \| 'palette-alpha-bar' \| 'input' \| 'preset' \| 'recent' `<br/>
clear | `(context: { e: MouseEvent })` | \-
palette-bar-change | `(context: { color: ColorObject })` | [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/color-picker/type.ts)。<br/>`interface ColorObject { alpha: number; css: string; hex: string; hex8: string; hsl: string; hsla: string; hsv: string; hsva: string; rgb: string; rgba: string; saturation: number; value: number; isGradient: boolean; linearGradient?: string; }`<br/>
recent-colors-change | `(value: Array<string>)` | \-
