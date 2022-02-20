import { computed, defineComponent, ref, SetupContext, toRefs } from 'vue';
import Popup from '../popup';
import { prefix } from '../config';
import props from './props';
import useSingle from './useSingle';
import useMultiple from './useMultiple';
import useOverlayStyle from './useOverlayStyle';
import { TdSelectInputProps } from './type';
import { renderTNodeJSX } from '../utils/render-tnode';

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
    const visibleProps = { visible: this.popupVisible ?? this.innerPopupVisible };
    // 单选，值的呈现方式
    const singleValueDisplay = !this.multiple ? renderTNodeJSX(this, 'valueDisplay') : null;
    // 左侧文本
    const label = renderTNodeJSX(this, 'label');
    const prefixContent = [singleValueDisplay, label].filter((v) => v);
    return (
      <Popup
        ref="selectInputRef"
        class={this.popupClasses}
        trigger={this.popupProps?.trigger || 'click'}
        placement="bottom-left"
        content={this.panel}
        v-slots={{ ...this.$slots, content: this.$slots.panel }}
        overlayStyle={this.tOverlayStyle}
        hideEmptyPopup={true}
        onVisibleChange={this.onInnerPopupVisibleChange}
        {...visibleProps}
        {...this.popupProps}
      >
        {this.multiple
          ? this.renderSelectMultiple({
              commonInputProps: this.commonInputProps,
              onInnerClear: this.onInnerClear,
            })
          : this.renderSelectSingle({
              prefixContent,
              singleValueDisplay,
            })}
      </Popup>
    );
  },
});
