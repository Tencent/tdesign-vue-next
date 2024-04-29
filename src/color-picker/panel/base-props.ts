import { PropType } from 'vue';

import { Color } from '../utils';

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
