import { TreeNode } from './treeNode';

export const TreeProps = {
  data: {
    type: Array,
    default(): Array<any> {
      return [];
    },
  },
  empty: {
    type: [Function, Object, String],
    default: '',
  },
  // key 属性是 vue 保留字，所以用 keys 替代
  keys: {
    type: Object,
    default(): object {
      return {};
    },
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
  activable: {
    type: Boolean,
    default: false,
  },
  activeMultiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
  checkStrictly: {
    type: Boolean,
    default: false,
  },
  hover: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: Boolean,
    default: true,
  },
  load: {
    type: Function,
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
