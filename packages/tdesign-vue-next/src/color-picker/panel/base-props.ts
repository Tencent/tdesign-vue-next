import type { PropType } from 'vue';
import type { Color } from '@td/common/js/color-picker';

export default {
  /** 是否禁用组件 */
  disabled: Boolean,
  /** Color Instance */
  color: {
    type: Object as PropType<Color>,
  },
  onChange: {
    type: Function,
    default: () => () => {},
  },
};
