/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdCheckboxGroupProps } from '../checkbox/type';
import { PropType } from 'vue';

export default {
  /** 是否禁用组件，默认为 false。优先级：Form.disabled < CheckboxGroup.disabled < Checkbox.disabled */
  disabled: {
    type: Boolean,
    default: undefined,
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
  /** 值变化时触发。`context.current` 表示当前变化的数据项，如果是全选则为空；`context.type` 表示引起选中数据变化的是选中或是取消选中，`context.option` 表示当前变化的数据项 */
  onChange: Function as PropType<TdCheckboxGroupProps['onChange']>,
};
