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
};

export interface TreeModelOptions {
  keys: object;
}
