import { computed, defineComponent, PropType, ref } from 'vue';
import { DeleteIcon, ErrorCircleFilledIcon, AddIcon } from 'tdesign-icons-vue-next';
import { Select as TSelect, Option as TOption } from '../../select';
import { Color } from '../utils';
import { useBaseClassName } from '../hooks';
import { useCommonClassName, useConfig, usePrefixClass } from '../../hooks/useConfig';
import baseProps from './base-props';
import { Button as TButton, TdButtonProps } from '../../button';

export default defineComponent({
  name: 'SwatchesPanel',
  components: {
    TSelect,
    TOption,
    TButton,
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
    const { t, global } = useConfig('colorPicker');
    const { global: confirmGlobal } = useConfig('popconfirm');
    const classPrefix = usePrefixClass();
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
      t,
      global,
      confirmGlobal,
      classPrefix,
      baseClassName,
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
    const {
      baseClassName,
      statusClassNames,
      classPrefix,
      visiblePopConfirm,
      t,
      global,
      confirmGlobal,
      title,
      editable,
    } = this;
    const swatchesClass = `${baseClassName}__swatches`;
    const popupBaseClassName = `${classPrefix}-popup`;
    const popConfirmBaseClassName = `${classPrefix}-popconfirm`;

    // 该方法暂时不用，后面交互讨论后再定
    const renderConfirm = () => {
      return (
        <div
          class={popupBaseClassName}
          style={{ display: visiblePopConfirm ? '' : 'none' }}
          role="tooltip"
          aria-hidden="false"
          data-popper-placement="top"
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
          }}
        >
          <div
            class={[`${popupBaseClassName}__content`, `${popupBaseClassName}content--arrow`, popConfirmBaseClassName]}
          >
            <div class={`${popConfirmBaseClassName}__content`}>
              <div class={`${popConfirmBaseClassName}__body`}>
                <ErrorCircleFilledIcon class={`${popConfirmBaseClassName}__icon--warning`} />
                <div class={`${popConfirmBaseClassName}__inner`}>{t(global.clearConfirmText)}</div>
              </div>
              <div class={`${popConfirmBaseClassName}__buttons`}>
                <t-button
                  size="small"
                  content={t((confirmGlobal.cancel as TdButtonProps).content)}
                  theme="default"
                  class={`${popConfirmBaseClassName}__cancel`}
                  onClick={() => this.setVisiblePopConfirm(false)}
                />
                <t-button
                  content={t((confirmGlobal.confirm as TdButtonProps).content)}
                  size="small"
                  theme="primary"
                  class={`${popConfirmBaseClassName}__confirm`}
                  onClick={() => this.handleRemoveColor()}
                />
              </div>
            </div>
            <div class={`${popupBaseClassName}__arrow`}></div>
          </div>
        </div>
      );
    };

    const renderActions = () => {
      if (!editable) {
        return null;
      }
      // if (this.selectedColorIndex === -1) {
      //   return (
      //     <div
      //       role="button"
      //       class={[`${baseClassName}__icon`, `${swatchesClass}--remove`]}
      //       onClick={() => {
      //         this.setVisiblePopConfirm(!visiblePopConfirm);
      //       }}
      //     >
      //       <DeleteIcon />
      //       {renderConfirm()}
      //     </div>
      //   );
      // }
      return (
        <div class={`${swatchesClass}--actions`}>
          <span role="button" class={`${baseClassName}__icon`} onClick={() => this.handleAddColor()}>
            <AddIcon />
          </span>
          {this.colors.length > 0 ? (
            <span role="button" class={`${baseClassName}__icon`} onClick={() => this.handleRemoveColor()}>
              <DeleteIcon />
            </span>
          ) : null}
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
