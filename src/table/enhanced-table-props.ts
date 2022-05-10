/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdEnhancedTableProps } from '../table/type';
import { PropType } from 'vue';

export default {
  /** 树形结构相关配置。`tree.indent` 表示树结点缩进距离，单位：px，默认为 24px。`tree.treeNodeColumnIndex` 表示树结点在第几列渲染，默认为 0 ，第一列。`tree.childrenKey` 表示树形结构子节点字段，默认为 children。`tree.checkStrictly` 表示树形结构的行选中（多选），父子行选中是否独立，默认独立，值为 true */
  tree: {
    type: Object as PropType<TdEnhancedTableProps['tree']>,
  },
  /** 自定义树形结构展开图标，支持全局配置 `GlobalConfigProvider` */
  treeExpandAndFoldIcon: {
    type: Function as PropType<TdEnhancedTableProps['treeExpandAndFoldIcon']>,
  },
  /** 树形结构，用户操作引起节点展开或收起时触发，代码操作不会触发 */
  onTreeExpandChange: Function as PropType<TdEnhancedTableProps['onTreeExpandChange']>,
};
