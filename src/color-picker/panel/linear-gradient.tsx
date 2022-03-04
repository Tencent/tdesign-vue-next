import { defineComponent, inject, onBeforeUnmount, onMounted, PropType, reactive, ref, watch } from 'vue';
import { cloneDeep } from 'lodash';
import props from '../props';
import {
  COMPONENT_NAME,
  GRADIENT_SLIDER_DEFAULT_WIDTH,
  TdColorPickerUsedColorsProvide,
  TD_COLOR_USED_COLORS_PROVIDE,
} from '../const';
import Color, { genGradientPoint } from '../utils/color';
import { GradientColorPoint } from '../utils/gradient';
import { InputNumber as TInputNumber } from '../../input-number';

const DELETE_KEYS: string[] = ['delete', 'backspace'];

export default defineComponent({
  name: 'LinearGradient',
  components: {
    TInputNumber,
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
    const { addColor } = inject<TdColorPickerUsedColorsProvide>(TD_COLOR_USED_COLORS_PROVIDE);
    const refSlider = ref<HTMLElement>(null);
    const sliderRect = reactive({
      left: 0,
      width: GRADIENT_SLIDER_DEFAULT_WIDTH,
    });
    const isDragging = ref(false);
    const degree = ref(props.color.gradientDegree);
    const selectedId = ref(props.color.gradientSelectedId);
    const colors = ref<GradientColorPoint[]>(cloneDeep(props.color.gradientColors));

    watch(
      () => props.color.gradientDegree,
      (value) => (degree.value = value),
    );
    watch(
      () => props.color.gradientSelectedId,
      (value) => (selectedId.value = value),
    );
    watch(
      () => props.color.gradientColors,
      (value) => {
        colors.value = cloneDeep(value);
      },
      {
        deep: true,
      },
    );

    const handleChange = (key: 'degree' | 'selectedId' | 'colors', payload: any) => {
      if (props.disabled) {
        return;
      }
      emit('change', {
        key,
        payload,
      });
    };

    const handleDegreeChange = (value: number) => {
      if (props.disabled) {
        return;
      }
      degree.value = value;
      handleChange('degree', value);
      addColor(props.color.linearGradient);
    };

    const handleSelectedIdChange = (value: string) => {
      if (props.disabled) {
        return;
      }
      selectedId.value = value;
      handleChange('selectedId', value);
    };

    const handleColorsChange = (value: GradientColorPoint[]) => {
      if (props.disabled) {
        return;
      }
      colors.value = value;
      handleChange('colors', value);
    };

    const updateActiveThumbLeft = (left: number) => {
      const index = colors.value.findIndex((c) => c.id === selectedId.value);
      if (index === -1) {
        return;
      }
      const point = colors.value[index];
      left = Math.max(0, Math.min(sliderRect.width, left));
      const percentLeft = (left / sliderRect.width) * 100;
      colors.value.splice(index, 1, {
        color: point.color,
        left: percentLeft,
        id: point.id,
      });
      handleColorsChange(colors.value);
    };

    const handleStart = (id: string, e: MouseEvent) => {
      const rect = refSlider.value.getBoundingClientRect();
      sliderRect.left = rect.left;
      sliderRect.width = rect.width || GRADIENT_SLIDER_DEFAULT_WIDTH;
      if (isDragging.value || props.disabled) {
        return;
      }
      isDragging.value = true;
      e.preventDefault();
      e.stopPropagation();
      handleSelectedIdChange(id);
      // 让slider获取焦点，以便键盘事件生效。
      refSlider.value.focus();
      window.addEventListener('mousemove', handleMove, false);
      window.addEventListener('mouseup', handleEnd, false);
      window.addEventListener('contextmenu', handleEnd, false);
    };

    const handleMove = (e: MouseEvent) => {
      if (!isDragging.value || props.disabled) {
        return;
      }
      const left = e.clientX - sliderRect.left;
      updateActiveThumbLeft(left);
    };

    const handleEnd = (e: MouseEvent) => {
      if (!isDragging.value) {
        return;
      }
      setTimeout(() => {
        isDragging.value = false;
      }, 0);
      window.removeEventListener('mousemove', handleMove, false);
      window.removeEventListener('mouseup', handleEnd, false);
      window.removeEventListener('contextmenu', handleEnd, false);
      addColor(props.color.linearGradient);
    };

    const handleKeyup = (e: KeyboardEvent) => {
      if (props.disabled) {
        return;
      }
      const points = colors.value;
      let pos = points.findIndex((c) => c.id === selectedId.value);
      const { length } = points;
      // 必须保证有两个点
      if (DELETE_KEYS.includes(e.key.toLocaleLowerCase()) && length > 2 && pos >= 0 && pos <= length - 1) {
        points.splice(pos, 1);
        if (!points[pos]) {
          // eslint-disable-next-line no-nested-ternary
          pos = points[pos + 1] ? pos + 1 : points[pos - 1] ? pos - 1 : 0;
        }
        const current = points[pos];
        handleColorsChange(points);
        handleSelectedIdChange(current?.id);
        addColor(props.color.linearGradient);
      }
    };

    const handleThumbBarClick = (e: MouseEvent) => {
      if (props.disabled) {
        return;
      }
      let left = e.clientX - sliderRect.left;
      left = Math.max(0, Math.min(sliderRect.width, left));
      const percentLeft = (left / sliderRect.width) * 100;
      const newPoint = genGradientPoint(percentLeft, props.color.rgba);
      colors.value.push(newPoint);
      handleColorsChange(colors.value);
      handleSelectedIdChange(newPoint.id);
      addColor(props.color.linearGradient);
    };

    onMounted(() => {
      const rect = refSlider.value.getBoundingClientRect();
      sliderRect.left = rect.left;
      sliderRect.width = rect.width || GRADIENT_SLIDER_DEFAULT_WIDTH;
    });

    onBeforeUnmount(() => {
      window.removeEventListener('mousemove', handleMove, false);
      window.removeEventListener('mouseup', handleEnd, false);
      window.removeEventListener('contextmenu', handleEnd, false);
    });

    return {
      refSlider,
      degree,
      selectedId,
      colors,
      handleDegreeChange,
      handleStart,
      handleMove,
      handleEnd,
      handleKeyup,
      handleThumbBarClick,
    };
  },
  render() {
    const { linearGradient } = this.$props.color;
    const { colors, selectedId, degree, disabled } = this;
    return (
      <div class={`${COMPONENT_NAME}__gradient`}>
        <div class={`${COMPONENT_NAME}__gradient__slider`}>
          <div
            class={[`${COMPONENT_NAME}__slider`, `${COMPONENT_NAME}--bg-alpha`]}
            onKeyup={this.handleKeyup}
            tabindex={0}
            ref="refSlider"
          >
            <ul
              class="gradient-thumbs"
              onClick={this.handleThumbBarClick}
              style={{
                background: linearGradient,
              }}
            >
              {colors.map((t) => {
                const left = `${Math.round(t.left * 100) / 100}%`;
                return (
                  <li
                    class={[
                      `${COMPONENT_NAME}__thumb`,
                      'gradient-thumbs__item',
                      selectedId === t.id ? 'is-active' : '',
                    ]}
                    key={t.id}
                    id={t.id}
                    title={`${t.color} ${left}`}
                    style={{
                      color: t.color,
                      left,
                    }}
                    onClick={(e: MouseEvent) => e.stopPropagation()}
                    onMousedown={(e: MouseEvent) => this.handleStart(t.id, e)}
                  >
                    <span class={['gradient-thumbs__item__inner', `${COMPONENT_NAME}--bg-alpha`]}></span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div class={`${COMPONENT_NAME}__gradient__degree`} title={`${degree}deg`}>
          <t-input-number
            theme="normal"
            size="large"
            min={0}
            max={360}
            step={1}
            format={(value: number) => `${value}°`}
            v-model={this.degree}
            onBlur={this.handleDegreeChange}
            disabled={disabled}
          />
        </div>
      </div>
    );
  },
});
