import { defineComponent, computed } from '@td/adapter-vue';
import Popup from '../popup';
import { usePrefixClass } from '@td/adapter-hooks';
import RangeInput from './range-input';
import props from '@td/intel/range-input/range-input-popup-props';
import useOverlayInnerStyle from '../select-input/useOverlayInnerStyle';
import { TdRangeInputPopupProps } from '@td/intel/range-input/type';

export default defineComponent({
  name: 'TRangeInputPopup',
  props,

  setup(props: TdRangeInputPopupProps) {
    const COMPONENT_NAME = usePrefixClass('range-input-popup');

    const { tOverlayInnerStyle, innerPopupVisible, onInnerPopupVisibleChange } = useOverlayInnerStyle(props);

    const popupClasses = computed(() => [
      COMPONENT_NAME.value,
      {
        [`${COMPONENT_NAME.value}--visible`]: props.popupVisible || innerPopupVisible.value,
      },
    ]);

    return () => (
      <div class={popupClasses.value}>
        <Popup
          hideEmptyPopup
          content={props.panel}
          trigger="click"
          placement="bottom-left"
          disabled={props.disabled}
          visible={props.popupVisible || innerPopupVisible.value}
          {...{
            overlayInnerStyle: tOverlayInnerStyle.value,
            onVisibleChange: onInnerPopupVisibleChange,
            ...props.popupProps,
          }}
        >
          <RangeInput
            {...{
              value: props.inputValue,
              onChange: props.onInputChange,
              disabled: props.disabled,
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
