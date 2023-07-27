import { computed, defineComponent, ref, SetupContext, toRefs } from 'vue';
import Popup from '../popup';
import props from './props';
import { TdSelectInputProps } from './type';
import useSingle from './useSingle';
import useMultiple from './useMultiple';
import useOverlayInnerStyle from './useOverlayInnerStyle';
import { usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks';

const useComponentClassName = () => {
  return {
    NAME_CLASS: usePrefixClass('select-input'),
    BASE_CLASS_BORDERLESS: usePrefixClass('select-input--borderless'),
    BASE_CLASS_MULTIPLE: usePrefixClass('select-input--multiple'),
    BASE_CLASS_POPUP_VISIBLE: usePrefixClass('select-input--popup-visible'),
    BASE_CLASS_EMPTY: usePrefixClass('select-input--empty'),
  };
};

export default defineComponent({
  name: 'TSelectInput',

  props: { ...props },

  setup(props: TdSelectInputProps, context: SetupContext) {
    const { NAME_CLASS, BASE_CLASS_BORDERLESS, BASE_CLASS_MULTIPLE, BASE_CLASS_POPUP_VISIBLE, BASE_CLASS_EMPTY } =
      useComponentClassName();
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();

    const selectInputRef = ref();
    const popupRef = ref();
    const { multiple, value, popupVisible, borderless } = toRefs(props);
    const { commonInputProps, onInnerClear, renderSelectSingle } = useSingle(props, context);
    const { renderSelectMultiple } = useMultiple(props, context);
    const { tOverlayInnerStyle, innerPopupVisible, onInnerPopupVisibleChange } = useOverlayInnerStyle(props);

    const classes = computed(() => [
      `${NAME_CLASS.value}`,
      {
        [BASE_CLASS_MULTIPLE.value]: multiple.value,
        [BASE_CLASS_BORDERLESS.value]: borderless.value,
        [BASE_CLASS_POPUP_VISIBLE.value]: popupVisible.value ?? innerPopupVisible.value,
        [BASE_CLASS_EMPTY.value]: value.value instanceof Array ? !value.value.length : !value.value,
      },
    ]);

    return {
      classPrefix,
      NAME_CLASS,
      innerPopupVisible,
      commonInputProps,
      tOverlayInnerStyle,
      selectInputRef,
      popupRef,
      classes,
      onInnerClear,
      renderTNodeJSX,
      renderSelectSingle,
      renderSelectMultiple,
      onInnerPopupVisibleChange,
    };
  },

  render() {
    // 浮层显示的受控与非受控
    const visibleProps = { visible: this.popupVisible ?? this.innerPopupVisible };

    const mainContent = (
      <Popup
        ref="popupRef"
        trigger={(this.popupProps as TdSelectInputProps['popupProps'])?.trigger || 'click'}
        placement="bottom-left"
        {...visibleProps}
        content={this.panel}
        v-slots={{ ...this.$slots, content: this.$slots.panel }}
        hideEmptyPopup={true}
        {...{
          onVisibleChange: this.onInnerPopupVisibleChange,
          ...(this.popupProps as TdSelectInputProps['popupProps']),
          overlayInnerStyle: this.tOverlayInnerStyle,
        }}
      >
        {this.multiple
          ? this.renderSelectMultiple({
              commonInputProps: this.commonInputProps,
              onInnerClear: this.onInnerClear,
              popupVisible: visibleProps.visible,
              allowInput: this.allowInput,
            })
          : this.renderSelectSingle(visibleProps.visible)}
      </Popup>
    );

    const tipsNode = this.renderTNodeJSX('tips');

    const tipsClasses = [
      `${this.classPrefix}-input__tips`,
      `${this.classPrefix}-tips`,
      `${this.classPrefix}-is-${this.status}`,
    ];

    return (
      <div ref="selectInputRef" class={this.classes}>
        {mainContent}
        {tipsNode && <div class={tipsClasses}>{tipsNode}</div>}
      </div>
    );
  },
});
