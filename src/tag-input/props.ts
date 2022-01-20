/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTagInputProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否可清空 */
  clearable: Boolean,
  /** 标签过多的情况下，折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示标签值，`collapsedTags` 表示折叠标签值，`count` 表示总标签数量 */
  collapsedItems: {
    type: Function as PropType<TdTagInputProps['collapsedItems']>,
  },
  /** 是否禁用标签输入框 */
  disabled: Boolean,
  /** 【开发中】拖拽调整标签顺序 */
  dragSort: Boolean,
  /** 标签超出时的呈现方式，有两种：横向滚动显示 和 换行显示 */
  excessTagsDisplayType: {
    type: String as PropType<TdTagInputProps['excessTagsDisplayType']>,
    default: 'scroll' as TdTagInputProps['excessTagsDisplayType'],
    validator(val: TdTagInputProps['excessTagsDisplayType']): boolean {
      return ['scroll', 'break-line'].includes(val);
    },
  },
  /** 透传 Input 输入框组件全部属性 */
  inputProps: {
    type: Object as PropType<TdTagInputProps['inputProps']>,
  },
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdTagInputProps['label']>,
  },
  /** 最大允许输入的标签数量 */
  max: {
    type: Number,
  },
  /** 最小折叠数量，用于标签数量过多的情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠 */
  minCollapsedNum: {
    type: Number,
    default: 0,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 是否只读，值为真会隐藏标签移除按钮和输入框 */
  readonly: Boolean,
  /** 尺寸 */
  size: {
    type: String as PropType<TdTagInputProps['size']>,
    default: 'medium' as TdTagInputProps['size'],
    validator(val: TdTagInputProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdTagInputProps['status']>,
    validator(val: TdTagInputProps['status']): boolean {
      return ['success', 'warning', 'error'].includes(val);
    },
  },
  /** 后置图标前的后置内容 */
  suffix: {
    type: [String, Function] as PropType<TdTagInputProps['suffix']>,
  },
  /** 组件后置图标 */
  suffixIcon: {
    type: Function as PropType<TdTagInputProps['suffixIcon']>,
  },
  /** 自定义标签的内部内容，每一个标签的当前值。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签 */
  tag: {
    type: [String, Function] as PropType<TdTagInputProps['tag']>,
  },
  /** 透传 Tag 组件全部属性 */
  tagProps: {
    type: Object as PropType<TdTagInputProps['tagProps']>,
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdTagInputProps['tips']>,
  },
  /** 值 */
  value: {
    type: Array as PropType<TdTagInputProps['value']>,
  },
  modelValue: {
    type: Array as PropType<TdTagInputProps['value']>,
  },
  /** 值，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdTagInputProps['defaultValue']>,
  },
  /** 自定义值呈现的全部内容，参数为所有标签的值 */
  valueDisplay: {
    type: [String, Function] as PropType<TdTagInputProps['valueDisplay']>,
  },
  /** 失去焦点时触发 */
  onBlur: Function as PropType<TdTagInputProps['onBlur']>,
  /** 值变化时触发，参数 `trigger` 表示数据变化的触发来源 */
  onChange: Function as PropType<TdTagInputProps['onChange']>,
  /** 清空按钮点击时触发 */
  onClear: Function as PropType<TdTagInputProps['onClear']>,
  /** 按键按下 Enter 时触发 */
  onEnter: Function as PropType<TdTagInputProps['onEnter']>,
  /** 聚焦时触发 */
  onFocus: Function as PropType<TdTagInputProps['onFocus']>,
  /** 进入输入框时触发 */
  onMouseenter: Function as PropType<TdTagInputProps['onMouseenter']>,
  /** 离开输入框时触发 */
  onMouseleave: Function as PropType<TdTagInputProps['onMouseleave']>,
  /** 粘贴事件，`pasteValue` 表示粘贴板的内容 */
  onPaste: Function as PropType<TdTagInputProps['onPaste']>,
  /** 移除单个标签时触发 */
  onRemove: Function as PropType<TdTagInputProps['onRemove']>,
};
