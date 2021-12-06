/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdTreeProps } from './type';
import { PropType } from 'vue';

export default {
  /** 节点是否可高亮 */
  activable: Boolean,
  /** 高亮的节点值 */
  actived: {
    type: Array as PropType<TdTreeProps['actived']>,
  },
  /** 高亮的节点值，非受控属性 */
  defaultActived: {
    type: Array as PropType<TdTreeProps['defaultActived']>,
  },
  /** 是否允许多个节点同时高亮 */
  activeMultiple: Boolean,
  /** 隐藏节点复选框 */
  checkable: Boolean,
  /** 透传属性到 checkbox 组件。参考 checkbox 组件 API */
  checkProps: {
    type: Object as PropType<TdTreeProps['checkProps']>,
  },
  /** 父子节点选中状态不再关联，可各自选中或取消 */
  checkStrictly: Boolean,
  /** 树数据 */
  data: {
    type: Array as PropType<TdTreeProps['data']>,
    default: (): TdTreeProps['data'] => [],
  },
  /** 禁用复选框，可支持禁用不同的行 */
  disableCheck: {
    type: [Boolean, Function] as PropType<TdTreeProps['disableCheck']>,
    default: false,
  },
  /** 是否禁用树操作 */
  disabled: Boolean,
  /** 数据为空时展示的文本 */
  empty: {
    type: [String, Function] as PropType<TdTreeProps['empty']>,
    default: '',
  },
  /** 是否展开全部节点 */
  expandAll: Boolean,
  /** 展开的节点值 */
  expanded: {
    type: Array as PropType<TdTreeProps['expanded']>,
    default: (): TdTreeProps['expanded'] => [],
  },
  /** 展开的节点值，非受控属性 */
  defaultExpanded: {
    type: Array as PropType<TdTreeProps['defaultExpanded']>,
    default: (): TdTreeProps['defaultExpanded'] => [],
  },
  /** 默认展开的级别，第一层为 0 */
  expandLevel: {
    type: Number,
    default: 0,
  },
  /** 同级别展开互斥，手风琴效果 */
  expandMutex: Boolean,
  /** 是否支持点击节点也能展开收起 */
  expandOnClickNode: Boolean,
  /** 展开子节点时是否自动展开父节点 */
  expandParent: Boolean,
  /** 节点过滤方法，只呈现返回值为 true 的节点 */
  filter: {
    type: Function as PropType<TdTreeProps['filter']>,
  },
  /** 节点是否有悬浮状态 */
  hover: Boolean,
  /** 节点图标，可自定义 */
  icon: {
    type: [Boolean, Function] as PropType<TdTreeProps['icon']>,
    default: true,
  },
  /** 用来定义 value / label / children 在 `options` 中对应的字段别名 */
  keys: {
    type: Object as PropType<TdTreeProps['keys']>,
  },
  /** 自定义节点内容，值为 false 不显示，值为 true 显示默认 label，值为字符串直接输出该字符串 */
  label: {
    type: [String, Boolean, Function] as PropType<TdTreeProps['label']>,
    default: true,
  },
  /** 延迟加载 children 为 true 的节点的子节点数据，即使 expandAll 被设置为 true，也同样延迟加载 */
  lazy: {
    type: Boolean,
    default: true,
  },
  /** 连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线 */
  line: {
    type: [Boolean, Function] as PropType<TdTreeProps['line']>,
    default: false,
  },
  /** 加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效） */
  load: {
    type: Function as PropType<TdTreeProps['load']>,
  },
  /** 自定义节点操作项 */
  operations: {
    type: Function as PropType<TdTreeProps['operations']>,
  },
  /** 节点展开折叠时是否使用过渡动画 */
  transition: {
    type: Boolean,
    default: true,
  },
  /** 选中值（组件为可选状态时） */
  value: {
    type: Array as PropType<TdTreeProps['value']>,
    default: (): TdTreeProps['value'] => [],
  },
  /** 选中值（组件为可选状态时），非受控属性 */
  defaultValue: {
    type: Array as PropType<TdTreeProps['defaultValue']>,
    default: (): TdTreeProps['defaultValue'] => [],
  },
  /** 选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaft 表示无论什么情况，选中值仅呈现叶子节点 */
  valueMode: {
    type: String as PropType<TdTreeProps['valueMode']>,
    default: 'onlyLeaf' as TdTreeProps['valueMode'],
    validator(val: TdTreeProps['valueMode']): boolean {
      return ['onlyLeaf', 'parentFirst', 'all'].includes(val);
    },
  },
  /** 节点激活时触发 */
  onActive: Function as PropType<TdTreeProps['onActive']>,
  /** 节点选中状态变化时触发，context.node 表示当前变化的选项 */
  onChange: Function as PropType<TdTreeProps['onChange']>,
  /** 节点点击时触发 */
  onClick: Function as PropType<TdTreeProps['onClick']>,
  /** 节点展开或收起时触发 */
  onExpand: Function as PropType<TdTreeProps['onExpand']>,
  /** 异步加载后触发 */
  onLoad: Function as PropType<TdTreeProps['onLoad']>,
};
