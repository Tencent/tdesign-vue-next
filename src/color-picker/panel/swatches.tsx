import { defineComponent, inject, onBeforeUnmount, onMounted, PropType, ref } from 'vue';
import { DeleteIcon } from 'tdesign-icons-vue-next';
import { Select as TSelect, Option as TOption } from '../../select';
import Color from '../utils/color';
import { useClickOutsider } from '../utils/click-outsider';
import { TdColorPickerProvides, TdColorPickerUsedColorsProvide } from '../interfaces';
import { useBaseClassName, useStatusClassName } from '../hooks';

export default defineComponent({
  name: 'SwatchesPanel',
  components: {
    TSelect,
    TOption,
  },
  inject: [TdColorPickerProvides.USED_COLORS],
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
    const baseClassName = useBaseClassName();
    const statusClassNames = useStatusClassName();
    const { activeColor, removeColor, setActiveColor } = inject<TdColorPickerUsedColorsProvide>(
      TdColorPickerProvides.USED_COLORS,
    );

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
      baseClassName,
      statusClassNames,
      activeColor,
      colorItemRefs,
      handleClick,
      isEqualCurrentColor,
      setActiveColor,
      removeColor,
    };
  },
  render() {
    const { baseClassName, statusClassNames, colors, activeColor, title, removable, disabled, colorItemRefs } = this;
    const swatchesClass = `${baseClassName}__swatches`;
    return (
      <div class={swatchesClass}>
        <h3 class={`${swatchesClass}--title`}>
          <span>{title}</span>
          {removable ? (
            <span
              role="button"
              class={[`${baseClassName}__icon`, !activeColor ? statusClassNames.disabledClassName : '']}
              onMouseup={(e) => e.stopPropagation()}
              onClick={() => {
                if (disabled) {
                  return;
                }
                if (activeColor) {
                  this.removeColor(activeColor);
                  this.setActiveColor('');
                }
              }}
            >
              <DeleteIcon />
            </span>
          ) : null}
        </h3>
        <ul class={[`${swatchesClass}--items`, 'narrow-scrollbar']}>
          {colors.map((color) => {
            return (
              <li
                ref={colorItemRefs}
                class={[
                  `${swatchesClass}--item`,
                  activeColor === color && removable ? statusClassNames.activeClassName : '',
                  this.isEqualCurrentColor(color) ? statusClassNames.currentClassName : '',
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
                <span class={[`${swatchesClass}--item__color`, `${baseClassName}--bg-alpha`]}>
                  <span
                    class={`${swatchesClass}--item__inner`}
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
