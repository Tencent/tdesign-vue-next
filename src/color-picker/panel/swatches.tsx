import { defineComponent, inject, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import { DeleteIcon } from 'tdesign-icons-vue-next';
import {
  CLASS_NAME_ACTIVE,
  CLASS_NAME_CURRENT,
  CLASS_NAME_DISABLE,
  COMPONENT_NAME,
  TdColorPickerUsedColorsProvide,
  TD_COLOR_USED_COLORS_PROVIDE,
} from '../const';
import { Select as TSelect, Option as TOption } from '../../select';
import Color from '../utils/color';
import { useClickOutsider } from '../utils/click-outsider';

const BASE_CLASS_NAME = `${COMPONENT_NAME}__swatches`;

export default defineComponent({
  name: 'SwatchesPanel',
  components: {
    TSelect,
    TOption,
  },
  inject: [TD_COLOR_USED_COLORS_PROVIDE],
  props: {
    color: {
      type: Object as PropType<Color>,
    },
    colors: {
      type: Array as PropType<string[]>,
      default: () => [] as PropType<string[]>,
    },
    title: {
      type: String,
      default: '系统色彩',
    },
    removable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['set-color'],
  setup(props, { emit }) {
    const { activeColor, removeColor, setActiveColor } =
      inject<TdColorPickerUsedColorsProvide>(TD_COLOR_USED_COLORS_PROVIDE);

    const handleClick = (color: string) => emit('set-color', color);

    const isEqualCurrentColor = (color: string) => props.color.equals(color);

    const colorItemEls = ref<HTMLElement[]>([]);

    const colorItemRefs = (el: HTMLElement) => colorItemEls.value.push(el);

    const { addClickOutsider, removeClickOutsider } = useClickOutsider();

    onMounted(() => {
      addClickOutsider(colorItemEls.value, () => {
        setActiveColor('');
      });
    });

    onBeforeUnmount(() => {
      removeClickOutsider();
    });

    return {
      activeColor,
      colorItemRefs,
      handleClick,
      isEqualCurrentColor,
      setActiveColor,
      removeColor,
    };
  },
  render() {
    return (
      <div class={BASE_CLASS_NAME}>
        <h3 class={`${BASE_CLASS_NAME}--title`}>
          <span>{this.title}</span>
          {this.removable ? (
            <span
              role="button"
              title="移除选中的颜色"
              class={[`${COMPONENT_NAME}__icon`, !this.activeColor ? CLASS_NAME_DISABLE : '']}
              onMouseup={(e) => e.stopPropagation()}
              onClick={() => {
                if (this.disabled) {
                  return;
                }
                if (this.activeColor) {
                  this.removeColor(this.activeColor);
                  this.setActiveColor('');
                }
              }}
            >
              <DeleteIcon />
            </span>
          ) : null}
        </h3>
        <ul class={[`${BASE_CLASS_NAME}--items`, 'narrow-scrollbar']}>
          {this.colors.map((color) => {
            return (
              <li
                ref={this.colorItemRefs}
                class={[
                  `${BASE_CLASS_NAME}--item`,
                  this.activeColor === color && this.removable ? CLASS_NAME_ACTIVE : '',
                  this.isEqualCurrentColor(color) ? CLASS_NAME_CURRENT : '',
                ]}
                key={color}
                title={color}
                onClick={() => {
                  if (this.disabled) {
                    return;
                  }
                  this.handleClick(color);
                }}
              >
                <span class={[`${BASE_CLASS_NAME}--item__color`, `${COMPONENT_NAME}--bg-alpha`]}>
                  <span
                    class={`${BASE_CLASS_NAME}--item__inner`}
                    style={{
                      background: color,
                    }}
                  ></span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});
