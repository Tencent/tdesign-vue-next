import { computed, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, PropType, reactive, ref } from 'vue';
import {
  COMPONENT_NAME,
  SLIDER_DEFAULT_WIDTH,
  TdColorPickerUsedColorsProvide,
  TD_COLOR_USED_COLORS_PROVIDE,
} from '../const';
import { Select as TSelect, Option as TOption } from '../../select';
import Draggable, { Coordinate } from '../utils/draggable';
import Color from '../utils/color';

export default defineComponent({
  name: 'ColorSlider',
  components: {
    TSelect,
    TOption,
  },
  inject: [TD_COLOR_USED_COLORS_PROVIDE],
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
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { addColor } = inject<TdColorPickerUsedColorsProvide>(TD_COLOR_USED_COLORS_PROVIDE);
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
      emit('change', value);
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
      refThumb,
      refPanel,
      styles,
    };
  },
  render() {
    return (
      <div class={[`${COMPONENT_NAME}__slider`, this.className]} ref="refPanel">
        <div class={`${COMPONENT_NAME}__rail`} style={this.railStyle}></div>
        <span class={[`${COMPONENT_NAME}__thumb`]} role="slider" tabindex={0} ref="refThumb" style={this.styles}></span>
      </div>
    );
  },
});
