import { computed, defineComponent, PropType, ref } from 'vue';
import { DeleteIcon as TdDeleteIcon, AddIcon as TdAddIcon } from 'tdesign-icons-vue-next';

import { Color } from '../../utils';
import { useBaseClassName } from '../../hooks';
import { useCommonClassName } from '../../../hooks/useConfig';
import { useGlobalIcon } from '../../../hooks/useGlobalIcon';
import baseProps from './base-props';

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
      return props.colors.findIndex((color) => isEqualCurrentColor(color));
    });

    /**
     * 移除颜色
     */
    const handleRemoveColor = () => {
      const { colors } = props;
      const selectedIndex = selectedColorIndex.value;
      if (selectedIndex === -1) return;
      colors.splice(selectedIndex, 1);
      props.onChange(colors);
      setVisiblePopConfirm(false);
    };

    return () => {
      const swatchesClass = `${baseClassName.value}__swatches`;

      const renderActions = () => {
        if (!props.editable) {
          return null;
        }

        return (
          <div class={`${swatchesClass}--actions`}>
            <span role="button" class={`${baseClassName.value}__icon`} onClick={() => props.handleAddColor()}>
              <AddIcon />
            </span>
            {props.colors.length > 0 ? (
              <span role="button" class={`${baseClassName.value}__icon`} onClick={() => handleRemoveColor()}>
                <DeleteIcon />
              </span>
            ) : null}
          </div>
        );
      };

      return (
        <div class={swatchesClass}>
          <h3 class={`${swatchesClass}--title`}>
            <span>{props.title}</span>
            {renderActions()}
          </h3>
          <ul class={[`${swatchesClass}--items`, 'narrow-scrollbar']}>
            {props.colors.map((color) => {
              return (
                <li
                  class={[
                    `${swatchesClass}--item`,
                    isEqualCurrentColor(color) && props.editable ? statusClassNames.active : '',
                  ]}
                  title={color}
                  key={color}
                  onClick={() => {
                    if (props.disabled) {
                      return;
                    }
                    handleClick(color);
                  }}
                >
                  <div class={[`${swatchesClass}--color`, `${baseClassName.value}--bg-alpha`]}>
                    <span
                      class={`${swatchesClass}--inner`}
                      style={{
                        background: color,
                      }}
                    ></span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    };
  },
});
