import { defineComponent, PropType } from 'vue';
import { COMPONENT_NAME } from '../const';
import ColorSlider from './slider';
import Color from '../utils/color';
import props from '../props';

export default defineComponent({
  name: 'HueSlider',
  components: {
    ColorSlider,
  },
  inheritAttrs: false,
  props: {
    ...props,
    color: {
      type: Object as PropType<Color>,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const handleChange = (v: number) => emit('change', v);
    return {
      handleChange,
    };
  },
  render() {
    return (
      <color-slider
        className={`${COMPONENT_NAME}__hue`}
        color={this.color}
        value={this.color.hue}
        onChange={this.handleChange}
        disabled={this.disabled}
      />
    );
  },
});
