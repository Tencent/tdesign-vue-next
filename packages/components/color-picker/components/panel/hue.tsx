import { defineComponent } from 'vue';
import ColorSlider from './slider';
import { useBaseClassName } from '../../hooks';
import baseProps from './base-props';

export default defineComponent({
  name: 'HueSlider',

  inheritAttrs: false,
  props: baseProps,
  setup(props) {
    const baseClassName = useBaseClassName();

    return () => {
      return (
        <ColorSlider
          class={`${baseClassName.value}__hue`}
          color={props.color}
          value={props.color.hue}
          onChange={props.onChange}
          disabled={props.disabled}
          type="hue"
        />
      );
    };
  },
});
