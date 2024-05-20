/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdCollapsePanelProps } from '../collapse/type';

export default {
  /** 折叠面板内容 */
  content: {
    type: [String, Function] as PropType<TdCollapsePanelProps['content']>,
  },
  /** 折叠面板内容，同 content */
  default: {
    type: [String, Function] as PropType<TdCollapsePanelProps['default']>,
  },
  /** 当前面板处理折叠状态时，是否销毁面板内容 */
  destroyOnCollapse: Boolean,
  /** 禁止当前面板展开，优先级大于 Collapse 的同名属性 */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 当前折叠面板展开图标，优先级大于 Collapse 的同名属性 */
  expandIcon: {
    type: [Boolean, Function] as PropType<TdCollapsePanelProps['expandIcon']>,
    default: undefined,
  },
  /** 面板头内容 */
  header: {
    type: [String, Function] as PropType<TdCollapsePanelProps['header']>,
  },
  /** 面板头的右侧区域，一般用于呈现面板操作 */
  headerRightContent: {
    type: [String, Function] as PropType<TdCollapsePanelProps['headerRightContent']>,
  },
  /** 当前面板唯一标识，如果值为空则取当前面下标兜底作为唯一标识 */
  value: {
    type: [String, Number] as PropType<TdCollapsePanelProps['value']>,
  },
};
