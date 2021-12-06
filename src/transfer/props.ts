/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdTransferProps } from './type';
import { PropType } from 'vue';

export default {
  /** 用于控制复选框属性 */
  checkboxProps: {
    type: Object as PropType<TdTransferProps['checkboxProps']>,
  },
  /** 数据列表选中项 */
  checked: {
    type: Array as PropType<TdTransferProps['checked']>,
    default: (): TdTransferProps['checked'] => [],
  },
  /** 数据列表选中项，非受控属性 */
  defaultChecked: {
    type: Array as PropType<TdTransferProps['defaultChecked']>,
    default: (): TdTransferProps['defaultChecked'] => [],
  },
  /** 全量数据 */
  data: {
    type: Array as PropType<TdTransferProps['data']>,
    default: (): TdTransferProps['data'] => [],
  },
  /** 穿梭框可操作方向 */
  direction: {
    type: String as PropType<TdTransferProps['direction']>,
    default: 'both' as TdTransferProps['direction'],
    validator(val: TdTransferProps['direction']): boolean {
      return ['left', 'right', 'both'].includes(val);
    },
  },
  /** 禁用全部操作：搜索、选中、移动、分页等。[源列表, 目标列表]，示例：[true, false] 或者 true */
  disabled: {
    type: [Boolean, Array] as PropType<TdTransferProps['disabled']>,
    default: false,
  },
  /** 列表为空时呈现的内容。值类型为数组，则表示分别控制源列表和目标列表数据为空的呈现内容 */
  empty: {
    type: [String, Array, Function] as PropType<TdTransferProps['empty']>,
    default: '',
  },
  /** 穿梭框底部内容 */
  footer: {
    type: [Array, Function] as PropType<TdTransferProps['footer']>,
  },
  /** 用来定义选项文本和选项值字段，示例：{ label: 'text', value: 'id' }，表示选项文本取 `text` 字段，选项值取 `id` 字段 */
  keys: {
    type: Object as PropType<TdTransferProps['keys']>,
  },
  /** 方向操作按钮。默认显示组件内置操作图标。自定义操作图标示例：['向左', '向右'] 或者 `[() => <i class='left' />, () => <i class='left' />]` 或者 `(h, direction) => direction === 'left' ? '《' : '》'` */
  operation: {
    type: [Array, Function] as PropType<TdTransferProps['operation']>,
  },
  /** 分页配置，值为空则不显示。具体 API 参考分页组件。值类型为数组，表示可分别控制源列表和目标列表分页组件 */
  pagination: {
    type: [Object, Array] as PropType<TdTransferProps['pagination']>,
  },
  /** 搜索框配置，值为 false 表示不显示搜索框；值为 true 表示显示默认搜索框；值类型为对象，用于透传 Props 到 Input 组件；值类型为数组，则分别表示控制两侧搜索框 */
  search: {
    type: [Boolean, Object, Array] as PropType<TdTransferProps['search']>,
    default: false,
  },
  /** 是否显示全选，值类型为数组则表示分别控制源列表和目标列表 */
  showCheckAll: {
    type: [Boolean, Array] as PropType<TdTransferProps['showCheckAll']>,
    default: true,
  },
  /** 目标数据列表排列顺序 */
  targetSort: {
    type: String as PropType<TdTransferProps['targetSort']>,
    default: 'original' as TdTransferProps['targetSort'],
    validator(val: TdTransferProps['targetSort']): boolean {
      return ['original', 'push', 'unshift'].includes(val);
    },
  },
  /** 穿梭框标题，示例：['源列表', '目标列表'] 或者 `[() => 'A', () => 'B']` 或者 `({ type }) => type === 'source' ? '源' : '目标'` */
  title: {
    type: [Array, Function] as PropType<TdTransferProps['title']>,
    default: (): TdTransferProps['title'] => [],
  },
  /** 自定义渲染节点 */
  transferItem: {
    type: Function as PropType<TdTransferProps['transferItem']>,
  },
  /** 目标数据列表数据 */
  value: {
    type: Array as PropType<TdTransferProps['value']>,
    default: (): TdTransferProps['value'] => [],
  },
  /** 目标数据列表数据，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdTransferProps['defaultValue']>,
    default: (): TdTransferProps['defaultValue'] => [],
  },
  /** 数据列表发生变化时触发 */
  onChange: Function as PropType<TdTransferProps['onChange']>,
  /** 源数据列表或目标数据列表的选中项发生变化时触发 */
  onCheckedChange: Function as PropType<TdTransferProps['onCheckedChange']>,
  /** 分页发生变化时触发 */
  onPageChange: Function as PropType<TdTransferProps['onPageChange']>,
  /** 列表滚动时触发，bottomDistance 表示元素滚动到底部的距离 */
  onScroll: Function as PropType<TdTransferProps['onScroll']>,
  /** 搜索时触发，options.query 表示用户输入的内容 */
  onSearch: Function as PropType<TdTransferProps['onSearch']>,
};
