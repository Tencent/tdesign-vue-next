/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSelectInputProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许输入 */
  allowInput: Boolean,
  /** 宽度随内容自适应 */
  autoWidth: Boolean,
  /** 无边框模式 */
  borderless: Boolean,
  /** 是否可清空 */
  clearable: Boolean,
  /** 标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 `collapsedItems` 自定义。`value` 表示所有标签值，`collapsedTags` 表示折叠标签值，`count` 表示总标签数量 */
  collapsedItems: {
    type: Function as PropType<TdSelectInputProps['collapsedItems']>,
  },
  /** 是否禁用 */
  disabled: Boolean,
  /** 透传 Input 输入框组件全部属性 */
  inputProps: {
    type: Object as PropType<TdSelectInputProps['inputProps']>,
  },
  /** 输入框的值 */
  inputValue: {
    type: [String, Number] as PropType<TdSelectInputProps['inputValue']>,
  },
  /** 输入框的值，非受控属性 */
  defaultInputValue: {
    type: [String, Number] as PropType<TdSelectInputProps['defaultInputValue']>,
  },
  /** 定义字段别名，示例：`{ label: 'text', value: 'id', children: 'list' }` */
  keys: {
    type: Object as PropType<TdSelectInputProps['keys']>,
  },
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdSelectInputProps['label']>,
  },
  /** 是否处于加载状态 */
  loading: Boolean,
  /** 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 */
  minCollapsedNum: {
    type: Number,
    default: 0,
  },
  /** 是否为多选模式，默认为单选 */
  multiple: Boolean,
  /** 下拉框内容，可完全自定义 */
  panel: {
    type: [String, Function] as PropType<TdSelectInputProps['panel']>,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: '',
  },
  /** 透传 Popup 浮层组件全部属性 */
  popupProps: {
    type: Object as PropType<TdSelectInputProps['popupProps']>,
  },
  /** 是否显示下拉框，受控属性 */
  popupVisible: {
    type: Boolean,
    default: undefined,
  },
  /** 是否只读，值为真会隐藏输入框，且无法打开下拉框 */
  readonly: Boolean,
  /** 输入框状态 */
  status: {
    type: String as PropType<TdSelectInputProps['status']>,
    validator(val: TdSelectInputProps['status']): boolean {
      if (!val) return true;
      return ['success', 'warning', 'error'].includes(val);
    },
  },
  /** 后置图标前的后置内容 */
  suffix: {
    type: [String, Function] as PropType<TdSelectInputProps['suffix']>,
  },
  /** 组件后置图标 */
  suffixIcon: {
    type: Function as PropType<TdSelectInputProps['suffixIcon']>,
  },
  /** 自定义标签的内部内容，每一个标签的当前值。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签 */
  tag: {
    type: [String, Function] as PropType<TdSelectInputProps['tag']>,
  },
  /** 透传 TagInput 组件全部属性 */
  tagInputProps: {
    type: Object as PropType<TdSelectInputProps['tagInputProps']>,
  },
  /** 透传 Tag 标签组件全部属性 */
  tagProps: {
    type: Object as PropType<TdSelectInputProps['tagProps']>,
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdSelectInputProps['tips']>,
  },
  /** 全部标签值。值为数组表示多个标签，值为非数组表示单个数值 */
  value: {
    type: [String, Number, Boolean, Object, Array, Date] as PropType<TdSelectInputProps['value']>,
  },
  /** 自定义值呈现的全部内容，参数为所有标签的值 */
  valueDisplay: {
    type: [String, Function] as PropType<TdSelectInputProps['valueDisplay']>,
  },
  /** 失去焦点时触发，`context.inputValue` 表示输入框的值；`context.tagInputValue` 表示标签输入框的值 */
  onBlur: Function as PropType<TdSelectInputProps['onBlur']>,
  /** 清空按钮点击时触发 */
  onClear: Function as PropType<TdSelectInputProps['onClear']>,
  /** 按键按下 Enter 时触发 */
  onEnter: Function as PropType<TdSelectInputProps['onEnter']>,
  /** 聚焦时触发 */
  onFocus: Function as PropType<TdSelectInputProps['onFocus']>,
  /** 输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等 */
  onInputChange: Function as PropType<TdSelectInputProps['onInputChange']>,
  /** 进入输入框时触发 */
  onMouseenter: Function as PropType<TdSelectInputProps['onMouseenter']>,
  /** 离开输入框时触发 */
  onMouseleave: Function as PropType<TdSelectInputProps['onMouseleave']>,
  /** 粘贴事件，`pasteValue` 表示粘贴板的内容 */
  onPaste: Function as PropType<TdSelectInputProps['onPaste']>,
  /** 下拉框显示或隐藏时触发 */
  onPopupVisibleChange: Function as PropType<TdSelectInputProps['onPopupVisibleChange']>,
  /** 值变化时触发，参数 `context.trigger` 表示数据变化的触发来源；`context.index` 指当前变化项的下标；`context.item` 指当前变化项；`context.e` 表示事件参数 */
  onTagChange: Function as PropType<TdSelectInputProps['onTagChange']>,
};
