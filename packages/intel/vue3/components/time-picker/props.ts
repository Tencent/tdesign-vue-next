/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 */

import type { PropType } from 'vue';
import type { TdTimePickerProps } from './type';

export default {
  /** 是否允许直接输入时间 */
  allowInput: Boolean,
  /** 是否允许清除选中值 */
  clearable: Boolean,
  /** 禁用时间项的配置函数 */
  disableTime: {
    type: Function as PropType<TdTimePickerProps['disableTime']>,
  },
  /** 是否禁用组件 */
  disabled: Boolean,
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
  /** 预设快捷时间选择，示例：`{ '前一小时': '11:00:00' }` */
  presets: {
    type: Object as PropType<TdTimePickerProps['presets']>,
  },
  /** 尺寸 */
  size: {
    type: String as PropType<TdTimePickerProps['size']>,
    default: 'medium' as TdTimePickerProps['size'],
    validator(val: TdTimePickerProps['size']): boolean {
      if (!val) {
        return true;
      }
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 输入框状态 */
  status: {
    type: String as PropType<TdTimePickerProps['status']>,
    default: 'default' as TdTimePickerProps['status'],
    validator(val: TdTimePickerProps['status']): boolean {
      if (!val) {
        return true;
      }
      return ['default', 'success', 'warning', 'error'].includes(val);
    },
  },
  /** 时间间隔步数，数组排列 [小时, 分钟, 秒]，示例：[2, 1, 1] 或者 ['2', '1', '1'] */
  steps: {
    type: Array as PropType<TdTimePickerProps['steps']>,
    default: (): TdTimePickerProps['steps'] => [1, 1, 1],
  },
  /** 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式 */
  tips: {
    type: [String, Function] as PropType<TdTimePickerProps['tips']>,
  },
  /** 选中值 */
  value: {
    type: String as PropType<TdTimePickerProps['value']>,
    default: undefined as TdTimePickerProps['value'],
  },
  modelValue: {
    type: String as PropType<TdTimePickerProps['value']>,
    default: undefined as TdTimePickerProps['value'],
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: String as PropType<TdTimePickerProps['defaultValue']>,
    default: '' as TdTimePickerProps['defaultValue'],
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
  /** 面板选中值后触发 */
  onPick: Function as PropType<TdTimePickerProps['onPick']>,
};
