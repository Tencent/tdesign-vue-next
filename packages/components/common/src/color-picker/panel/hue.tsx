import { defineComponent } from '@td/adapter-vue';
import baseProps from '@td/intel/color-picker/panel/base-props';
import { useBaseClassName } from '../hooks';
import ColorSlider from './slider';

export default defineComponent({
  name: 'HueSlider',

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
      <ColorSlider
        class={`${this.baseClassName}__hue`}
        color={this.color}
        value={this.color.hue}
        onChange={this.onChange}
        disabled={this.disabled}
        type="hue"
      />
    );
  },
});
