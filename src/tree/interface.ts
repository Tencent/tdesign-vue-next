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
    type: [Object, String],
    default: '',
  },
  expandAll: {
    type: Boolean,
    default: false,
  },
  expandTrigger: {
    type: [Boolean, String],
    default: 'click',
  },
  expandLevel: {
    type: Number,
    default: 0,
  },
  expandMutex: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: Boolean,
    default: true,
  },
};

export const TreeNodeProps = {
  item: {
    type: Object,
    default(): object {
      return {};
    },
  },
  empty: {
    type: [Object, String],
    default: '',
  },
};

export interface TreeModelOptions {
  keys?: object;
  expandMutex?: boolean;
}

export interface TreeItem {
  id: string;
  parent?: TreeItem;
  dataset?: object;
  children?: Array<TreeItem>;
  value?: any;
  label?: string;
  expand?: boolean;
  expandMutex?: boolean;
  active?: boolean;
  activable?: boolean;
  checkProps?: boolean;
  checkable?: boolean;
  disabled?: boolean;
  draggable?: boolean;
  level?: number;
  visible?: boolean;
}
