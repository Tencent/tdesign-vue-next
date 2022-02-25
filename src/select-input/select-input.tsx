import { computed, defineComponent, ref, SetupContext, toRefs } from 'vue';
import Popup from '../popup';
import { prefix } from '../config';
import props from './props';
import useSingle from './useSingle';
import useMultiple from './useMultiple';
import useOverlayStyle from './useOverlayStyle';
import { TdSelectInputProps } from './type';

const NAME_CLASS = `${prefix}-select-input`;
const BASE_CLASS_BORDERLESS = `${prefix}-select-input--borderless`;
const BASE_CLASS_MULTIPLE = `${prefix}-select-input--multiple`;
const BASE_CLASS_POPUP_VISIBLE = `${prefix}-select-input--popup-visible`;
const BASE_CLASS_EMPTY = `${prefix}-select-input--empty`;

export default defineComponent({
  name: 'TSelectInput',

  props: { ...props },

  setup(props: TdSelectInputProps, context: SetupContext) {
    const selectInputRef = ref();
    const selectInputWrapRef = ref();
    const { multiple, value, popupVisible, popupProps, borderless } = toRefs(props);
    const { commonInputProps, onInnerClear, renderSelectSingle } = useSingle(props, context);
    const { renderSelectMultiple } = useMultiple(props, context);
    const { tOverlayStyle, innerPopupVisible, onInnerPopupVisibleChange } = useOverlayStyle(props);

    const popupClasses = computed(() => [
      NAME_CLASS,
      {
        [BASE_CLASS_BORDERLESS]: borderless.value,
        [BASE_CLASS_MULTIPLE]: multiple.value,
        [BASE_CLASS_POPUP_VISIBLE]: popupVisible.value ?? innerPopupVisible.value,
        [BASE_CLASS_EMPTY]: value.value instanceof Array ? !value.value.length : !value.value,
      },
    ]);

    return {
      selectInputWrapRef,
      innerPopupVisible,
      commonInputProps,
      tOverlayStyle,
      selectInputRef,
      popupClasses,
      popupProps,
      onInnerClear,
      renderSelectSingle,
      renderSelectMultiple,
      onInnerPopupVisibleChange,
    };
  },

  render() {
    // 浮层显示的受控与非受控

    const mainContent = (
      <Popup
        ref="selectInputRef"
        class={this.popupClasses}
        trigger={this.popupProps?.trigger || 'click'}
        placement="bottom-left"
        visible={this.popupVisible ?? this.innerPopupVisible}
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
            })
          : this.renderSelectSingle()}
      </Popup>
    );

    if (!this.tips) return mainContent;

    return (
      <div ref="selectInputWrapRef" class={`${prefix}-select-input__wrap`}>
        {mainContent}
        <div class={`${prefix}-input__tips ${prefix}-input__tips--${this.status || 'normal'}`}>{this.tips}</div>
      </div>
    );
  },
});
