/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdTreeProps } from './type';

export default {
  /** 节点是否可高亮 */
  activable: Boolean,
  /** 是否允许多个节点同时高亮 */
  activeMultiple: Boolean,
  /** 高亮的节点值 */
  actived: {
    type: Array as PropType<TdTreeProps['actived']>,
    default: undefined as TdTreeProps['actived'],
  },
  /** 高亮的节点值，非受控属性 */
  defaultActived: {
    type: Array as PropType<TdTreeProps['defaultActived']>,
  },
  /** 是否允许在过滤时节点折叠节点 */
  allowFoldNodeOnFilter: Boolean,
  /** 透传属性到 checkbox 组件。参考 checkbox 组件 API */
  checkProps: {
    type: Object as PropType<TdTreeProps['checkProps']>,
  },
  /** 父子节点选中状态不再关联，可各自选中或取消 */
  checkStrictly: Boolean,
  /** 隐藏节点复选框 */
  checkable: Boolean,
  /** 树数据，泛型 `T` 表示树节点 TS 类型 */
  data: {
    type: Array as PropType<TdTreeProps['data']>,
    default: (): TdTreeProps['data'] => [],
  },
  /** 禁用复选框，可支持禁用不同的行 */
  disableCheck: {
    type: [Boolean, Function] as PropType<TdTreeProps['disableCheck']>,
    default: false as TdTreeProps['disableCheck'],
  },
  /** 是否禁用树操作 */
  disabled: Boolean,
  /** 节点是否可拖拽 */
  draggable: Boolean,
  /** 数据为空时展示的文本 */
  empty: {
    type: [String, Function] as PropType<TdTreeProps['empty']>,
    default: '' as TdTreeProps['empty'],
  },
  /** 是否展开全部节点 */
  expandAll: Boolean,
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
  /** 展开的节点值 */
  expanded: {
    type: Array as PropType<TdTreeProps['expanded']>,
    default: undefined as TdTreeProps['expanded'],
  },
  /** 展开的节点值，非受控属性 */
  defaultExpanded: {
    type: Array as PropType<TdTreeProps['defaultExpanded']>,
    default: (): TdTreeProps['defaultExpanded'] => [],
  },
  /** 节点过滤方法，只呈现返回值为 true 的节点，泛型 `T` 表示树节点 TS 类型 */
  filter: {
    type: Function as PropType<TdTreeProps['filter']>,
  },
  /** 树的高度，超出后会出现滚动条。示例：100,  '30%',  '300'。值为数字类型，会自动加上单位 px。如果不是绝对固定树的高度，建议使用 `maxHeight` */
  height: {
    type: [String, Number] as PropType<TdTreeProps['height']>,
  },
  /** 节点是否有悬浮状态 */
  hover: Boolean,
  /** 节点图标，可自定义 */
  icon: {
    type: [Boolean, Function] as PropType<TdTreeProps['icon']>,
    default: true as TdTreeProps['icon'],
  },
  /** 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label 'name', children: 'list' }`。其中，disabled 待开发。 */
  keys: {
    type: Object as PropType<TdTreeProps['keys']>,
  },
  /** 自定义节点内容，值为 `false` 不显示，值为 `true` 显示默认 label，值为字符串直接输出该字符串。泛型 `T` 表示树节点 TS 类型。<br/>如果期望只有点击复选框才选中，而点击节点不选中，可以使用 `label` 自定义节点，然后加上点击事件 `e.preventDefault()`，通过调整自定义节点的宽度和高度决定禁止点击选中的范围 */
  label: {
    type: [String, Boolean, Function] as PropType<TdTreeProps['label']>,
    default: true as TdTreeProps['label'],
  },
  /** 延迟加载 children 为 true 的节点的子节点数据，即使 expandAll 被设置为 true，也同样延迟加载 */
  lazy: {
    type: Boolean,
    default: true,
  },
  /** 连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线 */
  line: {
    type: [Boolean, Function] as PropType<TdTreeProps['line']>,
    default: false as TdTreeProps['line'],
  },
  /** 加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效），泛型 `T` 表示树节点 TS 类型 */
  load: {
    type: Function as PropType<TdTreeProps['load']>,
  },
  /** 树的最大高度，超出后会出现滚动条。示例：100, '30%', '300'。值为数字类型，会自动加上单位 px */
  maxHeight: {
    type: [String, Number] as PropType<TdTreeProps['maxHeight']>,
  },
  /** 自定义节点操作项，泛型 `T` 表示树节点 TS 类型 */
  operations: {
    type: Function as PropType<TdTreeProps['operations']>,
  },
  /** 懒加载和虚拟滚动。为保证组件收益最大化，当数据量小于阈值 `scroll.threshold` 时，无论虚拟滚动的配置是否存在，组件内部都不会开启虚拟滚动，`scroll.threshold` 默认为 `100` */
  scroll: {
    type: Object as PropType<TdTreeProps['scroll']>,
  },
  /** 节点展开折叠时是否使用过渡动画 */
  transition: {
    type: Boolean,
    default: true,
  },
  /** 选中值，组件为可选状态时有效 */
  value: {
    type: Array as PropType<TdTreeProps['value']>,
    default: undefined as TdTreeProps['value'],
  },
  modelValue: {
    type: Array as PropType<TdTreeProps['value']>,
    default: undefined as TdTreeProps['value'],
  },
  /** 选中值，组件为可选状态时有效，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdTreeProps['defaultValue']>,
    default: (): TdTreeProps['defaultValue'] => [],
  },
  /** 选中值模式。all 表示父节点和子节点全部会出现在选中值里面；parentFirst 表示当子节点全部选中时，仅父节点在选中值里面；onlyLeaft 表示无论什么情况，选中值仅呈现叶子节点 */
  valueMode: {
    type: String as PropType<TdTreeProps['valueMode']>,
    default: 'onlyLeaf' as TdTreeProps['valueMode'],
    validator(val: TdTreeProps['valueMode']): boolean {
      if (!val) {
        return true;
      }
      return ['onlyLeaf', 'parentFirst', 'all'].includes(val);
    },
  },
  /** 节点激活时触发，泛型 `T` 表示树节点 TS 类型 */
  onActive: Function as PropType<TdTreeProps['onActive']>,
  /** 节点选中状态变化时触发，context.node 表示当前变化的选项，泛型 `T` 表示树节点 TS 类型 */
  onChange: Function as PropType<TdTreeProps['onChange']>,
  /** 节点点击时触发，泛型 `T` 表示树节点 TS 类型 */
  onClick: Function as PropType<TdTreeProps['onClick']>,
  /** 节点结束拖拽时触发，泛型 `T` 表示树节点 TS 类型 */
  onDragEnd: Function as PropType<TdTreeProps['onDragEnd']>,
  /** 节点拖拽时离开目标元素时触发，泛型 `T` 表示树节点 TS 类型 */
  onDragLeave: Function as PropType<TdTreeProps['onDragLeave']>,
  /** 节点拖拽到目标元素时触发，泛型 `T` 表示树节点 TS 类型 */
  onDragOver: Function as PropType<TdTreeProps['onDragOver']>,
  /** 节点开始拖拽时触发，泛型 `T` 表示树节点 TS 类型 */
  onDragStart: Function as PropType<TdTreeProps['onDragStart']>,
  /** 节点在目标元素上释放时触发，泛型 `T` 表示树节点 TS 类型 */
  onDrop: Function as PropType<TdTreeProps['onDrop']>,
  /** 节点展开或收起时触发，泛型 `T` 表示树节点 TS 类型 */
  onExpand: Function as PropType<TdTreeProps['onExpand']>,
  /** 异步加载后触发，泛型 `T` 表示树节点 TS 类型 */
  onLoad: Function as PropType<TdTreeProps['onLoad']>,
  /** 滚动事件 */
  onScroll: Function as PropType<TdTreeProps['onScroll']>,
};
