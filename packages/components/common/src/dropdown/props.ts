/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdDropdownProps } from './type';
import { PropType } from 'vue';

export default {
  /** 多层级操作时，子层级展开方向 */
  direction: {
    type: String as PropType<TdDropdownProps['direction']>,
    default: 'right' as TdDropdownProps['direction'],
    validator(val: TdDropdownProps['direction']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 点击选项后是否自动隐藏弹窗 */
  hideAfterItemClick: {
    type: Boolean,
    default: true,
  },
  /** 选项最大宽度，内容超出时，显示为省略号。值为字符串时，值就是最大宽度；值为数字时，单位：px */
  maxColumnWidth: {
    type: [String, Number] as PropType<TdDropdownProps['maxColumnWidth']>,
    default: 100 as TdDropdownProps['maxColumnWidth'],
  },
  /** 弹窗最大高度，单位：px 。统一控制每一列的高度 */
  maxHeight: {
    type: Number,
    default: 300,
  },
  /** 选项最小宽度。值为字符串时，值就是最小宽度；值为数字时，单位：px */
  minColumnWidth: {
    type: [String, Number] as PropType<TdDropdownProps['minColumnWidth']>,
    default: 10 as TdDropdownProps['minColumnWidth'],
  },
  /** 下拉操作项 */
  options: {
    type: Array as PropType<TdDropdownProps['options']>,
    default: (): TdDropdownProps['options'] => [],
  },
  /** 面板内的底部内容 */
  panelBottomContent: {
    type: [String, Function] as PropType<TdDropdownProps['panelBottomContent']>,
  },
  /** 面板内的顶部内容 */
  panelTopContent: {
    type: [String, Function] as PropType<TdDropdownProps['panelTopContent']>,
  },
  /** 弹窗定位方式，可选值同 Popup 组件 */
  placement: {
    type: String as PropType<TdDropdownProps['placement']>,
    default: 'bottom-left' as TdDropdownProps['placement'],
    validator(val: TdDropdownProps['placement']): boolean {
      if (!val) return true;
      return [
        'top',
        'left',
        'right',
        'bottom',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'left-top',
        'left-bottom',
        'right-top',
        'right-bottom',
      ].includes(val);
    },
  },
  /** 透传  Popup 组件属性，方便更加自由地控制。比如使用 popupProps.overlayStyle 设置浮层样式 */
  popupProps: {
    type: Object as PropType<TdDropdownProps['popupProps']>,
  },
  /** 触发下拉显示的方式 */
  trigger: {
    type: String as PropType<TdDropdownProps['trigger']>,
    default: 'hover' as TdDropdownProps['trigger'],
    validator(val: TdDropdownProps['trigger']): boolean {
      if (!val) return true;
      return ['hover', 'click', 'focus', 'context-menu'].includes(val);
    },
  },
  /** 下拉操作项点击时触发 */
  onClick: Function as PropType<TdDropdownProps['onClick']>,
};
