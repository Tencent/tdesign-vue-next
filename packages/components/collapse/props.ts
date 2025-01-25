/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCollapseProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否为无边框模式 */
  borderless: Boolean,
  /** 默认是否展开全部 */
  defaultExpandAll: Boolean,
  /** 是否禁用面板展开/收起操作 */
  disabled: Boolean,
  /** 展开图标。值为 undefined 或 false 则不显示展开图标；值为 true 显示默认图标；值类型为函数，则表示完全自定义展开图标 */
  expandIcon: {
    type: [Boolean, Function] as PropType<TdCollapseProps['expandIcon']>,
    default: true,
  },
  /** 展开图标的位置，左侧或右侧 */
  expandIconPlacement: {
    type: String as PropType<TdCollapseProps['expandIconPlacement']>,
    default: 'left' as TdCollapseProps['expandIconPlacement'],
    validator(val: TdCollapseProps['expandIconPlacement']): boolean {
      if (!val) return true;
      return ['left', 'right'].includes(val);
    },
  },
  /** 每个面板互斥展开，每次只展开一个面板 */
  expandMutex: Boolean,
  /** 是否允许点击整行标题展开面板 */
  expandOnRowClick: {
    type: Boolean,
    default: true,
  },
  /** 展开的面板集合 */
  value: {
    type: Array as PropType<TdCollapseProps['value']>,
    default: undefined as TdCollapseProps['value'],
  },
  modelValue: {
    type: Array as PropType<TdCollapseProps['value']>,
    default: undefined as TdCollapseProps['value'],
  },
  /** 展开的面板集合，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdCollapseProps['defaultValue']>,
  },
  /** 切换面板时触发，返回变化的值 */
  onChange: Function as PropType<TdCollapseProps['onChange']>,
};
