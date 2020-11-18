import TreeNode from './TreeNode';

export const TreeProps = {
  data: {
    type: Array,
    default(): any[] {
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
  expanded: {
    type: Array,
    default(): string[] {
      return [];
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
  expandParent: {
    type: [String, Boolean],
    default: 'auto',
  },
  defaultExpanded: {
    type: Array,
    default(): string[] {
      return [];
    },
  },
  activable: {
    type: Boolean,
    default: false,
  },
  activeMultiple: {
    type: Boolean,
    default: false,
  },
  actived: {
    type: Array,
    default(): string[] {
      return [];
    },
  },
  defaultActived: {
    type: Array,
    default(): string[] {
      return [];
    },
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
  lazy: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Array,
    default(): string[] {
      return [];
    },
  },
  defaultValue: {
    type: Array,
    default(): string[] {
      return [];
    },
  },
  valueMode: {
    type: String,
    default: 'all',
  },
  filter: {
    type: Function,
  },
  empty: {
    type: [Function, String],
    default: '',
  },
  icon: {
    type: [Function, String, Boolean],
    default: true,
  },
  line: {
    type: [Function, Boolean],
    default: true,
  },
  label: {
    type: [Function, String, Boolean],
    default: true,
  },
  operations: {
    type: [Function, String],
    default: '',
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
    type: [Function, String],
    default: '',
  },
  icon: {
    type: [Function, String, Boolean],
    default: true,
  },
  line: {
    type: [Function, Boolean],
    default: false,
  },
  label: {
    type: [Function, String, Boolean],
    default: '',
  },
  operations: {
    type: [Function, String],
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
