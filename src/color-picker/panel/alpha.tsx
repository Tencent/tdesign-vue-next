import { computed, defineComponent, PropType } from 'vue';

import { useBaseClassName } from '../hooks';
import { Color } from '../utils';

import ColorSlider from './slider';

export default defineComponent({
  name: 'AlphaSlider',
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
  setup(props) {
    const baseClassName = useBaseClassName();
    const handleChange = (v: number, isDragEnd?: boolean) => {
      props.onChange(v / 100, isDragEnd);
    };
    const railStyle = computed(() => {
      return {
        background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${props.color.rgb})`,
      };
    });
    return {
      baseClassName,
      railStyle,
      handleChange,
    };
  },
  render() {
    const { baseClassName } = this;
    return (
      <ColorSlider
        class={[`${baseClassName}__alpha`, `${baseClassName}--bg-alpha`]}
        color={this.color}
        value={this.color.alpha * 100}
        onChange={this.handleChange}
        rail-style={this.railStyle}
        max-value={100}
        disabled={this.disabled}
        type="alpha"
      />
    );
  },
});
