import { computed, defineComponent, PropType } from 'vue';
import { DeleteIcon } from 'tdesign-icons-vue-next';
import { Select as TSelect, Option as TOption } from '../../select';
import Color from '../utils/color';
import { useBaseClassName } from '../hooks';
import { useCommonClassName, useConfig } from '../../config-provider';
import baseProps from './base-props';
import { Popconfirm as TPopconfim } from '../../popconfirm';

export default defineComponent({
  name: 'SwatchesPanel',
  components: {
    TSelect,
    TOption,
    TPopconfim,
  },
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
    removable: {
      type: Boolean,
      default: false,
    },
    onSetColor: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  setup(props) {
    const baseClassName = useBaseClassName();
    const { t, global } = useConfig('colorPicker');
    const { STATUS } = useCommonClassName();
    const statusClassNames = STATUS.value;

    const handleClick = (color: string) => props.onSetColor(color);

    const isEqualCurrentColor = (color: string) => {
      return Color.compare(color, props.color.css);
    };

    const selectedColorIndex = computed(() => {
      return props.colors.findIndex((color) => {
        return Color.compare(color, props.color.css);
      });
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
    };

    return {
      t,
      global,
      baseClassName,
      statusClassNames,
      selectedColorIndex,
      handleClick,
      isEqualCurrentColor,
      handleRemoveColor,
    };
  },
  render() {
    const { baseClassName, statusClassNames, t, global, title, removable } = this;
    const swatchesClass = `${baseClassName}__swatches`;
    const renderRemoveBtn = () => {
      if (!removable) {
        return null;
      }
      if (this.selectedColorIndex === -1) {
        return (
          <t-popconfirm theme="warning" content={t(global.clearConfirmText)} onConfirm={this.handleRemoveColor}>
            <span role="button" class={`${baseClassName}__icon`}>
              <DeleteIcon />
            </span>
          </t-popconfirm>
        );
      }
      return (
        <span role="button" class={`${baseClassName}__icon`} onClick={this.handleRemoveColor}>
          <DeleteIcon />
        </span>
      );
    };

    return (
      <div class={swatchesClass}>
        <h3 class={`${swatchesClass}--title`}>
          <span>{title}</span>
          {renderRemoveBtn()}
        </h3>
        <ul class={[`${swatchesClass}--items`, 'narrow-scrollbar']}>
          {this.colors.map((color) => {
            return (
              <li
                class={[
                  `${swatchesClass}--item`,
                  this.isEqualCurrentColor(color) && removable ? statusClassNames.active : '',
                ]}
                key={color}
                onClick={() => {
                  if (this.disabled) {
                    return;
                  }
                  this.handleClick(color);
                }}
              >
                <div class={[`${swatchesClass}--item__color`, `${baseClassName}--bg-alpha`]}>
                  <span
                    class={`${swatchesClass}--item__inner`}
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
  },
});
