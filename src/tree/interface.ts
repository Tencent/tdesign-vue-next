export const TreeProps = {
  data: {
    type: Array,
    default(): Array<any> {
      return [];
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
