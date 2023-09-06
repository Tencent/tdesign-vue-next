import { TdButtonGroupProps } from './button-group-type';
import { PropType } from 'vue';

export default {
  /** 组件尺寸 */
  size: {
    type: String as PropType<TdButtonGroupProps['size']>,
    validator(val: TdButtonGroupProps['size']): boolean {
      if (!val) return true;
      return ['extra-small', 'small', 'medium', 'large'].includes(val);
    },
  },
  /** 组件风格，依次为默认色、品牌色、危险色、警告色、成功色 */
  theme: {
    type: String as PropType<TdButtonGroupProps['theme']>,
    validator(val: TdButtonGroupProps['theme']): boolean {
      if (!val) return true;
      return ['default', 'primary', 'danger', 'warning', 'success'].includes(val);
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};
