/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2022-01-11 12:30:00
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
  /** 标签超出时的呈现方式，有两种：横向滚动显示 和 换行显示 */
  overTagsDisplayType: {
    type: String as PropType<TdTagInputProps['overTagsDisplayType']>,
    default: 'scroll' as TdTagInputProps['overTagsDisplayType'],
    validator(val: TdTagInputProps['overTagsDisplayType']): boolean {
      return ['scroll', 'break-line'].includes(val);
    },
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 是否只读，值为真会隐藏标签移除按钮和输入框 */
  readonly: Boolean,
  /** 输入框状态 */
  status: {
    type: String as PropType<TdTagInputProps['status']>,
    validator(val: TdTagInputProps['status']): boolean {
      return ['success', 'warning', 'error'].includes(val);
    },
  },
  /** 自定义标签的内部内容，每一个标签的当前值。注意和 `valueDisplay` 区分，`valueDisplay`  是用来定义全部标签内容，而非某一个标签 */
  tag: {
    type: [String, Function] as PropType<TdTagInputProps['tag']>,
  },
  /** 透传 Tag 组件全部属性 */
  tagProps: {
    type: Object as PropType<TdTagInputProps['tagProps']>,
  },
  /** 值 */
  value: {
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
  /** 值变化时触发，参数 `trigger` 表示数据变化的触发来源 */
  onChange: Function as PropType<TdTagInputProps['onChange']>,
  /** 清空按钮点击时触发 */
  onClear: Function as PropType<TdTagInputProps['onClear']>,
  /** 按键按下 Enter 时触发 */
  onEnter: Function as PropType<TdTagInputProps['onEnter']>,
  /** 进入输入框时触发 */
  onMouseenter: Function as PropType<TdTagInputProps['onMouseenter']>,
  /** 离开输入框时触发 */
  onMouseleave: Function as PropType<TdTagInputProps['onMouseleave']>,
  /** 移除单个标签时触发 */
  onRemove: Function as PropType<TdTagInputProps['onRemove']>,
};
