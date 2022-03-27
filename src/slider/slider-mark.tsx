import { defineComponent, PropType } from 'vue';
import { TdSliderProps } from './type';

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
    const changeValue = (e: MouseEvent) => {
      e.stopPropagation();
      ctx.emit('change-value', props.point);
    };

    const renderContent = () => {
      return (
        <div class="t-slider__mark-text" onClick={changeValue}>
          {props.mark}
        </div>
      );
    };
    return {
      renderContent,
    };
  },
  render() {
    return this.renderContent();
  },
});
