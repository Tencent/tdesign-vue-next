/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-29 18:11:36
 * */

import { TdTreeSelectProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许清空 */
  clearable: Boolean,
  /** 数据 */
  data: {
    type: Array as PropType<TdTreeSelectProps['data']>,
    default: (): TdTreeSelectProps['data'] => [],
  },
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 当下拉列表为空时显示的内容 */
  empty: {
    type: [String, Function] as PropType<TdTreeSelectProps['empty']>,
    default: '',
  },
  /** 过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据 */
  filter: {
    type: Function as PropType<TdTreeSelectProps['filter']>,
  },
  /** 是否可搜索 */
  filterable: Boolean,
  /** 是否正在加载数据 */
  loading: Boolean,
  /** 远程加载时显示的文字，支持自定义。如加上超链接 */
  loadingText: {
    type: [String, Function] as PropType<TdTreeSelectProps['loadingText']>,
    default: '',
  },
  /** 用于控制多选数量，值为 0 则不限制 */
  max: {
    type: Number,
    default: 0,
  },
  /** 是否允许多选 */
  multiple: Boolean,
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 透传给 popup 组件的参数 */
  popupProps: {
    type: Object as PropType<TdTreeSelectProps['popupProps']>,
  },
  /** 组件前置图标 */
  prefixIcon: {
    type: Function as PropType<TdTreeSelectProps['prefixIcon']>,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdTreeSelectProps['size']>,
    default: 'medium' as TdTreeSelectProps['size'],
    validator(val: TdTreeSelectProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 透传 Tree 组件属性 */
  treeProps: {
    type: Object as PropType<TdTreeSelectProps['treeProps']>,
  },
  /** 选中值 */
  value: {
    type: [String, Number, Object, Array] as PropType<TdTreeSelectProps['value']>,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: [String, Number, Object, Array] as PropType<TdTreeSelectProps['defaultValue']>,
  },
  /** 用于控制选中值的类型。假设数据选项为：[{ label: '姓名', value: 'name' }]，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据 */
  valueType: {
    type: String as PropType<TdTreeSelectProps['valueType']>,
    default: 'value' as TdTreeSelectProps['valueType'],
    validator(val: TdTreeSelectProps['valueType']): boolean {
      return ['value', 'object'].includes(val);
    },
  },
  /** 输入框失去焦点时触发 */
  onBlur: Function as PropType<TdTreeSelectProps['onBlur']>,
  /** 节点选中状态变化时触发，context.node 表示当前变化的选项 */
  onChange: Function as PropType<TdTreeSelectProps['onChange']>,
  /** 点击清除按钮时触发 */
  onClear: Function as PropType<TdTreeSelectProps['onClear']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<TdTreeSelectProps['onFocus']>,
  /** 多选模式下，选中数据被移除时触发 */
  onRemove: Function as PropType<TdTreeSelectProps['onRemove']>,
  /** 输入值变化时，触发搜索事件。主要用于远程搜索新数据 */
  onSearch: Function as PropType<TdTreeSelectProps['onSearch']>,
};
