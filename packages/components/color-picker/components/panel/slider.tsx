import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, reactive, ref } from 'vue';
import { SLIDER_DEFAULT_WIDTH } from '@tdesign/common-js/color-picker/constants';
import { Draggable, Coordinate } from '../../utils';
import { useBaseClassName } from '../../hooks';
import baseProps from './base-props';

export default defineComponent({
  name: 'ColorSlider',
  props: {
    ...baseProps,
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
    type: {
      type: String as PropType<'hue' | 'alpha'>,
      default: 'hue',
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const refPanel = ref<HTMLElement>();
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
      const left = Math.round((props.value / props.maxValue) * 100);
      const color = props.type === 'hue' ? `hsl(${props.color.hue}, 100%, 50%)` : props.color.rgba;
      return {
        left: `${left}%`,
        color,
      };
    });

    const handleDrag = (coordinate: Coordinate, isEnded?: boolean) => {
      if (props.disabled) {
        return;
      }
      const { width } = panelRect;
      const { x } = coordinate;
      const value = Math.round((x / width) * props.maxValue * 100) / 100;
      props.onChange(value, isEnded);
    };

    const handleDragEnd = (coordinate: Coordinate) => {
      if (props.disabled) {
        return;
      }
      handleDrag(coordinate, true);
    };

    onMounted(() => {
      panelRect.width = refPanel.value.offsetWidth || SLIDER_DEFAULT_WIDTH;
      dragInstance.value = new Draggable(refPanel.value, {
        start: () => {
          // pop模式下由于是隐藏显示，这个宽度让其每次点击的时候重新计算
          panelRect.width = refPanel.value.offsetWidth;
        },
        drag: (coordinate: Coordinate) => {
          handleDrag(coordinate);
        },
        end: handleDragEnd,
      });
    });

    onBeforeUnmount(() => {
      dragInstance.value.destroy();
    });

    return () => {
      const paddingStyle = {
        background: `linear-gradient(90deg, rgba(0,0,0,.0) 0%, rgba(0,0,0,.0) 93%, ${props.color.rgb} 93%, ${props.color.rgb} 100%)`,
      };
      return (
        <div
          class={[
            `${baseClassName.value}__slider-wrapper`,
            `${baseClassName.value}__slider-wrapper--${props.type}-type`,
          ]}
        >
          {props.type === 'alpha' && <div class={`${baseClassName.value}__slider-padding`} style={paddingStyle} />}
          <div class={[`${baseClassName.value}__slider`, props.className]} ref={refPanel}>
            <div class={`${baseClassName.value}__rail`} style={props.railStyle}></div>
            <span
              class={[`${baseClassName.value}__thumb`]}
              role="slider"
              tabindex={0}
              ref={refThumb}
              style={styles.value}
            ></span>
          </div>
        </div>
      );
    };
  },
});
