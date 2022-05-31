import { defineComponent } from 'vue';
import Popup from '../popup';
import { usePrefixClass } from '../hooks/useConfig';
import RangeInput from './range-input';
import props from './range-input-popup-props';
import useOverlayStyle from '../select-input/useOverlayStyle';

export default defineComponent({
  name: 'TRangeInputPopup',
  props,

  setup(props, { slots, expose }) {
    const COMPONENT_NAME = usePrefixClass('range-input-popup');

    const { tOverlayStyle, innerPopupVisible, onInnerPopupVisibleChange } = useOverlayStyle(props);

    const popupClasses = [
      COMPONENT_NAME,
      {
        [`${COMPONENT_NAME}--visible`]: props.popupVisible || innerPopupVisible.value,
      },
    ];

    return () => (
      <div class={COMPONENT_NAME}>
        <Popup
          hideEmptyPopup
          content={props.panel}
          trigger="click"
          placement="bottom-left"
          visible={props.popupVisible || innerPopupVisible.value}
          onVisibleChange={onInnerPopupVisibleChange}
          {...props.popupProps}
          overlayStyle={tOverlayStyle.value}
          class={popupClasses}
        >
          <RangeInput value={props.inputValue} onChange={props.onInputChange} {...props.rangeInputProps} />
        </Popup>
      </div>
    );
  },
});
