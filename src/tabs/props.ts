/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTabsProps } from './type';
import { PropType } from 'vue';

export default {
  /** 选项卡右侧的操作区域 */
  action: {
    type: [String, Function] as PropType<TdTabsProps['action']>,
  },
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
  /** Tab较多的时候，选中滑块滚动最终停留的位置 */
  scrollPosition: {
    type: String as PropType<TdTabsProps['scrollPosition']>,
    default: 'auto' as TdTabsProps['scrollPosition'],
    validator(val: TdTabsProps['scrollPosition']): boolean {
      if (!val) return true;
      return ['auto', 'start', 'center', 'end'].includes(val);
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
    default: undefined as TdTabsProps['value'],
  },
  modelValue: {
    type: [String, Number] as PropType<TdTabsProps['value']>,
    default: undefined as TdTabsProps['value'],
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
};
