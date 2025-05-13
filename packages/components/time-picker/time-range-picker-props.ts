/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTimeRangePickerProps } from '../time-picker/type';
import { PropType } from 'vue';

export default {
  /** 是否允许直接输入时间 */
  allowInput: Boolean,
  /** 是否自动调换左右区间的顺序，默认为 true；若需要支持跨天的场景，可以设置为 false */
  autoSwap: {
    type: Boolean,
    default: true,
  },
  /** 无边框模式 */
  borderless: Boolean,
  /** 是否允许清除选中值 */
  clearable: Boolean,
  /** 禁用时间项 */
  disableTime: {
    type: Function as PropType<TdTimeRangePickerProps['disableTime']>,
  },
  /** 是否禁用组件，值为数组表示可分别控制开始日期和结束日期是否禁用 */
  disabled: {
    type: [Boolean, Array] as PropType<TdTimeRangePickerProps['disabled']>,
    default: undefined as TdTimeRangePickerProps['disabled'],
  },
  /** 用于格式化时间，[详细文档](https://day.js.org/docs/en/display/format) */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /** 是否隐藏禁用状态的时间项 */
  hideDisabledTime: {
    type: Boolean,
    default: true,
  },
  /** 左侧文本 */
  label: {
    type: [String, Function] as PropType<TdTimeRangePickerProps['label']>,
  },
  /** 占位符，值为数组表示可分别为开始日期和结束日期设置占位符 */
  placeholder: {
    type: [String, Array] as PropType<TdTimeRangePickerProps['placeholder']>,
    default: undefined as TdTimeRangePickerProps['placeholder'],
  },
  /** 透传 Popup 组件全部属性 */
  popupProps: {
    type: Object as PropType<TdTimeRangePickerProps['popupProps']>,
  },
  /** 预设快捷时间范围选择，示例：{ '下午': ['13:00:00', '18:00:00'] } */
  presets: {
    type: Object as PropType<TdTimeRangePickerProps['presets']>,
  },
  /** 透传给范围输入框 RangeInput 组件的参数 */
  rangeInputProps: {
    type: Object as PropType<TdTimeRangePickerProps['rangeInputProps']>,
  },
  /** 只读状态，优先级大于 `allowInput` */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdTimeRangePickerProps['size']>,
    default: 'medium' as TdTimeRangePickerProps['size'],
    validator(val: TdTimeRangePickerProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdTimeRangePickerProps['status']>,
    default: 'default' as TdTimeRangePickerProps['status'],
    validator(val: TdTimeRangePickerProps['status']): boolean {
      if (!val) return true;
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1'] */
  steps: {
    type: Array as PropType<TdTimeRangePickerProps['steps']>,
    default: (): TdTimeRangePickerProps['steps'] => [1, 1, 1],
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdTimeRangePickerProps['tips']>,
  },
  /** 选中值 */
  value: {
    type: Array as PropType<TdTimeRangePickerProps['value']>,
    default: undefined as TdTimeRangePickerProps['value'],
  },
  modelValue: {
    type: Array as PropType<TdTimeRangePickerProps['value']>,
    default: undefined as TdTimeRangePickerProps['value'],
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdTimeRangePickerProps['defaultValue']>,
  },
  /** 当输入框失去焦点时触发 */
  onBlur: Function as PropType<TdTimeRangePickerProps['onBlur']>,
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdTimeRangePickerProps['onChange']>,
  /** 范围输入框获得焦点时触发 */
  onFocus: Function as PropType<TdTimeRangePickerProps['onFocus']>,
  /** 当输入框内容发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 */
  onInput: Function as PropType<TdTimeRangePickerProps['onInput']>,
  /** 面板选中值后触发 */
  onPick: Function as PropType<TdTimeRangePickerProps['onPick']>,
};
