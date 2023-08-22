/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdEnhancedTableProps } from '../table/type';
import { PropType } from 'vue';

export default {
  /** 树形结构中，拖拽排序前控制，返回值为 `true` 则继续排序；返回值为 `false` 则中止排序还原数据 */
  beforeDragSort: {
    type: Function as PropType<TdEnhancedTableProps['beforeDragSort']>,
  },
  /** 展开的树形节点。非必须。在需要自由控制展开的树形节点时使用。其他场景无需设置，表格组件有内置展开逻辑 */
  expandedTreeNodes: {
    type: Array as PropType<TdEnhancedTableProps['expandedTreeNodes']>,
    default: undefined as TdEnhancedTableProps['expandedTreeNodes'],
  },
  /** 展开的树形节点。非必须。在需要自由控制展开的树形节点时使用。其他场景无需设置，表格组件有内置展开逻辑，非受控属性 */
  defaultExpandedTreeNodes: {
    type: Array as PropType<TdEnhancedTableProps['defaultExpandedTreeNodes']>,
    default: (): TdEnhancedTableProps['defaultExpandedTreeNodes'] => [],
  },
  /** 树形结构相关配置。具体属性文档查看 `TableTreeConfig` 相关描述 */
  tree: {
    type: Object as PropType<TdEnhancedTableProps['tree']>,
  },
  /** 自定义树形结构展开图标，支持全局配置 `GlobalConfigProvider` */
  treeExpandAndFoldIcon: {
    type: Function as PropType<TdEnhancedTableProps['treeExpandAndFoldIcon']>,
  },
  /** 异常拖拽排序时触发，如：树形结构中，非同层级之间的交换。`context.code` 指交换异常错误码，固定值；`context.reason` 指交换异常的原因 */
  onAbnormalDragSort: Function as PropType<TdEnhancedTableProps['onAbnormalDragSort']>,
  /** 树形结构，展开的树节点发生变化时触发，泛型 T 指表格数据类型 */
  onExpandedTreeNodesChange: Function as PropType<TdEnhancedTableProps['onExpandedTreeNodesChange']>,
  /** 已废弃。树形结构，用户操作引起节点展开或收起时触发。请更为使用 `onExpandedTreeNodesChange` */
  onTreeExpandChange: Function as PropType<TdEnhancedTableProps['onTreeExpandChange']>,
};
