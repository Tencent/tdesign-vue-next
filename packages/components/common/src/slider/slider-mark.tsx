import type { PropType } from '@td/adapter-vue';
import { defineComponent } from '@td/adapter-vue';
import type { TdSliderProps } from '@td/intel/slider/type';
import { usePrefixClass } from '@td/adapter-hooks';

export default defineComponent({
  name: 'TSliderMark',
  props: {
    mark: {
      type: [Object, Array, String, Number] as PropType<TdSliderProps['marks']>,
    },
    point: {
      type: Number,
    },
    onClickMarkPoint: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('slider__mark');
    const changeValue = (e: MouseEvent) => {
      e.stopPropagation();
      props?.onClickMarkPoint?.(props.point);
    };

    return () => (
      <div class={`${COMPONENT_NAME.value}-text`} onClick={changeValue}>
        {props.mark}
      </div>
    );
  },
});
