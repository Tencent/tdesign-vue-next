import { TreeNode } from './treeNode';

export const TreeProps = {
  data: {
    type: Array,
    default(): Array<any> {
      return [];
    },
  },
  // key 属性是 vue 保留字，所以用 keys 替代
  keys: {
    type: Object,
    default(): object {
      return {};
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hover: {
    type: Boolean,
    default: false,
  },
  empty: {
    type: [Function, Object, String],
    default: '',
  },
  expandAll: {
    type: Boolean,
    default: false,
  },
  expandLevel: {
    type: Number,
    default: 0,
  },
  expandMutex: {
    type: Boolean,
    default: false,
  },
  expandOnClickNode: {
    type: Boolean,
    default: true,
  },
  transition: {
    type: Boolean,
    default: true,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  activable: {
    type: Boolean,
    default: false,
  },
  activeMultiple: {
    type: Boolean,
    default: false,
  },
};

export const TreeNodeProps = {
  node: {
    type: Object,
    default(): object {
      return {};
    },
  },
  empty: {
    type: [Function, Object, String],
    default: '',
  },
};

export interface EventState {
  name: string;
  event?: Event;
  node?: TreeNode;
  nodes?: Array<TreeNode>;
  index?: number;
};
