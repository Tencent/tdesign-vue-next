/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCheckboxGroupProps } from '../checkbox/type';
import { PropType } from 'vue';

export default {
  /** 是否禁用组件。优先级：Form.disabled < CheckboxGroup.disabled < Checkbox.disabled */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /** 当取值为 vertical 时，多选框选项以垂直方向排列。仅在按钮风格（variant 不为空）下生效 */
  direction: {
    type: String as PropType<TdCheckboxGroupProps['direction']>,
    default: 'horizontal' as TdCheckboxGroupProps['direction'],
    validator(val: TdCheckboxGroupProps['direction']): boolean {
      if (!val) return true;
      return ['horizontal', 'vertical'].includes(val);
    },
  },
  /** 是否启用懒加载。子组件 Checkbox 数据量大时建议开启；加载复杂内容或大量图片时建议开启 */
  lazyLoad: Boolean,
  /** 支持最多选中的数量 */
  max: {
    type: Number,
    default: undefined,
  },
  /** 统一设置内部复选框 HTML 属性 */
  name: {
    type: String,
    default: '',
  },
  /** 以配置形式设置子元素。示例1：`['北京', '上海']` ，示例2: `[{ label: '全选', checkAll: true }, { label: '上海', value: 'shanghai' }]`。checkAll 值为 true 表示当前选项为「全选选项」 */
  options: {
    type: Array as PropType<TdCheckboxGroupProps['options']>,
  },
  /** 只读状态 */
  readonly: {
    type: Boolean,
    default: undefined,
  },
  /** 组件尺寸，仅在按钮风格（variant 不为空）下生效 */
  size: {
    type: String as PropType<TdCheckboxGroupProps['size']>,
    default: 'medium' as TdCheckboxGroupProps['size'],
    validator(val: TdCheckboxGroupProps['size']): boolean {
      if (!val) return true;
      return ['small', 'medium', 'large'].includes(val);
    },
  },
  /** 选中值 */
  value: {
    type: Array as PropType<TdCheckboxGroupProps['value']>,
    default: undefined as TdCheckboxGroupProps['value'],
  },
  modelValue: {
    type: Array as PropType<TdCheckboxGroupProps['value']>,
    default: undefined as TdCheckboxGroupProps['value'],
  },
  /** 选中值，非受控属性 */
  defaultValue: {
    type: Array as PropType<TdCheckboxGroupProps['defaultValue']>,
    default: (): TdCheckboxGroupProps['defaultValue'] => [],
  },
  /** 多选框组按钮形式。为空表示不启用按钮风格，仍为默认的方框多选框 */
  variant: {
    type: String as PropType<TdCheckboxGroupProps['variant']>,
    default: undefined as TdCheckboxGroupProps['variant'],
    validator(val: TdCheckboxGroupProps['variant']): boolean {
      if (!val) return true;
      return ['outline', 'primary-filled', 'default-filled'].includes(val);
    },
  },
  /** 值变化时触发。`context.current` 表示当前变化的数据项，如果是全选则为空；`context.type` 表示引起选中数据变化的是选中或是取消选中，`context.option` 表示当前变化的数据项 */
  onChange: Function as PropType<TdCheckboxGroupProps['onChange']>,
};
