/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSelectInputProps } from './type';
import { PropType } from 'vue';

export default {
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
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdSelectInputProps['label']>,
  },
  /** 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 */
  minCollapsedNum: {
    type: Number,
    default: 0,
  },
  /** 标签超出时的呈现方式，有两种：横向滚动显示 和 换行显示 */
  overTagsDisplayType: {
    type: String as PropType<TdSelectInputProps['overTagsDisplayType']>,
    default: 'scroll' as TdSelectInputProps['overTagsDisplayType'],
    validator(val: TdSelectInputProps['overTagsDisplayType']): boolean {
      return ['scroll', 'break-line'].includes(val);
    },
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
  popupVisible: Boolean,
  /** 是否只读，值为真会隐藏输入框，且无法打开下拉框 */
  readonly: Boolean,
  /** 输入框状态 */
  status: {
    type: String as PropType<TdSelectInputProps['status']>,
    validator(val: TdSelectInputProps['status']): boolean {
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
  /** 透传 Tag 标签组件全部属性 */
  tagProps: {
    type: Object as PropType<TdSelectInputProps['tagProps']>,
  },
  /** 全部标签值。值为数组表示多个标签，值为非数组表示单个数值 */
  value: {
    type: [String, Array] as PropType<TdSelectInputProps['value']>,
  },
  /** 自定义值呈现的全部内容，参数为所有标签的值 */
  valueDisplay: {
    type: [String, Function] as PropType<TdSelectInputProps['valueDisplay']>,
  },
  /** 值的呈现方式，有两种：文本 和 标签。一般情况，单选选择器使用 `text` 模式，多选选择器使用 `tag` 模式 */
  variant: {
    type: String as PropType<TdSelectInputProps['variant']>,
    default: 'text' as TdSelectInputProps['variant'],
    validator(val: TdSelectInputProps['variant']): boolean {
      return ['text', 'tag'].includes(val);
    },
  },
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdSelectInputProps['onBlur']>,
  /** 清空按钮点击时触发 */
  onClear: Function as PropType<TdSelectInputProps['onClear']>,
  /** 按键按下 Enter 时触发 */
  onEnter: Function as PropType<TdSelectInputProps['onEnter']>,
  /** 聚焦时触发 */
  onFocus: Function as PropType<TdSelectInputProps['onFocus']>,
  /** 进入输入框时触发 */
  onMouseenter: Function as PropType<TdSelectInputProps['onMouseenter']>,
  /** 离开输入框时触发 */
  onMouseleave: Function as PropType<TdSelectInputProps['onMouseleave']>,
  /** 粘贴事件，`pasteValue` 表示粘贴板的内容 */
  onPaste: Function as PropType<TdSelectInputProps['onPaste']>,
  /** 下拉框显示或隐藏时触发 */
  onPopupVisible: Function as PropType<TdSelectInputProps['onPopupVisible']>,
  /** 移除单个标签时触发 */
  onRemove: Function as PropType<TdSelectInputProps['onRemove']>,
};
