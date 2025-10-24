/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdColorPickerPanelProps } from './type';
import { PropType } from 'vue';

export default {
  /** 颜色模式选择。同时支持单色和渐变两种模式，可仅使用单色或者渐变其中一种模式，也可以同时使用。`monochrome` 表示单色，`linear-gradient` 表示渐变色 */
  colorModes: {
    type: Array as PropType<TdColorPickerPanelProps['colorModes']>,
    default: (): TdColorPickerPanelProps['colorModes'] => ['monochrome', 'linear-gradient'],
  },
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 是否开启透明通道 */
  enableAlpha: Boolean,
  /** 是否允许开启通过点击渐变轴增加渐变梯度，默认开启，关闭时只会存在起始和结束两个颜色 */
  enableMultipleGradient: {
    type: Boolean,
    default: true,
  },
  /** 格式化色值。`enableAlpha` 为真时，`HEX8/RGBA/HSLA/HSVA` 有效 */
  format: {
    type: String as PropType<TdColorPickerPanelProps['format']>,
    default: 'RGB' as TdColorPickerPanelProps['format'],
    validator(val: TdColorPickerPanelProps['format']): boolean {
      if (!val) return true;
      return ['HEX', 'HEX8', 'RGB', 'RGBA', 'HSL', 'HSLA', 'HSV', 'HSVA', 'CMYK', 'CSS'].includes(val);
    },
  },
  /** 最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 false 或 null 则完全不显示“最近使用颜色” */
  recentColors: {
    type: Array as PropType<TdColorPickerPanelProps['recentColors']>,
    default: undefined as TdColorPickerPanelProps['recentColors'],
  },
  /** 最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 false 或 null 则完全不显示“最近使用颜色”，非受控属性 */
  defaultRecentColors: {
    type: Array as PropType<TdColorPickerPanelProps['defaultRecentColors']>,
    default: (): TdColorPickerPanelProps['defaultRecentColors'] => [],
  },
  /** 透传 SelectInput 筛选器输入框组件的全部属性 */
  selectInputProps: {
    type: Object as PropType<TdColorPickerPanelProps['selectInputProps']>,
  },
  /** 是否展示颜色选择条右侧的颜色预览区域 */
  showPrimaryColorPreview: {
    type: Boolean,
    default: true,
  },
  /** 系统预设的颜色样例，值为 `null` 或 `[]` 则不显示系统色，值为 `undefined` 会显示组件内置的系统默认色 */
  swatchColors: {
    type: Array as PropType<TdColorPickerPanelProps['swatchColors']>,
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
  onChange: Function as PropType<TdColorPickerPanelProps['onChange']>,
  /** 调色板控制器的值变化时触发，`context.color` 指调色板控制器的值 */
  onPaletteBarChange: Function as PropType<TdColorPickerPanelProps['onPaletteBarChange']>,
  /** 最近使用颜色发生变化时触发 */
  onRecentColorsChange: Function as PropType<TdColorPickerPanelProps['onRecentColorsChange']>,
};
