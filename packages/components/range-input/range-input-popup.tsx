import { defineComponent, computed } from 'vue';
import Popup from '../popup';
import { usePrefixClass } from '@tdesign/shared-hooks';
import RangeInput from './range-input';
import props from './range-input-popup-props';
import { useOverlayInnerStyle } from '../select-input/hooks/useOverlayInnerStyle';
import { TdRangeInputPopupProps } from './type';

export default defineComponent({
  name: 'TRangeInputPopup',
  props,
  setup(props: TdRangeInputPopupProps) {
    const COMPONENT_NAME = usePrefixClass('range-input-popup');
    const { tOverlayInnerStyle, innerPopupVisible, isPopupDisabled, onInnerPopupVisibleChange } =
      useOverlayInnerStyle(props);

    const visible = computed(
      () => !isPopupDisabled.value && (props.popupProps?.visible ?? (props.popupVisible || innerPopupVisible.value)),
    );

    const popupClasses = computed(() => [
      COMPONENT_NAME.value,
      {
        [`${COMPONENT_NAME.value}--visible`]: visible.value,
      },
    ]);

    return () => (
      <div class={popupClasses.value}>
        <Popup
          hideEmptyPopup
          content={props.panel}
          trigger="click"
          placement="bottom-left"
          {...{
            overlayInnerStyle: tOverlayInnerStyle.value,
            onVisibleChange: onInnerPopupVisibleChange,
            ...props.popupProps,
            visible: visible.value,
            disabled: isPopupDisabled.value || props.popupProps?.disabled,
          }}
        >
          <RangeInput
            {...{
              value: props.inputValue,
              onChange: props.onInputChange,
              disabled: props.disabled,
              label: props.label,
              status: props.status,
              tips: props.tips,
              ...props.rangeInputProps,
            }}
          />
        </Popup>
      </div>
    );
  },
});
