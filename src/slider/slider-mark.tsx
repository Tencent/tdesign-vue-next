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
  setup(props, ctx) {
    const COMPONENT_NAME = usePrefixClass('slider__mark');
    const changeValue = (e: MouseEvent) => {
      e.stopPropagation();
      ctx.emit('change-value', props.point);
    };

    return () => (
      <div class={`${COMPONENT_NAME.value}-text`} onClick={changeValue}>
        {props.mark}
      </div>
    );
  },
});
