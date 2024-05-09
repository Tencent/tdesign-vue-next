import { defineComponent } from 'vue';

import { useBaseClassName } from '../hooks';

import baseProps from './base-props';
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
