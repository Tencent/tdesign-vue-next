/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 19:17:30
 * */

import { TdTimeRangePickerProps } from '../time-picker/type';
import { PropType } from 'vue';

export default {
  /** 是否允许直接输入时间 */
  allowInput: Boolean,
  /** 是否允许清除选中值 */
  clearable: Boolean,
  /** 是否禁用组件，值为数组表示可分别控制开始日期和结束日期是否禁用 */
  disabled: {
    type: [Boolean, Array] as PropType<TdTimeRangePickerProps['disabled']>,
    default: false,
  },
  /** 禁用时间项 */
  disableTime: {
    type: Function as PropType<TdTimeRangePickerProps['disableTime']>,
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
  /** 占位符，值为数组表示可分别为开始日期和结束日期设置占位符 */
  placeholder: {
    type: [String, Array] as PropType<TdTimeRangePickerProps['placeholder']>,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdTimeRangePickerProps['size']>,
    default: 'medium' as TdTimeRangePickerProps['size'],
    validator(val: TdTimeRangePickerProps['size']): boolean {
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1'] */
  steps: {
    type: Array as PropType<TdTimeRangePickerProps['steps']>,
    default: () => [1, 1, 1],
  },
  /** 选中值 */
  value: {
    type: Array as PropType<TdTimeRangePickerProps['value']>,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdTimeRangePickerProps['defaultValue']>,
  },
  /** 当输入框失去焦点时触发 */
  onBlur: Function as PropType<TdTimeRangePickerProps['onBlur']>,
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdTimeRangePickerProps['onChange']>,
  /** 输入框获得焦点时触发 */
  onFocus: Function as PropType<TdTimeRangePickerProps['onFocus']>,
  /** 当输入框内容发生变化时触发，参数 input 表示输入内容，value 表示组件当前有效值 */
  onInput: Function as PropType<TdTimeRangePickerProps['onInput']>,
};
