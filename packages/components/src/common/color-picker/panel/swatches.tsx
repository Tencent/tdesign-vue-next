import type { PropType } from '@td/adapter-vue';
import { computed, defineComponent, ref } from '@td/adapter-vue';
import { AddIcon as TdAddIcon, DeleteIcon as TdDeleteIcon } from 'tdesign-icons-vue-next';

import baseProps from '@td/intel/components/color-picker/panel/base-props';
import { useCommonClassName, useGlobalIcon } from '@td/adapter-hooks';
import { Color } from '../utils';
import { useBaseClassName } from '../hooks';

export default defineComponent({
  name: 'SwatchesPanel',
  props: {
    ...baseProps,
    colors: {
      type: Array as PropType<string[]>,
      default: () => [] as PropType<string[]>,
    },
    title: {
      type: String,
      default: '系统色彩',
    },
    editable: {
      type: Boolean,
      default: false,
    },
    onSetColor: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    handleAddColor: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const { DeleteIcon, AddIcon } = useGlobalIcon({ DeleteIcon: TdDeleteIcon, AddIcon: TdAddIcon });
    const { STATUS } = useCommonClassName();
    const statusClassNames = STATUS.value;
    const visiblePopConfirm = ref<boolean>(false);
    const setVisiblePopConfirm = (visible: boolean) => {
      visiblePopConfirm.value = visible;
    };

    const handleClick = (color: string) => props.onSetColor(color);

    const isEqualCurrentColor = (color: string) => {
      return Color.compare(color, props.color.css);
    };

    const selectedColorIndex = computed(() => {
      return props.colors.findIndex(color => isEqualCurrentColor(color));
    });

    /**
     * 移除颜色
     */
    const handleRemoveColor = () => {
      const colors = [...props.colors];
      const selectedIndex = selectedColorIndex.value;
      if (selectedIndex > -1) {
        colors.splice(selectedIndex, 1);
      } else {
        colors.length = 0;
      }
      props.onChange(colors);
      setVisiblePopConfirm(false);
    };

    return {
      baseClassName,
      DeleteIcon,
      AddIcon,
      statusClassNames,
      selectedColorIndex,
      visiblePopConfirm,
      setVisiblePopConfirm,
      handleClick,
      isEqualCurrentColor,
      handleRemoveColor,
    };
  },
  render() {
    const { baseClassName, DeleteIcon, AddIcon, statusClassNames, title, editable } = this;
    const swatchesClass = `${baseClassName}__swatches`;

    const renderActions = () => {
      if (!editable) {
        return null;
      }

      return (
        <div class={`${swatchesClass}--actions`}>
          <span role="button" class={`${baseClassName}__icon`} onClick={() => this.handleAddColor()}>
            <AddIcon />
          </span>
          {this.colors.length > 0
            ? (
              <span role="button" class={`${baseClassName}__icon`} onClick={() => this.handleRemoveColor()}>
                <DeleteIcon />
              </span>
              )
            : null}
        </div>
      );
    };

    return (
      <div class={swatchesClass}>
        <h3 class={`${swatchesClass}--title`}>
          <span>{title}</span>
          {renderActions()}
        </h3>
        <ul class={[`${swatchesClass}--items`, 'narrow-scrollbar']}>
          {this.colors.map((color) => {
            return (
              <li
                class={[
                  `${swatchesClass}--item`,
                  this.isEqualCurrentColor(color) && editable ? statusClassNames.active : '',
                ]}
                title={color}
                key={color}
                onClick={() => {
                  if (this.disabled) {
                    return;
                  }
                  this.handleClick(color);
                }}
              >
                <div class={[`${swatchesClass}--color`, `${baseClassName}--bg-alpha`]}>
                  <span
                    class={`${swatchesClass}--inner`}
                    style={{
                      background: color,
                    }}
                  >
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});
