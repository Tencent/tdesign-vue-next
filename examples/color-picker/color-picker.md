:: BASE_DOC ::

## API
### ColorPicker Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
disabled | Boolean | false | 是否禁用组件 | N
enableAlpha | Boolean | false | 是否开启透明通道 | N
format | String | RGB | 格式化色值。`enableAlpha` 为真时，`RGBA/HSLA/HSVA/HEX8` 等值有效。可选项：RGB/RGBA/HSL/HSLA/HSB/HSV/HSVA/HEX/HEX8/CMYK/CSS | N
multiple | Boolean | false | 是否允许选中多个颜色 | N
popupProps | Object | - | 透传 Popup 组件全部属性，如 `placement` `overlayStyle` `overlayClassName` 等。TS 类型：`PopupProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/color-picker/type.ts) | N
swatchColors | Array | - | 颜色样例。TS 类型：`Array<string>` | N
value | String | - | 色值。支持语法糖 | N
defaultValue | String | - | 色值。非受控属性 | N
onChange | Function |  | TS 类型：`(value: string, context: { colors: string[]; trigger: ColorPickerChangeTrigger }) => void`<br/>选中的色值发生变化时触发，第一个参数 `value` 表示新色值，`context.colors` 表示当前调色板的所有色值，`context.trigger` 表示触发颜色变化的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette' | 'input'`<br/> | N
onPaletteChange | Function |  | TS 类型：`(context: { colors: string[] }) => void`<br/>调色板变化时触发，当前色板的色值 | N

### ColorPicker Events

名称 | 参数 | 描述
-- | -- | --
change | `(value: string, context: { colors: string[]; trigger: ColorPickerChangeTrigger })` | 选中的色值发生变化时触发，第一个参数 `value` 表示新色值，`context.colors` 表示当前调色板的所有色值，`context.trigger` 表示触发颜色变化的来源。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/color-picker/type.ts)。<br/>`type ColorPickerChangeTrigger = 'palette' | 'input'`<br/>
palette-change | `(context: { colors: string[] })` | 调色板变化时触发，当前色板的色值
