import { defineComponent, ref, toRefs, watch, computed } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimeIcon } from 'tdesign-icons-vue-next';

import { RangeInputPopup, RangeInputPosition } from '../range-input';
import TPopup from '../popup';
import TimePickerPanel from './panel/time-picker-panel';
import TInput from '../input';

import { TIME_PICKER_EMPTY } from '../_common/js/time-picker/const';
import { formatInputValue, validateInputValue } from '../_common/js/time-picker/utils';

// interfaces
import props from './time-range-picker-props';
import { TimeRangeValue, TimeRangePickerPartial } from './interface';

// hooks
import useVModel from '../hooks/useVModel';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useFormDisabled } from '../form/hooks';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TTimeRangePicker',

  components: {
    TimePickerPanel,
    TimeIcon,
    TPopup,
    TInput,
    RangeInputPopup,
  },
  props: { ...props, rangeInputProps: Object, popupProps: Object },

  setup(props) {
    const componentName = usePrefixClass('time-picker');
    const { global } = useConfig('timePicker');
    const { classPrefix } = useConfig('classPrefix');

    const disabled = useFormDisabled();
    const currentPanelIdx = ref(undefined);
    const currentValue = ref<Array<string>>(TIME_PICKER_EMPTY);
    const isShowPanel = ref(false);

    const inputClasses = computed(() => [
      `${componentName.value}__group`,
      {
        [`${classPrefix.value}-is-focused`]: isShowPanel.value,
      },
    ]);
    const { value, modelValue, allowInput, format } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange as any);

    const handleShowPopup = (visible: boolean, context: any) => {
      // 输入框点击不关闭面板
      if (context.trigger === 'trigger-element-click') {
        isShowPanel.value = true;
        return;
      }
      isShowPanel.value = visible;
    };

    const handleClear = (context: { e: MouseEvent }) => {
      const { e } = context;
      e.stopPropagation();
      currentValue.value = TIME_PICKER_EMPTY;
      setInnerValue(null);
    };

    const handleClick = ({ position }: { position: 'first' | 'second' }) => {
      currentPanelIdx.value = position === 'first' ? 0 : 1;
    };

    const handleTimeChange = (newValue: string) => {
      if (currentPanelIdx.value === 0) {
        currentValue.value = [newValue, currentValue.value[1] ?? newValue];
      } else {
        currentValue.value = [currentValue.value[0] ?? newValue, newValue];
      }
    };

    const handleInputBlur = (value: TimeRangeValue, { e }: { e: FocusEvent }) => {
      if (allowInput.value) {
        const isValidTime = validateInputValue(currentValue.value[currentPanelIdx.value], format.value);
        if (isValidTime) {
          const formattedVal = formatInputValue(currentValue.value[currentPanelIdx.value], format.value);
          currentPanelIdx.value === 0
            ? (currentValue.value = [formattedVal, currentValue.value[1] ?? formattedVal])
            : (currentValue.value = [currentValue.value[0] ?? formattedVal, formattedVal]);
        }
      }
      props.onBlur?.({ value, e });
    };

    const handleInputChange = (
      inputVal: TimeRangeValue,
      { e, position }: { e: InputEvent; position: RangeInputPosition },
    ) => {
      currentValue.value = inputVal;
      props.onInput?.({ value: innerValue.value, e, position: position === 'first' ? 'start' : 'end' });
    };

    const handleClickConfirm = () => {
      const isValidTime = !currentValue.value.find((v) => !validateInputValue(v, format.value));
      if (isValidTime) setInnerValue(currentValue.value);
      isShowPanel.value = false;
    };

    const handleFocus = (value: TimeRangeValue, { e, position }: { e: FocusEvent; position: RangeInputPosition }) => {
      props.onFocus?.({ value, e, position: position === 'first' ? 'start' : 'end' });
    };

    watch(
      () => isShowPanel.value,
      () => {
        currentValue.value = isShowPanel.value ? innerValue.value ?? TIME_PICKER_EMPTY : TIME_PICKER_EMPTY;
        if (!isShowPanel.value) currentPanelIdx.value = undefined;
      },
    );

    return () => (
      <div className={componentName}>
        <range-input-popup
          disabled={disabled.value}
          popupVisible={isShowPanel.value}
          popupProps={{
            overlayStyle: {
              width: 'auto',
            },
            onVisibleChange: handleShowPopup,
            ...props.popupProps,
          }}
          onInputChange={handleInputChange}
          inputValue={isShowPanel.value ? currentValue.value : innerValue.value ?? TIME_PICKER_EMPTY}
          rangeInputProps={{
            size: props.size,
            clearable: props.clearable,
            class: inputClasses.value,
            value: isShowPanel.value ? currentValue.value : innerValue.value ?? undefined,
            placeholder: props.placeholder || [global.value.placeholder, global.value.placeholder],
            suffixIcon: () => <TimeIcon />,
            onClear: handleClear,
            onClick: handleClick,
            onFocus: handleFocus,
            onBlur: handleInputBlur,
            readonly: !allowInput.value,
            activeIndex: currentPanelIdx.value,
            ...props.rangeInputProps,
          }}
          panel={() => (
            <TimePickerPanel
              steps={props.steps}
              format={format.value}
              disableTime={props.disableTime}
              hideDisabledTime={props.hideDisabledTime}
              isFooterDisplay={true}
              value={currentValue.value[currentPanelIdx.value || 0]}
              onChange={handleTimeChange}
              handleConfirmClick={handleClickConfirm}
              position={currentPanelIdx.value === 0 ? 'start' : 'end'}
            />
          )}
        />
      </div>
    );
  },
});
