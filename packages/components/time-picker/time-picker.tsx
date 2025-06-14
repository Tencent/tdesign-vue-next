import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimeIcon as TdTimeIcon } from 'tdesign-icons-vue-next';

import TimePickerPanel from './panel/time-picker-panel';
import TSelectInput, { SelectInputBlurContext } from '../select-input';
import { formatInputValue, validateInputValue } from '@tdesign/common-js/time-picker/utils';
import {
  useVModel,
  useConfig,
  useTNodeJSX,
  useDisabled,
  useReadonly,
  useGlobalIcon,
  usePrefixClass,
  useCommonClassName,
} from '@tdesign/shared-hooks';
import type { InputProps } from '../input';

import props from './props';

// hooks

import { TdTimePickerProps } from './type';

dayjs.extend(customParseFormat);

export default defineComponent({
  name: 'TTimePicker',
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const { globalConfig } = useConfig('timePicker');
    const COMPONENT_NAME = usePrefixClass('time-picker');
    const { STATUS } = useCommonClassName();
    const { TimeIcon } = useGlobalIcon({ TimeIcon: TdTimeIcon });

    const currentValue = ref('');
    const isShowPanel = ref(false);
    const isReadonly = useReadonly();

    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const disabled = useDisabled();
    const { allowInput, format } = toRefs(props);

    const inputClasses = computed(() => [
      `${COMPONENT_NAME.value}__group`,
      {
        [STATUS.value.focused]: isShowPanel.value,
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
      props?.onClear?.(context);
    };

    const handleInputChange = (value: string) => {
      currentValue.value = value;
    };

    const handleInputBlur = (value: string, context: SelectInputBlurContext) => {
      if (allowInput.value) {
        const isValidTime = validateInputValue(currentValue.value, format.value);
        if (isValidTime) {
          setInnerValue(formatInputValue(currentValue.value, format.value));
        }
      }
      props.onBlur?.({ value, inputValue: context.inputValue, e: context.e });
    };

    const handleClickConfirm = (e: MouseEvent) => {
      props?.onConfirm?.({ e });
      const isValidTime = validateInputValue(currentValue.value, format.value);
      if (isValidTime) setInnerValue(currentValue.value);
      isShowPanel.value = false;
    };

    const handlePanelChange = (v: string, e: MouseEvent) => {
      currentValue.value = v;
      props.onPick?.(v, { e });
    };

    const valueDisplayParams = computed(() => {
      return {
        value: isShowPanel.value ? currentValue.value : innerValue.value ?? undefined,
      };
    });

    watch(
      () => isShowPanel.value,
      () => {
        currentValue.value = isShowPanel.value ? innerValue.value ?? '' : '';
      },
    );

    return () => (
      <div class={COMPONENT_NAME.value}>
        <TSelectInput
          onFocus={props.onFocus}
          onClear={handleClear}
          borderless={props.borderless}
          disabled={disabled.value}
          clearable={props.clearable}
          allowInput={allowInput.value}
          class={inputClasses.value}
          label={props.label}
          suffixIcon={() => <TimeIcon />}
          popupVisible={!isReadonly.value && isShowPanel.value}
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
          valueDisplay={() => renderTNodeJSX('valueDisplay', { params: valueDisplayParams.value })}
          {...(props.selectInputProps as TdTimePickerProps['selectInputProps'])}
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
              presets={props.presets}
            />
          )}
        />
      </div>
    );
  },
});
