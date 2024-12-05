/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdRangeInputPopupProps } from '../range-input/type';
import { PropType } from 'vue';

export default {
  /** 宽度随内容自适应 */
  autoWidth: Boolean,
  /** 是否禁用范围输入框，值为数组表示可分别控制某一个输入框是否禁用 */
  disabled: Boolean,
  /** 输入框的值 */
  inputValue: {
    type: Array as PropType<TdRangeInputPopupProps['inputValue']>,
    default: undefined as TdRangeInputPopupProps['inputValue'],
  },
  /** 输入框的值，非受控属性 */
  defaultInputValue: {
    type: Array as PropType<TdRangeInputPopupProps['defaultInputValue']>,
  },
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdRangeInputPopupProps['label']>,
  },
  /** 下拉框内容，可完全自定义 */
  panel: {
    type: [String, Function] as PropType<TdRangeInputPopupProps['panel']>,
  },
  /** 透传 Popup 浮层组件全部属性 */
  popupProps: {
    type: Object as PropType<TdRangeInputPopupProps['popupProps']>,
  },
  /** 是否显示下拉框 */
  popupVisible: Boolean,
  /** 透传 RangeInput 组件全部属性 */
  rangeInputProps: {
    type: Object as PropType<TdRangeInputPopupProps['rangeInputProps']>,
  },
  /** 只读状态，值为真会隐藏输入框，且无法打开下拉框 */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdRangeInputPopupProps['status']>,
    default: 'default' as TdRangeInputPopupProps['status'],
    validator(val: TdRangeInputPopupProps['status']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdRangeInputPopupProps['tips']>,
  },
  /** 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发等 */
  onInputChange: Function as PropType<TdRangeInputPopupProps['onInputChange']>,
  /** 下拉框显示或隐藏时触发 */
  onPopupVisibleChange: Function as PropType<TdRangeInputPopupProps['onPopupVisibleChange']>,
};
