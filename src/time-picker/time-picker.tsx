import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimeIcon } from 'tdesign-icons-vue-next';

import TPopup, { PopupVisibleChangeContext } from '../popup';
import { formatInputValue, validateInputValue } from '../_common/js/time-picker/utils';
import TimePickerPanel from './panel/index';
import TSelectInput from '../select-input';
import useVModel from '../hooks/useVModel';

import props from './props';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TTimePicker',
  components: { TSelectInput, TimePickerPanel, TimeIcon, TPopup },

  props: { ...props },

  setup(props) {
    const currentValue = ref('');
    const isShowPanel = ref(false);

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
      visible ? props.onOpen(context) : props.onClose(context); // trigger on-open and on-close
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

    const handleInputBlur = (value: string, { e }: { e: FocusEvent }) => {
      if (allowInput) {
        const isValidTime = validateInputValue(currentValue.value, format.value);
        if (isValidTime) {
          setInnerValue(formatInputValue(currentValue.value, format.value));
        }
      }
      props.onBlur({ value, e });
    };

    const handleClickConfirm = () => {
      const isValidTime = validateInputValue(currentValue.value, format.value);
      if (isValidTime) setInnerValue(currentValue.value);
      isShowPanel.value = false;
    };

    watch(
      () => isShowPanel.value,
      () => {
        currentValue.value = isShowPanel.value ? innerValue.value ?? '' : '';
      },
    );

    return () => (
      <div>
        <t-select-input
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
          placeholder={!innerValue ? props.placeholder : undefined}
          value={isShowPanel.value ? currentValue.value : innerValue.value ?? undefined}
          inputValue={isShowPanel.value ? currentValue.value : innerValue.value ?? undefined}
          inputProps={props.inputProps}
          popupProps={{ overlayStyle: { width: 'auto' }, ...(props.popupProps as object) }}
          panel={() => (
            <TimePickerPanel
              steps={props.steps}
              format={format.value}
              value={currentValue.value}
              isFooterDisplay={true}
              disableTime={props.disableTime}
              onChange={(v: string) => (currentValue.value = v)}
              hideDisabledTime={props.hideDisabledTime}
              handleConfirmClick={handleClickConfirm}
            />
          )}
        />
      </div>
    );
  },
});
