import { defineComponent, PropType } from 'vue';
import { TdSliderProps } from './type';
import { emitEvent } from '../utils/event';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TSliderMark',
  props: {
    mark: {
      type: [Object, Array, String, Number] as PropType<TdSliderProps['marks']>,
    },
    point: {
      type: Number,
    },
  },
  emits: ['change-value'],
  setup() {
    const COMPONENT_NAME = usePrefixClass('slider__mark');
    return {
      COMPONENT_NAME,
    };
  },
  methods: {
    changeValue(event: MouseEvent) {
      event.stopPropagation();
      emitEvent(this, 'change-value', this.point);
    },
  },
  render() {
    const label = this.mark;
    return (
      <div class={`${this.COMPONENT_NAME}-text`} onClick={this.changeValue}>
        {label}
      </div>
    );
  },
});
