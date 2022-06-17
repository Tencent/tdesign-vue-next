/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdTimePickerProps } from './type';
import { PropType } from 'vue';

export default {
  /** 是否允许直接输入时间 */
  allowInput: Boolean,
  /** 是否允许清除选中值 */
  clearable: Boolean,
  /** 是否禁用组件 */
  disabled: Boolean,
  /** 禁用时间项 */
  disableTime: {
    type: Function as PropType<TdTimePickerProps['disableTime']>,
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
  /** 透传给输入框（Input）组件的参数 */
  inputProps: {
    type: Object as PropType<TdTimePickerProps['inputProps']>,
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: undefined,
  },
  /** 透传给 popup 组件的参数 */
  popupProps: {
    type: Object as PropType<TdTimePickerProps['popupProps']>,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdTimePickerProps['size']>,
    default: 'medium' as TdTimePickerProps['size'],
    validator(val: TdTimePickerProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1'] */
  steps: {
    type: Array as PropType<TdTimePickerProps['steps']>,
    default: (): TdTimePickerProps['steps'] => [1, 1, 1],
  },
  /** 选中值 */
  value: {
    type: String,
    default: undefined,
  },
  modelValue: {
    type: String,
    default: undefined,
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: String,
    default: '',
  },
  /** 当输入框失去焦点时触发，value 表示组件当前有效值 */
  onBlur: Function as PropType<TdTimePickerProps['onBlur']>,
  /** 选中值发生变化时触发 */
  onChange: Function as PropType<TdTimePickerProps['onChange']>,
  /** 面板关闭时触发 */
  onClose: Function as PropType<TdTimePickerProps['onClose']>,
  /** 输入框获得焦点时触发，value 表示组件当前有效值 */
  onFocus: Function as PropType<TdTimePickerProps['onFocus']>,
  /** 当输入框内容发生变化时触发，参数 value 表示组件当前有效值 */
  onInput: Function as PropType<TdTimePickerProps['onInput']>,
  /** 面板打开时触发 */
  onOpen: Function as PropType<TdTimePickerProps['onOpen']>,
};
