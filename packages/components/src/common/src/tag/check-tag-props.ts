/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCheckTagProps } from '../tag/type';
import { PropType } from 'vue';

export default {
  /** 标签选中的状态，默认风格（theme=default）才有选中态 */
  checked: {
    type: Boolean,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  /** 标签选中的状态，默认风格（theme=default）才有选中态，非受控属性 */
  defaultChecked: Boolean,
  /** 透传标签选中态属性 */
  checkedProps: {
    type: Object as PropType<TdCheckTagProps['checkedProps']>,
  },
  /** 组件子元素；传入数组时：[选中内容，非选中内容] */
  content: {
    type: [String, Number, Array, Function] as PropType<TdCheckTagProps['content']>,
  },
  /** 组件子元素，默认插槽 */
  default: {
    type: [String, Function] as PropType<TdCheckTagProps['default']>,
  },
  /** 标签禁用态，失效标签不能触发事件。默认风格（theme=default）才有禁用态 */
  disabled: Boolean,
  /** 标签尺寸 */
  size: {
    type: String as PropType<TdCheckTagProps['size']>,
    default: 'medium' as TdCheckTagProps['size'],
    validator(val: TdCheckTagProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 透传标签未选态属性 */
  uncheckedProps: {
    type: Object as PropType<TdCheckTagProps['uncheckedProps']>,
  },
  /** 标签唯一标识，一般用于标签组场景，单个可选择标签无需设置 */
  value: {
    type: [String, Number] as PropType<TdCheckTagProps['value']>,
  },
  /** 状态切换时触发 */
  onChange: Function as PropType<TdCheckTagProps['onChange']>,
  /** 点击标签时触发 */
  onClick: Function as PropType<TdCheckTagProps['onClick']>,
};
