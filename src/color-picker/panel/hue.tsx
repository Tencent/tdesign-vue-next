import { defineComponent, PropType } from 'vue';
import ColorSlider from './slider';
import Color from '../utils/color';
import { useBaseClassName } from '../hooks';

export default defineComponent({
  name: 'HueSlider',
  components: {
    ColorSlider,
  },
  inheritAttrs: false,
  props: {
    color: {
      type: Object as PropType<Color>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  setup() {
    const baseClassName = useBaseClassName();
    return {
      baseClassName,
    };
  },
  render() {
    return (
      <color-slider
        className={`${this.baseClassName}__hue`}
        color={this.color}
        value={this.color.hue}
        onChange={this.onChange}
        disabled={this.disabled}
      />
    );
  },
});
