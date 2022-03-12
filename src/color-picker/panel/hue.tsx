import { defineComponent, PropType } from 'vue';
import ColorSlider from './slider';
import Color from '../utils/color';
import props from '../props';
import { useBaseClassName } from '../hooks';

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
    const baseClassName = useBaseClassName();
    const handleChange = (v: number) => emit('change', v);
    return {
      baseClassName,
      handleChange,
    };
  },
  render() {
    return (
      <color-slider
        className={`${this.baseClassName}__hue`}
        color={this.color}
        value={this.color.hue}
        onChange={this.handleChange}
        disabled={this.disabled}
      />
    );
  },
});
