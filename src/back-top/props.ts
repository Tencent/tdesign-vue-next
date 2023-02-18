import { TdBackTopProps } from './type';
import { PropType } from 'vue';

export default {
  fixed: {
    type: Boolean,
    default: true,
  },
  target: {
    type: Function as PropType<TdBackTopProps['target']>,
  },
  shape: {
    type: String as PropType<TdBackTopProps['shape']>,
    default: 'circle',
  },
  visibilityHeight: {
    type: Number,
    default: 200,
  },
  onToTop: {
    type: Function as PropType<TdBackTopProps['onToTop']>,
  },
  icon: {
    type: Function as PropType<TdBackTopProps['icon']>,
    default: 'backtop',
  },
  text: {
    type: String,
    defaulr: '',
  },
};
