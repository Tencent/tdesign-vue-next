import { defineComponent, ref, toRefs, watch, computed } from 'vue';
import dayjs from 'dayjs';
import isArray from 'lodash/isArray';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimeIcon as TdTimeIcon } from 'tdesign-icons-vue-next';

import { RangeInputPopup, RangeInputPosition } from '../range-input';
import TimePickerPanel from './panel/time-picker-panel';

import { TIME_PICKER_EMPTY } from '../_common/js/time-picker/const';
import { formatInputValue, validateInputValue } from '../_common/js/time-picker/utils';

// interfaces
import props from './time-range-picker-props';
import { TimeRangeValue } from './interface';
import { TimeRangePickerPartial } from './type';
// hooks
import useVModel from '../hooks/useVModel';
import { useCommonClassName, useConfig, usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';
import { useDisabled } from '../hooks/useDisabled';
import { useReadonly } from '../hooks/useReadonly';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TTimeRangePicker',

  props: { ...props, rangeInputProps: Object, popupProps: Object },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('time-range-picker');
    const { globalConfig } = useConfig('timePicker');
    const { STATUS } = useCommonClassName();
    const { TimeIcon } = useGlobalIcon({ TimeIcon: TdTimeIcon });

    const disabled = useDisabled();
    const currentPanelIdx = ref(undefined);
    const currentValue = ref<Array<string>>(TIME_PICKER_EMPTY);
    const isShowPanel = ref(false);
    const isReadOnly = useReadonly();

    const inputClasses = computed(() => [
      `${COMPONENT_NAME.value}__group`,
      {
        [STATUS.value.focused]: isShowPanel.value,
      },
    ]);
    const { value, modelValue, allowInput, format } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange as any);

    const handleShowPopup = (visible: boolean, context: any) => {
      if (isReadOnly.value) return;
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

    const handleTimeChange = (newValue: string | string[], e: MouseEvent) => {
      if (isArray(newValue)) {
        currentValue.value = newValue;
      } else if (currentPanelIdx.value === 0) {
        currentValue.value = [newValue, currentValue.value[1] ?? newValue];
      } else {
        currentValue.value = [currentValue.value[0] ?? newValue, newValue];
      }
      handleOnPick(newValue, e);
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
      if (props.autoSwap) autoSwapTime();
      isShowPanel.value = false;
    };

    const handleFocus = (value: TimeRangeValue, { e, position }: { e: FocusEvent; position: RangeInputPosition }) => {
      props.onFocus?.({ value, e, position: position === 'first' ? 'start' : 'end' });
    };

    const autoSwapTime = () => {
      const [startTime, endTime] = currentValue.value;
      const startDayjs = dayjs(startTime, props.format);
      const endDayjs = dayjs(endTime, props.format);

      if (startDayjs.isAfter(endDayjs, 'second')) {
        setInnerValue([currentValue.value[1], currentValue.value[0]]);
      } else {
        setInnerValue([currentValue.value[0], currentValue.value[1]]);
      }
    };

    const handleOnPick = (pickValue: string | string[], e: MouseEvent) => {
      let pickedRangeValue = [];
      let context;
      if (isArray(pickValue)) {
        pickedRangeValue = pickValue;
        context = { e };
      } else if (currentPanelIdx.value === 0) {
        pickedRangeValue = [pickValue, currentValue.value[1] ?? pickValue];
        context = { e, position: 'start' as TimeRangePickerPartial };
      } else {
        pickedRangeValue = [currentValue.value[0] ?? pickValue, pickValue];
        context = { e, position: 'end' as TimeRangePickerPartial };
      }
      props.onPick?.(pickedRangeValue, context);
    };

    watch(
      () => isShowPanel.value,
      () => {
        currentValue.value = isShowPanel.value ? innerValue.value ?? TIME_PICKER_EMPTY : TIME_PICKER_EMPTY;
        if (!isShowPanel.value) currentPanelIdx.value = undefined;
      },
    );

    return () => (
      <div class={COMPONENT_NAME.value}>
        <RangeInputPopup
          disabled={disabled.value}
          popupVisible={isShowPanel.value}
          popupProps={{
            overlayInnerStyle: {
              width: 'auto',
              padding: 0,
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
            placeholder: props.placeholder || [globalConfig.value.placeholder, globalConfig.value.placeholder],
            borderless: props.borderless,
            suffixIcon: () => <TimeIcon />,
            onClear: handleClear,
            onClick: handleClick,
            onFocus: handleFocus,
            onBlur: handleInputBlur,
            readonly: props.readonly || !allowInput.value,
            activeIndex: currentPanelIdx.value,
            ...props.rangeInputProps,
          }}
          label={props.label}
          status={props.status}
          tips={props.tips}
          panel={() => (
            <TimePickerPanel
              steps={props.steps}
              format={format.value}
              isShowPanel={isShowPanel.value}
              disableTime={props.disableTime}
              hideDisabledTime={props.hideDisabledTime}
              isFooterDisplay={true}
              value={currentValue.value[currentPanelIdx.value || 0]}
              onChange={handleTimeChange}
              onPick={handleOnPick}
              handleConfirmClick={handleClickConfirm}
              position={currentPanelIdx.value === 0 ? 'start' : 'end'}
              activeIndex={currentPanelIdx.value}
              presets={props.presets}
            />
          )}
        />
      </div>
    );
  },
});
