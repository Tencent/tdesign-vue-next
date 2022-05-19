/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTabsProps } from './type';
import { PropType } from 'vue';

export default {
  /** 选项卡是否可增加 */
  addable: Boolean,
  /** 是否禁用选项卡 */
  disabled: Boolean,
  /** 是否开启拖拽调整顺序 */
  dragSort: Boolean,
  /** 选项卡列表 */
  list: {
    type: Array as PropType<TdTabsProps['list']>,
  },
  /** 选项卡位置 */
  placement: {
    type: String as PropType<TdTabsProps['placement']>,
    default: 'top' as TdTabsProps['placement'],
    validator(val: TdTabsProps['placement']): boolean {
      if (!val) return true;
      return ['left', 'top', 'bottom', 'right'].includes(val);
    },
  },
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdTabsProps['size']>,
    default: 'medium' as TdTabsProps['size'],
    validator(val: TdTabsProps['size']): boolean {
      if (!val) return true;
      return ['medium', 'large'].includes(val);
    },
  },
  /** 选项卡风格，包含 默认风格 和 卡片风格两种 */
  theme: {
    type: String as PropType<TdTabsProps['theme']>,
    default: 'normal' as TdTabsProps['theme'],
    validator(val: TdTabsProps['theme']): boolean {
      if (!val) return true;
      return ['normal', 'card'].includes(val);
    },
  },
  /** 激活的选项卡值 */
  value: {
    type: [String, Number] as PropType<TdTabsProps['value']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Number] as PropType<TdTabsProps['value']>,
    default: undefined,
  },
  /** 激活的选项卡值，非受控属性 */
  defaultValue: {
    type: [String, Number] as PropType<TdTabsProps['defaultValue']>,
  },
  /** 添加选项卡时触发 */
  onAdd: Function as PropType<TdTabsProps['onAdd']>,
  /** 激活的选项卡发生变化时触发 */
  onChange: Function as PropType<TdTabsProps['onChange']>,
  /** 拖拽排序时触发 */
  onDragSort: Function as PropType<TdTabsProps['onDragSort']>,
  /** 删除选项卡时触发 */
  onRemove: Function as PropType<TdTabsProps['onRemove']>,
  /** 选项卡拖拽结束时触发 */
  onDragend: Function,
};
