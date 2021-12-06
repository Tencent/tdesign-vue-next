/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-05 14:42:17
 * */

import { TdSelectProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否有边框 */
  bordered: {
    type: Boolean,
    default: true,
  },
  /** 是否可以清空选项 */
  clearable: Boolean,
  /** 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义 */
  collapsedItems: {
    type: Function as PropType<TdSelectProps['collapsedItems']>,
  },
  /** 是否允许用户创建新条目，需配合 filterable 使用 */
  creatable: Boolean,
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 当下拉列表为空时显示的内容 */
  empty: {
    type: [String, Function] as PropType<TdSelectProps['empty']>,
    default: '',
  },
  /** 自定义过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据 */
  filter: {
    type: Function as PropType<TdSelectProps['filter']>,
  },
  /** 是否可搜索 */
  filterable: Boolean,
  /** 用来定义 value / label 在 `options` 中对应的字段别名 */
  keys: {
    type: Object as PropType<TdSelectProps['keys']>,
  },
  /** 是否为加载状态 */
  loading: Boolean,
  /** 远程加载时显示的文字，支持自定义。如加上超链接 */
  loadingText: {
    type: [String, Function] as PropType<TdSelectProps['loadingText']>,
    default: '',
  },
  /** 用于控制多选数量，值为 0 则不限制 */
  max: {
    type: Number,
    default: 0,
  },
  /** 最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 */
  minCollapsedNum: {
    type: Number,
    default: 0,
  },
  /** 是否允许多选 */
  multiple: Boolean,
  /** 数据化配置选项内容 */
  options: {
    type: Array as PropType<TdSelectProps['options']>,
    default: (): TdSelectProps['options'] => [],
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 透传给 popup 组件的参数 */
  popupProps: {
    type: Object as PropType<TdSelectProps['popupProps']>,
  },
  /** 组件前置图标 */
  prefixIcon: {
    type: Function as PropType<TdSelectProps['prefixIcon']>,
  },
  /** 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 */
  reserveKeyword: Boolean,
  /** 【讨论中】是否显示全选 */
  showCheckAlll: Boolean,
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdSelectProps['size']>,
    default: 'medium' as TdSelectProps['size'],
    validator(val: TdSelectProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 选中值 */
  value: {
    type: [String, Number, Object, Array] as PropType<TdSelectProps['value']>,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number, Object, Array] as PropType<TdSelectProps['defaultValue']>,
  },
  /** 自定义选中项呈现方式 */
  valueDisplay: {
    type: Function as PropType<TdSelectProps['valueDisplay']>,
  },
  /** 用于控制选中值的类型。假设数据选项为：[{ label: '姓名', value: 'name' }]，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据。 */
  valueType: {
    type: String as PropType<TdSelectProps['valueType']>,
    default: 'value' as TdSelectProps['valueType'],
    validator(val: TdSelectProps['valueType']): boolean {
      return ['value', 'object'].includes(val);
    },
  },
  /** 输入框失去焦点时触发 */
  onBlur: Function as PropType<TdSelectProps['onBlur']>,
  /** 选中值变化时触发 */
  onChange: Function as PropType<TdSelectProps['onChange']>,
  /** 点击清除按钮时触发 */
  onClear: Function as PropType<TdSelectProps['onClear']>,
  /** 当选择新创建的条目时触发 */
  onCreate: Function as PropType<TdSelectProps['onCreate']>,
  /** 回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值 */
  onEnter: Function as PropType<TdSelectProps['onEnter']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<TdSelectProps['onFocus']>,
  /** 多选模式下，选中数据被移除时触发 */
  onRemove: Function as PropType<TdSelectProps['onRemove']>,
  /** 输入值变化时，触发搜索事件。主要用于远程搜索新数据 */
  onSearch: Function as PropType<TdSelectProps['onSearch']>,
  /** 下拉框隐藏/显示时触发 */
  onVisibleChange: Function as PropType<TdSelectProps['onVisibleChange']>,
};
