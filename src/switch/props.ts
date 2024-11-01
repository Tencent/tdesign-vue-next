/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdSwitchProps } from './type';
import { PropType } from 'vue';

export default {
  /** Switch 切换状态前的回调方法，常用于需要发起异步请求的场景，回到返回值支持布尔和 Promise 类型，返回`false`或 Promise reject不继续执行change，否则则继续执行。 */
  beforeChange: {
    type: Function as PropType<TdSwitchProps['beforeChange']>,
  },
  /** 用于自定义开关的值，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]、['open', 'close'] */
  customValue: {
    type: Array as PropType<TdSwitchProps['customValue']>,
  },
  /** 是否禁用组件。优先级：Switch.disabled > Form.disabled */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 开关内容，[开启时内容，关闭时内容]。示例：['开', '关'] 或 (value) => value ? '开' : '关' */
  label: {
    type: [Array, Function] as PropType<TdSwitchProps['label']>,
    default: (): TdSwitchProps['label'] => [] as TdSwitchProps['label'],
  },
  /** 是否处于加载中状态 */
  loading: Boolean,
  /** 开关尺寸 */
  size: {
    type: String as PropType<TdSwitchProps['size']>,
    default: 'medium' as TdSwitchProps['size'],
    validator(val: TdSwitchProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 开关值 */
  value: {
    type: [String, Number, Boolean] as PropType<TdSwitchProps['value']>,
    default: undefined as TdSwitchProps['value'],
  },
  modelValue: {
    type: [String, Number, Boolean] as PropType<TdSwitchProps['value']>,
    default: undefined as TdSwitchProps['value'],
  },
  /** 开关值，非受控属性 */
  defaultValue: {
    type: [String, Number, Boolean] as PropType<TdSwitchProps['defaultValue']>,
  },
  /** 数据发生变化时触发 */
  onChange: Function as PropType<TdSwitchProps['onChange']>,
};
