import { defineComponent, PropType } from 'vue';
import { TdSliderProps } from './type';
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
<<<<<<< HEAD
    onClickMarkPoint: {
=======
    clickMarkPoint: {
>>>>>>> fix(slider): 修复Slider部分属性丢失响应性问题
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('slider__mark');
    const changeValue = (e: MouseEvent) => {
      e.stopPropagation();
<<<<<<< HEAD
      props?.onClickMarkPoint?.(props.point);
=======
      if (props.clickMarkPoint) {
        props.clickMarkPoint(props.point);
      }
>>>>>>> fix(slider): 修复Slider部分属性丢失响应性问题
    };

    return () => (
      <div class={`${COMPONENT_NAME.value}-text`} onClick={changeValue}>
        {props.mark}
      </div>
    );
  },
});
