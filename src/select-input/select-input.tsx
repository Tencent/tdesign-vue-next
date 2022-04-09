import { computed, defineComponent, ref, SetupContext, toRefs } from 'vue';
import Popup from '../popup';
import props from './props';
import { TdSelectInputProps } from './type';

import useSingle from './useSingle';
import useMultiple from './useMultiple';
import useOverlayStyle from './useOverlayStyle';
import { usePrefixClass } from '../hooks/useConfig';

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

    const selectInputRef = ref();
    const selectInputWrapRef = ref();
    const { multiple, value, popupVisible, borderless } = toRefs(props);
    const { commonInputProps, onInnerClear, renderSelectSingle } = useSingle(props, context);
    const { renderSelectMultiple } = useMultiple(props, context);
    const { tOverlayStyle, innerPopupVisible, onInnerPopupVisibleChange } = useOverlayStyle(props);

    const popupClasses = computed(() => [
      NAME_CLASS.value,
      {
        [BASE_CLASS_BORDERLESS.value]: borderless.value,
        [BASE_CLASS_MULTIPLE.value]: multiple.value,
        [BASE_CLASS_POPUP_VISIBLE.value]: popupVisible.value ?? innerPopupVisible.value,
        [BASE_CLASS_EMPTY.value]: value.value instanceof Array ? !value.value.length : !value.value,
      },
    ]);

    return {
      classPrefix,
      NAME_CLASS,
      selectInputWrapRef,
      innerPopupVisible,
      commonInputProps,
      tOverlayStyle,
      selectInputRef,
      popupClasses,
      onInnerClear,
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
        ref="selectInputRef"
        class={this.popupClasses}
        trigger={(this.popupProps as TdSelectInputProps['popupProps'])?.trigger || 'click'}
        placement="bottom-left"
        {...visibleProps}
        content={this.panel}
        v-slots={{ ...this.$slots, content: this.$slots.panel }}
        hideEmptyPopup={true}
        onVisibleChange={this.onInnerPopupVisibleChange}
        {...this.popupProps}
        overlayStyle={this.tOverlayStyle}
      >
        {this.multiple
          ? this.renderSelectMultiple({
              commonInputProps: this.commonInputProps,
              onInnerClear: this.onInnerClear,
              popupVisible: visibleProps.visible,
            })
          : this.renderSelectSingle(visibleProps.visible)}
      </Popup>
    );

    if (!this.tips) return mainContent;

    return (
      <div ref="selectInputWrapRef" class={`${this.NAME_CLASS}__wrap`}>
        {mainContent}
        <div class={`${this.classPrefix}-input__tips ${this.classPrefix}-input__tips--${this.status || 'normal'}`}>
          {this.tips}
        </div>
      </div>
    );
  },
});
