/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { InputNumberProps } from '../input-number';
import type { TooltipProps } from '../tooltip';
import type { TNode } from '../common';

export interface TdSliderProps {
  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;
  /**
   * 用于控制数字输入框组件，值为 false 表示不显示数字输入框；值为 true 表示呈现默认数字输入框；值类型为 Object 表示透传属性到数字输入框组件
   * @default false
   */
  inputNumberProps?: boolean | InputNumberProps;
  /**
   * 滑块当前值文本。<br />值为 true 显示默认文案；值为 false 不显示滑块当前值文本；<br />值为 `${value}%` 则表示组件会根据占位符渲染文案；<br />值类型为函数时，参数 `value` 标识滑块值，参数 `position=start` 表示范围滑块的起始值，参数 `position=end` 表示范围滑块的终点值
   * @default true
   */
  label?: string | boolean | TNode<{ value: SliderValue; position?: 'start' | 'end' }>;
  /**
   * 滑块布局方向
   * @default horizontal
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * 刻度标记，示例：[0, 10, 40, 200] 或者 `{ 10: (val) => val + '%', 50: (h) => <button>50</button> }`
   */
  marks?: Array<number> | SliderMarks;
  /**
   * 滑块范围最大值
   * @default 100
   */
  max?: number;
  /**
   * 滑块范围最小值
   * @default 0
   */
  min?: number;
  /**
   * 双游标滑块
   * @default false
   */
  range?: boolean;
  /**
   * 控制步长刻度值显示
   * @default false
   */
  showStep?: boolean;
  /**
   * 步长
   * @default 1
   */
  step?: number;
  /**
   * 透传提示组件属性
   */
  tooltipProps?: TooltipProps;
  /**
   * 滑块值
   * @default 0
   */
  value?: SliderValue;
  /**
   * 滑块值，非受控属性
   * @default 0
   */
  defaultValue?: SliderValue;
  /**
   * 滑块值
   * @default 0
   */
  modelValue?: SliderValue;
  /**
   * 滑块值变化时触发
   */
  onChange?: (value: SliderValue) => void;
  /**
   * 松开拖动`mouseup` 或点击滑块条时触发，适合不希望在拖动滑块过程频繁触发回调的场景实用
   */
  onChangeEnd?: (value: SliderValue) => void;
}

export interface SliderMarks {
  [mark: number]: string | TNode<{ value: number }>;
}

export type SliderValue = number | Array<number>;
