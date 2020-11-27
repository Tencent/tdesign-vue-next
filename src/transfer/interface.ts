import { TransferItems } from './type/transfer';
export const CommonProps = {
  data: {
    type: Array,
    default(): Array<TransferItems> {
      return [];
    },
  },
  // 目标列索引集合，数组，每项为数据的key值，transfer会把这些可以的数据筛选到右边
  targetValue: {
    type: Array,
    default(): Array<string | number | symbol> {
      return [];
    },
  },
  // 设置哪些被选中
  checkedValue: {
    type: Array,
    default(): Array<string | number | symbol> {
      return [];
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  search: {
    // todo 没看到API定义的类型
    type: Boolean,
    default: true,
  },
  titles: {
    type: Array,
    default(): Array<string> {
      return ['源列表', '目标列表'];
    },
    // default: () => ['源列表', '目标列表'],
  },
  directions: {
    type: String,
    default: 'both',
    validator(value: string) {
      return ['left', 'right', 'both'].includes(value);
    },
  },
  operations: [String, Array,  Function],
  pagination: {
    // todo 自定义列表下无效
    type: [Object, Array],
  },
  selectAll: {
    type: Boolean,
    default: true,
  },
  footer: {
    type: Function,
  },
  renderItem: {
    type: Function,
  },
  empty: {
    type: [Function, String],
    default: '暂无数据',
  },
  targetOrder: {
    type: String,
    default: 'original',
    validator(value: string) {
      return ['original', 'push', 'unshift'].includes(value);
    },
  },
  rowKey: {
    type: [Function, String],
  },
  default: {
    type: Function,
  },
};
