import { TransferItems, TransferItemKey } from './type';
import { PropType } from 'vue';
export const CommonProps = {
  data: {
    type: Array,
    default(): Array<TransferItems> {
      return [];
    },
  },
  // 目标列索引集合，数组，每项为数据的key值，transfer会把这些可以的数据筛选到右边
  modelValue: {
    type: Array,
    default(): Array<TransferItemKey> {
      return [];
    },
  },
  // 设置哪些被选中
  checkedValue: {
    type: Array,
    default(): Array<TransferItemKey> {
      return [];
    },
  },
  disabled: {
    type: [Boolean, Array],
    default: false,
  },
  // todo 没看到API定义的类型
  search: {
    type: [Boolean, Object, Array] as PropType<object | boolean | Array<boolean|object>>,
    default: false,
  },
  titles: {
    type: [String, Array],
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
  operations: [String, Array, Function],
  pagination: {
    // todo 自定义列表下无效
    type: [Object, Array],
  },
  checkAll: {
    type: [Boolean, Array],
    default: true,
  },
  footer: [Function, String],
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
