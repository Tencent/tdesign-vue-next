import { computed, defineComponent, PropType } from 'vue';
import ColorSlider from './slider';
import { Color } from '../../utils';
import { useBaseClassName } from '../../hooks';

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

    return () => {
      return (
        <ColorSlider
          class={[`${baseClassName.value}__alpha`, `${baseClassName.value}--bg-alpha`]}
          color={props.color}
          value={props.color.alpha * 100}
          onChange={handleChange}
          rail-style={railStyle.value}
          max-value={100}
          disabled={props.disabled}
          type="alpha"
        />
      );
    };
  },
});
