/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTreeSelectProps } from './type';
import { PropType } from 'vue';

export default {
  /** 宽度随内容自适应 */
  autoWidth: Boolean,
  /** 自动聚焦 */
  autofocus: Boolean,
  /** 无边框模式 */
  borderless: Boolean,
  /** 是否允许清空 */
  clearable: Boolean,
  /** 多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedTags` 表示折叠的标签，`count` 表示折叠的数量，`onClose` 表示移除标签的事件回调 */
  collapsedItems: {
    type: Function as PropType<TdTreeSelectProps['collapsedItems']>,
  },
  /** 树选择的数据列表。结构：`[{ label: TNode, value: string | number, text: string, ... }]`，其中 `label` 表示选项呈现的内容，可自定义；`value` 表示选项的唯一值；表示当 `label` 用于选项复杂内容呈现时，`text` 用于搜索功能。<br />其中 `label` 和 `value` 可以使用 `keys` 属性定义别名 */
  data: {
    type: Array as PropType<TdTreeSelectProps['data']>,
    default: (): TdTreeSelectProps['data'] => [],
  },
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 当下拉列表为空时显示的内容 */
  empty: {
    type: [String, Function] as PropType<TdTreeSelectProps['empty']>,
  },
  /** 过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据 */
  filter: {
    type: Function as PropType<TdTreeSelectProps['filter']>,
  },
  /** 是否可搜索 */
  filterable: Boolean,
  /** 透传给 输入框 Input 组件的全部属性 */
  inputProps: {
    type: Object as PropType<TdTreeSelectProps['inputProps']>,
  },
  /** 输入框的值 */
  inputValue: {
    type: [String, Number] as PropType<TdTreeSelectProps['inputValue']>,
    default: undefined as TdTreeSelectProps['inputValue'],
  },
  /** 输入框的值，非受控属性 */
  defaultInputValue: {
    type: [String, Number] as PropType<TdTreeSelectProps['defaultInputValue']>,
  },
  /** 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label: 'name', children: 'list' }` */
  keys: {
    type: Object as PropType<TdTreeSelectProps['keys']>,
  },
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdTreeSelectProps['label']>,
  },
  /** 是否正在加载数据 */
  loading: Boolean,
  /** 远程加载时显示的文字，支持自定义。如加上超链接 */
  loadingText: {
    type: [String, Function] as PropType<TdTreeSelectProps['loadingText']>,
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
  /** 面板内的底部内容 */
  panelBottomContent: {
    type: [String, Function] as PropType<TdTreeSelectProps['panelBottomContent']>,
  },
  /** 面板内的顶部内容 */
  panelTopContent: {
    type: [String, Function] as PropType<TdTreeSelectProps['panelTopContent']>,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 透传给 popup 组件的全部属性 */
  popupProps: {
    type: Object as PropType<TdTreeSelectProps['popupProps']>,
  },
  /** 是否显示下拉框 */
  popupVisible: {
    type: Boolean,
    default: undefined,
  },
  /** 是否显示下拉框，非受控属性 */
  defaultPopupVisible: {
    type: Boolean,
    default: undefined,
  },
  /** 组件前置图标 */
  prefixIcon: {
    type: Function as PropType<TdTreeSelectProps['prefixIcon']>,
  },
  /** 只读状态，值为真会隐藏输入框，且无法打开下拉框 */
  readonly: Boolean,
  /** 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 */
  reserveKeyword: Boolean,
  /** 【开发中】透传 SelectInput 筛选器输入框组件的全部属性 */
  selectInputProps: {
    type: Object as PropType<TdTreeSelectProps['selectInputProps']>,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdTreeSelectProps['size']>,
    default: 'medium' as TdTreeSelectProps['size'],
    validator(val: TdTreeSelectProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdTreeSelectProps['status']>,
    default: 'default' as TdTreeSelectProps['status'],
    validator(val: TdTreeSelectProps['status']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 后置图标前的后置内容 */
  suffix: {
    type: [String, Function] as PropType<TdTreeSelectProps['suffix']>,
  },
  /** 组件后置图标 */
  suffixIcon: {
    type: Function as PropType<TdTreeSelectProps['suffixIcon']>,
  },
  /** 透传 Tag 标签组件全部属性 */
  tagProps: {
    type: Object as PropType<TdTreeSelectProps['tagProps']>,
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdTreeSelectProps['tips']>,
  },
  /** 透传 Tree 组件的全部属性 */
  treeProps: {
    type: Object as PropType<TdTreeSelectProps['treeProps']>,
  },
  /** 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue` */
  value: {
    type: [String, Number, Object, Array] as PropType<TdTreeSelectProps['value']>,
    default: undefined as TdTreeSelectProps['value'],
  },
  modelValue: {
    type: [String, Number, Object, Array] as PropType<TdTreeSelectProps['value']>,
    default: undefined as TdTreeSelectProps['value'],
  },
  /** 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`，非受控属性 */
  defaultValue: {
    type: [String, Number, Object, Array] as PropType<TdTreeSelectProps['defaultValue']>,
  },
  /** 自定义选中项呈现方式 */
  valueDisplay: {
    type: Function as PropType<TdTreeSelectProps['valueDisplay']>,
  },
  /** 用于控制选中值的类型。假设数据选项为：`[{ label: '姓名', value: 'name' }]`，value 表示值仅返回数据选项中的 value， object 表示值返回全部数据 */
  valueType: {
    type: String as PropType<TdTreeSelectProps['valueType']>,
    default: 'value' as TdTreeSelectProps['valueType'],
    validator(val: TdTreeSelectProps['valueType']): boolean {
      if (!val) return true;
      return ['value', 'object'].includes(val);
    },
  },
  /** 输入框失去焦点时触发 */
  onBlur: Function as PropType<TdTreeSelectProps['onBlur']>,
  /** 节点选中状态变化时触发，`context.node` 表示当前变化的选项，`context. trigger` 表示触发变化的来源。泛型 `TreeValueType` 继承自 `TreeSelectValue`  */
  onChange: Function as PropType<TdTreeSelectProps['onChange']>,
  /** 点击清除按钮时触发 */
  onClear: Function as PropType<TdTreeSelectProps['onClear']>,
  /** 回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值。泛型 `TreeValueType` 继承 `TreeSelectValue` */
  onEnter: Function as PropType<TdTreeSelectProps['onEnter']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<TdTreeSelectProps['onFocus']>,
  /** 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等 */
  onInputChange: Function as PropType<TdTreeSelectProps['onInputChange']>,
  /** 下拉框显示或隐藏时触发。单选场景，选中某个选项时触发关闭，此时需要添加参数 `node` */
  onPopupVisibleChange: Function as PropType<TdTreeSelectProps['onPopupVisibleChange']>,
  /** 多选模式下，选中数据被移除时触发 */
  onRemove: Function as PropType<TdTreeSelectProps['onRemove']>,
  /** 输入值变化时，触发搜索事件。主要用于远程搜索新数据。设置 `filterable=true` 开启此功能。优先级高于本地数据搜索 `filter`，即一旦存在这个远程搜索事件 `filter` 失效 */
  onSearch: Function as PropType<TdTreeSelectProps['onSearch']>,
};
