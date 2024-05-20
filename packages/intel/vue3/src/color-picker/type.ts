/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { SizeEnum, TNode } from '@td/shared/interface';
import type { InputProps } from '../input';
import type { PopupProps } from '../popup';
import type { SelectInputProps } from '../select-input';

export interface TdColorPickerProps {
  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 关闭按钮，值为 `true` 显示默认关闭按钮；值为 `false` 或 `undefined` 则不显示关闭按钮；值类型为函数，则表示自定义关闭按钮
   * @default true
   */
  closeBtn?: string | boolean | TNode;
  /**
   * 颜色模式选择。同时支持单色和渐变两种模式，可仅使用单色或者渐变其中一种模式，也可以同时使用。`monochrome` 表示单色，`linear-gradient` 表示渐变色
   * @default ()=> ['monochrome', 'linear-gradient']
   */
  colorModes?: Array<'monochrome' | 'linear-gradient'>;
  /**
   * 是否禁用组件
   */
  disabled?: boolean;
  /**
   * 是否开启透明通道
   * @default false
   */
  enableAlpha?: boolean;
  /**
   * 是否允许开启通过点击渐变轴增加渐变梯度，默认开启，关闭时只会存在起始和结束两个颜色
   * @default true
   */
  enableMultipleGradient?: boolean;
  /**
   * 格式化色值。`enableAlpha` 为真时，`RGBA/HSLA/HSVA` 等值有效
   * @default RGB
   */
  format?: 'RGB' | 'RGBA' | 'HSL' | 'HSLA' | 'HSB' | 'HSV' | 'HSVA' | 'HEX' | 'CMYK' | 'CSS';
  /**
   * 透传 Input 输入框组件全部属性
   */
  inputProps?: InputProps;
  /**
   * 【开发中】是否允许选中多个颜色
   * @default false
   */
  multiple?: boolean;
  /**
   * 透传 Popup 组件全部属性，如 `placement` `overlayStyle` `overlayClassName` `trigger`等
   */
  popupProps?: PopupProps;
  /**
   * 最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 null 则完全不显示“最近使用颜色”
   * @default []
   */
  recentColors?: boolean | Array<string> | null;
  /**
   * 最近使用的颜色。值为 [] 表示以组件内部的“最近使用颜色”为准，值长度大于 0 则以该值为准显示“最近使用颜色”。值为 null 则完全不显示“最近使用颜色”，非受控属性
   * @default []
   */
  defaultRecentColors?: boolean | Array<string> | null;
  /**
   * 透传 SelectInputProps 筛选器输入框组件全部属性
   */
  selectInputProps?: SelectInputProps;
  /**
   * 是否展示颜色选择条右侧的颜色预览区域
   * @default true
   */
  showPrimaryColorPreview?: boolean;
  /**
   * 组件尺寸
   * @default medium
   */
  size?: SizeEnum;
  /**
   * 系统预设的颜色样例，值为 `null` 或 `[]` 则不显示系统色，值为 `undefined` 会显示组件内置的系统默认色
   */
  swatchColors?: Array<string> | null;
  /**
   * 色值
   * @default ''
   */
  value?: string;
  /**
   * 色值，非受控属性
   * @default ''
   */
  defaultValue?: string;
  /**
   * 色值
   * @default ''
   */
  modelValue?: string;
  /**
   * 选中的色值发生变化时触发，第一个参数 `value` 表示新色值，`context.color` 表示当前调色板控制器的色值，`context.trigger` 表示触发颜色变化的来源
   */
  onChange?: (value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => void;
  /**
   * 调色板控制器的值变化时触发，`context.color` 指调色板控制器的值
   */
  onPaletteBarChange?: (context: { color: ColorObject }) => void;
  /**
   * 最近使用颜色发生变化时触发
   */
  onRecentColorsChange?: (value: Array<string>) => void;
}

export type ColorPickerChangeTrigger =
  | 'palette-saturation-brightness'
  | 'palette-saturation'
  | 'palette-brightness'
  | 'palette-hue-bar'
  | 'palette-alpha-bar'
  | 'input'
  | 'preset'
  | 'recent';

export interface ColorObject {
  alpha: number;
  css: string;
  hex: string;
  hex8: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
  rgb: string;
  rgba: string;
  saturation: number;
  value: number;
  isGradient: boolean;
  linearGradient?: string;
}
