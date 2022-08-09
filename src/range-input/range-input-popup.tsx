import { defineComponent, computed } from 'vue';
import Popup from '../popup';
import { usePrefixClass } from '../hooks/useConfig';
import RangeInput from './range-input';
import props from './range-input-popup-props';
import useOverlayStyle from '../select-input/useOverlayStyle';
import { TdRangeInputPopupProps } from './type';

export default defineComponent({
  name: 'TRangeInputPopup',
  props,

  setup(props: TdRangeInputPopupProps) {
    const COMPONENT_NAME = usePrefixClass('range-input-popup');

    const { tOverlayStyle, innerPopupVisible, onInnerPopupVisibleChange } = useOverlayStyle(props);

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
            overlayStyle: tOverlayStyle.value,
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
