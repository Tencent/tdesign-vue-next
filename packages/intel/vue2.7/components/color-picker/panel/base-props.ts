import type { PropType } from 'vue';
import type { TdColorHandler } from '../interfaces';
import type { Color } from '../utils';

export default {
  /** 是否禁用组件 */
  disabled: Boolean,
  /** Color Instance */
  color: {
    type: Object as PropType<Color>,
  },
  handleChange: {
    type: Function as PropType<TdColorHandler>,
    default: () => () => {},
  },
};
