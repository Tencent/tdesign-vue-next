/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdColorPickerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 无边框模式 */
  borderless: Boolean,
  /** 是否可清空 */
  clearable: Boolean,
  /** 颜色模式选择。同时支持单色和渐变两种模式，可仅使用单色或者渐变其中一种模式，也可以同时使用。`monochrome` 表示单色，`linear-gradient` 表示渐变色 */
  colorModes: {
    type: Array as PropType<TdColorPickerProps['colorModes']>,
    default: (): TdColorPickerProps['colorModes'] => ['monochrome', 'linear-gradient'],
  },
  /** 是否禁用组件 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 是否开启透明通道 */
  enableAlpha: Boolean,
  /** 是否允许开启通过点击渐变轴增加渐变梯度，默认开启，关闭时只会存在起始和结束两个颜色 */
  enableMultipleGradient: {
    type: Boolean,
    default: true,
  },
  /** 格式化色值。`enableAlpha` 为真时，`HEX8/RGBA/HSLA/HSVA` 有效 */
  format: {
    type: String as PropType<TdColorPickerProps['format']>,
    default: 'RGB' as TdColorPickerProps['format'],
    validator(val: TdColorPickerProps['format']): boolean {
      if (!val) return true;
      return ['HEX', 'HEX8', 'RGB', 'RGBA', 'HSL', 'HSLA', 'HSV', 'HSVA', 'CMYK', 'CSS'].includes(val);
    },
  },
  /** 透传 Input 输入框组件全部属性 */
  inputProps: {
    type: Object as PropType<TdColorPickerProps['inputProps']>,
  },
  /** 透传 Popup 组件全部属性，如 `placement` `overlayStyle` `overlayClassName` `trigger`等 */
  popupProps: {
    type: Object as PropType<TdColorPickerProps['popupProps']>,
  },
  /** 最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 false 或 null 则完全不显示“最近使用颜色” */
  recentColors: {
    type: Array as PropType<TdColorPickerProps['recentColors']>,
    default: undefined as TdColorPickerProps['recentColors'],
  },
  /** 最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 false 或 null 则完全不显示“最近使用颜色”，非受控属性 */
  defaultRecentColors: {
    type: Array as PropType<TdColorPickerProps['defaultRecentColors']>,
    default: (): TdColorPickerProps['defaultRecentColors'] => [],
  },
  /** 透传 SelectInputProps 筛选器输入框组件全部属性 */
  selectInputProps: {
    type: Object as PropType<TdColorPickerProps['selectInputProps']>,
  },
  /** 是否展示颜色选择条右侧的颜色预览区域 */
  showPrimaryColorPreview: {
    type: Boolean,
    default: true,
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdColorPickerProps['size']>,
    default: 'medium' as TdColorPickerProps['size'],
    validator(val: TdColorPickerProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 系统预设的颜色样例，值为 `null` 或 `[]` 则不显示系统色，值为 `undefined` 会显示组件内置的系统默认色 */
  swatchColors: {
    type: Array as PropType<TdColorPickerProps['swatchColors']>,
    default: undefined as TdColorPickerProps['swatchColors'],
  },
  /** 色值 */
  value: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: String,
    default: undefined,
  },
  /** 色值，非受控属性 */
  defaultValue: {
    type: String,
    default: '',
  },
  /** 选中的色值发生变化时触发，第一个参数 `value` 表示新色值，`context.color` 表示当前调色板控制器的色值，`context.trigger` 表示触发颜色变化的来源 */
  onChange: Function as PropType<TdColorPickerProps['onChange']>,
  /** 清空按钮点击时触发 */
  onClear: Function as PropType<TdColorPickerProps['onClear']>,
  /** 调色板控制器的值变化时触发，`context.color` 指调色板控制器的值 */
  onPaletteBarChange: Function as PropType<TdColorPickerProps['onPaletteBarChange']>,
  /** 最近使用颜色发生变化时触发 */
  onRecentColorsChange: Function as PropType<TdColorPickerProps['onRecentColorsChange']>,
};
