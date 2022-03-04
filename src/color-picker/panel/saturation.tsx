import { computed, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, PropType, reactive, ref } from 'vue';
import {
  COMPONENT_NAME,
  SATURATION_PANEL_DEFAULT_HEIGHT,
  SATURATION_PANEL_DEFAULT_WIDTH,
  TdColorPickerUsedColorsProvide,
  TD_COLOR_USED_COLORS_PROVIDE,
} from '../const';
import { Select as TSelect, Option as TOption } from '../../select';
import Draggable, { Coordinate } from '../utils/draggable';
import Color from '../utils/color';
import props from '../props';

export default defineComponent({
  name: 'SaturationPanel',
  components: {
    TSelect,
    TOption,
  },
  inject: [TD_COLOR_USED_COLORS_PROVIDE],
  inheritAttrs: false,
  props: {
    ...props,
    color: {
      type: Object as PropType<Color>,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { addColor } = inject<TdColorPickerUsedColorsProvide>(TD_COLOR_USED_COLORS_PROVIDE);
    const refPanel = ref<HTMLElement>(null);
    const refThumb = ref<HTMLElement>(null);
    const dragInstance = ref<Draggable>(null);
    const panelRect = reactive({
      width: SATURATION_PANEL_DEFAULT_WIDTH,
      height: SATURATION_PANEL_DEFAULT_HEIGHT,
    });

    const styles = computed(() => {
      const { saturation, value } = props.color;
      const { width, height } = panelRect;
      const top = Math.round((1 - value) * height);
      const left = Math.round(saturation * width);
      return {
        color: props.color.rgb,
        left: `${left}px`,
        top: `${top}px`,
      };
    });

    const getSaturationAndValueByCoordinate = (coordinate: Coordinate) => {
      const { width, height } = panelRect;
      const { x, y } = coordinate;
      const saturation = Math.round((x / width) * 100);
      const value = Math.round((1 - y / height) * 100);
      return {
        saturation,
        value,
      };
    };

    const handleDrag = (coordinate: Coordinate) => {
      if (props.disabled) {
        return;
      }
      const { saturation, value } = getSaturationAndValueByCoordinate(coordinate);
      emit('change', {
        saturation: saturation / 100,
        value: value / 100,
      });
    };

    const handleDragEnd = (coordinate: Coordinate) => {
      if (props.disabled) {
        return;
      }
      handleDrag(coordinate);
      nextTick(() => {
        addColor(props.color.css);
      });
    };

    const panelBackground = computed(() => {
      return `hsl(${props.color.hue}, 100%, 50%)`;
    });

    onMounted(() => {
      panelRect.width = refPanel.value.offsetWidth || SATURATION_PANEL_DEFAULT_WIDTH;
      panelRect.height = refPanel.value.offsetHeight || SATURATION_PANEL_DEFAULT_HEIGHT;
      dragInstance.value = new Draggable(refPanel.value, {
        start() {
          panelRect.width = refPanel.value.offsetWidth;
          panelRect.height = refPanel.value.offsetHeight;
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
      panelBackground,
    };
  },
  render() {
    return (
      <div
        class={[`${COMPONENT_NAME}__saturation`]}
        ref="refPanel"
        style={{
          background: this.panelBackground,
        }}
      >
        <span class={[`${COMPONENT_NAME}__thumb`]} role="slider" tabindex={0} ref="refThumb" style={this.styles}></span>
      </div>
    );
  },
});
