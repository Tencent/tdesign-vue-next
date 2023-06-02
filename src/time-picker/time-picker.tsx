import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimeIcon as TdTimeIcon } from 'tdesign-icons-vue-next';

import TimePickerPanel from './panel/time-picker-panel';
import TSelectInput, { TdSelectInputProps } from '../select-input';
import { formatInputValue, validateInputValue } from '../_common/js/time-picker/utils';

import type { InputProps } from '../input';

import props from './props';

// hooks
import useVModel from '../hooks/useVModel';
import { useFormDisabled } from '../form/hooks';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useGlobalIcon } from '../hooks/useGlobalIcon';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TTimePicker',

  props: { ...props },

  setup(props) {
    const currentValue = ref('');
    const isShowPanel = ref(false);
    const { globalConfig } = useConfig('timePicker');
    const { TimeIcon } = useGlobalIcon({ TimeIcon: TdTimeIcon });
    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const disabled = useFormDisabled();
    const { allowInput, format } = toRefs(props);
    const { classPrefix } = useConfig('classPrefix');

    const componentName = usePrefixClass('time-picker');

    const inputClasses = computed(() => [
      `${componentName.value}__group`,
      {
        [`${classPrefix.value}-is-focused`]: isShowPanel.value,
      },
    ]);

    const handleShowPopup = (visible: boolean, context: { e: MouseEvent }) => {
      isShowPanel.value = visible;
      visible ? props.onOpen?.(context) : props.onClose?.(context); // trigger on-open and on-close
    };

    const handleClear = (context: { e: MouseEvent }) => {
      const { e } = context;
      e.stopPropagation();
      currentValue.value = null;
      setInnerValue(null);
    };

    const handleInputChange = (value: string) => {
      currentValue.value = value;
    };

    const handleInputBlur: TdSelectInputProps['onBlur'] = (value, { e }) => {
      if (allowInput.value) {
        const isValidTime = validateInputValue(currentValue.value, format.value);
        if (isValidTime) {
          setInnerValue(formatInputValue(currentValue.value, format.value));
        }
      }
      props.onBlur?.({ value: String(value), e: e as FocusEvent });
    };

    const handleClickConfirm = () => {
      const isValidTime = validateInputValue(currentValue.value, format.value);
      if (isValidTime) setInnerValue(currentValue.value);
      isShowPanel.value = false;
    };

    const handlePanelChange = (v: string, e: MouseEvent) => {
      currentValue.value = v;
      props.onPick?.(v, { e });
    };

    watch(
      () => isShowPanel.value,
      () => {
        currentValue.value = isShowPanel.value ? innerValue.value ?? '' : '';
      },
    );

    return () => (
      <div class={componentName.value}>
        <TSelectInput
          onFocus={props.onFocus}
          onClear={handleClear}
          disabled={disabled.value}
          clearable={props.clearable}
          allowInput={allowInput.value}
          className={inputClasses.value}
          suffixIcon={() => <TimeIcon />}
          popupVisible={isShowPanel.value}
          onInputChange={handleInputChange}
          onBlur={handleInputBlur}
          onPopupVisibleChange={handleShowPopup}
          placeholder={!innerValue.value ? props.placeholder || globalConfig.value.placeholder : undefined}
          value={isShowPanel.value ? currentValue.value : innerValue.value ?? undefined}
          inputValue={isShowPanel.value ? currentValue.value : innerValue.value ?? undefined}
          inputProps={{ ...(props.inputProps as InputProps), size: props.size }}
          popupProps={{ overlayInnerStyle: { width: 'auto', padding: 0 }, ...(props.popupProps as object) }}
          status={props.status}
          tips={props.tips}
          panel={() => (
            <TimePickerPanel
              steps={props.steps}
              format={format.value}
              value={currentValue.value}
              isFooterDisplay={true}
              isShowPanel={isShowPanel.value}
              disableTime={props.disableTime}
              onChange={handlePanelChange}
              hideDisabledTime={props.hideDisabledTime}
              handleConfirmClick={handleClickConfirm}
            />
          )}
        />
      </div>
    );
  },
});
