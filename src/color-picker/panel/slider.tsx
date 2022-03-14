import { computed, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, PropType, reactive, ref } from 'vue';
import { SLIDER_DEFAULT_WIDTH } from '../const';
import { Select as TSelect, Option as TOption } from '../../select';
import Draggable, { Coordinate } from '../utils/draggable';
import Color from '../utils/color';
import { TdColorPickerProvides, TdColorPickerUsedColorsProvide } from '../interfaces';
import { useBaseClassName } from '../hooks';

export default defineComponent({
  name: 'ColorSlider',
  components: {
    TSelect,
    TOption,
  },
  inject: [TdColorPickerProvides.USED_COLORS],
  props: {
    color: {
      type: Object as PropType<Color>,
    },
    className: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 360,
    },
    railStyle: {
      type: Object as PropType<any>,
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
    const { addColor } = inject<TdColorPickerUsedColorsProvide>(TdColorPickerProvides.USED_COLORS);
    const refPanel = ref<HTMLElement>(null);
    const refThumb = ref<HTMLElement>(null);
    const dragInstance = ref<Draggable>(null);
    const panelRect = reactive({
      width: SLIDER_DEFAULT_WIDTH,
    });
    const styles = computed(() => {
      const { width } = panelRect;
      if (!width) {
        return;
      }
      const left = Math.round((props.value / props.maxValue) * width);
      return {
        left: `${left}px`,
        color: props.color.rgb,
      };
    });

    const handleDrag = (coordinate: Coordinate) => {
      if (props.disabled) {
        return;
      }
      const { width } = panelRect;
      const { x } = coordinate;
      const value = Math.round((x / width) * props.maxValue * 100) / 100;
      props.onChange(value);
    };

    const handleDragEnd = (coordinate: Coordinate) => {
      if (props.disabled) {
        return;
      }
      handleDrag(coordinate);
      nextTick(() => addColor(props.color.css));
    };

    onMounted(() => {
      panelRect.width = refPanel.value.offsetWidth || SLIDER_DEFAULT_WIDTH;
      dragInstance.value = new Draggable(refPanel.value, {
        start: () => {
          // pop模式下由于是隐藏显示，这个宽度让其每次点击的时候重新计算
          panelRect.width = refPanel.value.offsetWidth;
        },
        drag: handleDrag,
        end: handleDragEnd,
      });
    });

    onBeforeUnmount(() => {
      dragInstance.value.destroy();
    });

    return {
      baseClassName,
      refThumb,
      refPanel,
      styles,
    };
  },
  render() {
    const { baseClassName, className, railStyle, styles } = this;
    return (
      <div class={[`${baseClassName}__slider`, className]} ref="refPanel">
        <div class={`${baseClassName}__rail`} style={railStyle}></div>
        <span class={[`${baseClassName}__thumb`]} role="slider" tabindex={0} ref="refThumb" style={styles}></span>
      </div>
    );
  },
});
