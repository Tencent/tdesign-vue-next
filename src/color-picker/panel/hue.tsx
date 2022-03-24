import { defineComponent } from 'vue';
import ColorSlider from './slider';
import { useBaseClassName } from '../hooks';
import baseProps from './base-props';

export default defineComponent({
  name: 'HueSlider',
  components: {
    ColorSlider,
  },
  inheritAttrs: false,
  props: {
    ...baseProps,
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
