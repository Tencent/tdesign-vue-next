import TreeNode from '../../common/js/tree/TreeNode';

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
    default: true,
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
  checkProps: {
    type: Object,
    default() {
      return {};
    },
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
    default: true,
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
    default: 'onlyLeaf',
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
    // 连线渲染较为消耗性能，推荐默认设置为 false
    default: false,
  },
  label: {
    type: [Function, String, Boolean],
    default: true,
  },
  operations: {
    type: [Function, String],
    default: '',
  },
  duration: {
    type: Number,
    default: 300,
  },
};

export const TreeItemProps = {
  node: {
    type: Object,
  },
  checkProps: {
    type: Object,
    default() {
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
  transition: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 300,
  },
};

export interface EventState {
  event?: Event;
  node?: TreeNode;
  nodes?: Array<TreeNode>;
  path?: Array<TreeNode>;
  data?: any;
  map?: Map<string, boolean>;
};
