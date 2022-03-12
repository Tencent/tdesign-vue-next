import { computed, defineComponent, PropType } from 'vue';
import ColorSlider from './slider';
import Color from '../utils/color';
import props from '../props';
import { useBaseClassName } from '../hooks';

export default defineComponent({
  name: 'AlphaSlider',
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
    const handleChange = (v: number) => emit('change', v / 100);
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
      <color-slider
        class={[`${baseClassName}__alpha`, `${baseClassName}--bg-alpha`]}
        color={this.color}
        value={this.color.alpha * 100}
        onChange={this.handleChange}
        rail-style={this.railStyle}
        max-value={100}
        disabled={this.disabled}
      />
    );
  },
});
