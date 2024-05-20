/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-11-19 10:44:26
 */

import type { PropType } from 'vue';
import type { TdTabPanelProps } from '../tabs/type';

export default {
  /** 用于自定义选项卡导航，同 panel */
  default: {
    type: Function as PropType<TdTabPanelProps['default']>,
  },
  /** 选项卡内容隐藏时是否销毁 */
  destroyOnHide: {
    type: Boolean,
    default: true,
  },
  /** 是否禁用当前选项卡 */
  disabled: Boolean,
  /** 选项卡名称，可自定义选项卡导航内容 */
  label: {
    type: [String, Function] as PropType<TdTabPanelProps['label']>,
  },
  /** 用于自定义选项卡面板内容 */
  panel: {
    type: [String, Function] as PropType<TdTabPanelProps['panel']>,
  },
  /** 当前选项卡是否允许移除 */
  removable: Boolean,
  /** 选项卡的值，唯一标识 */
  value: {
    type: [String, Number] as PropType<TdTabPanelProps['value']>,
  },
  /** 点击删除按钮时触发 */
  onRemove: Function as PropType<TdTabPanelProps['onRemove']>,
  /** 标签内容是否延迟渲染 */
  lazy: {
    type: Boolean,
    default: false,
  },
};
