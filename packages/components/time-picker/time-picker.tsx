import { computed, ComputedRef, defineComponent, ref, toRefs, watch } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TimeIcon as TdTimeIcon } from 'tdesign-icons-vue-next';

import TimePickerPanel from './panel/time-picker-panel';
import TSelectInput, { SelectInputBlurContext } from '../select-input';
import { formatInputValue, validateInputValue } from '@tdesign/common-js/time-picker/utils';
// hooks
import {
  useVModel,
  useConfig,
  useTNodeJSX,
  useDisabled,
  useReadonly,
  useGlobalIcon,
  usePrefixClass,
  useCommonClassName,
  useEventForward,
} from '@tdesign/shared-hooks';
import type { InputProps } from '../input';

import props from './props';

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

    const { value, modelValue, onChange: onChangeRef } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, onChangeRef);

    const isDisabled = useDisabled() as ComputedRef<boolean>;
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

    /**
     * disableTime 返回被禁用的 hour/minute/second 列表，
     * 面板里点选时会过滤掉，手动输入也必须走同一套判定，
     * 否则 allowInput 可以绕过禁用规则写入非法时间。
     */
    const isDisabledInputTime = (text: string) => {
      if (!props.disableTime || !text) return false;
      const parsed = dayjs(text, format.value);
      if (!parsed.isValid()) return false;
      const disabled = props.disableTime(parsed.hour(), parsed.minute(), parsed.second(), parsed.millisecond(), {
        partial: 'start',
      });
      if (!disabled) return false;
      return (
        !!disabled.hour?.includes(parsed.hour()) ||
        !!disabled.minute?.includes(parsed.minute()) ||
        !!disabled.second?.includes(parsed.second())
      );
    };

    const handleInputChange = (value: string) => {
      currentValue.value = value;
    };

    const handleInputBlur = (value: string, context: SelectInputBlurContext) => {
      if (allowInput.value) {
        const isValidTime = validateInputValue(currentValue.value, format.value);
        if (isValidTime && !isDisabledInputTime(currentValue.value)) {
          setInnerValue(formatInputValue(currentValue.value, format.value));
        }
      }
      props.onBlur?.({ value, inputValue: context.inputValue, e: context.e });
    };

    const handleClickConfirm = (e: MouseEvent) => {
      props?.onConfirm?.({ e });
      const isValidTime = validateInputValue(currentValue.value, format.value);
      if (isValidTime && !isDisabledInputTime(currentValue.value)) setInnerValue(currentValue.value);
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

    const selectEvents = useEventForward(props.selectInputProps as TdTimePickerProps['selectInputProps'], {
      onInputChange: handleInputChange,
      onBlur: handleInputBlur,
      onPopupVisibleChange: handleShowPopup,
    });

    return () => (
      <div class={COMPONENT_NAME.value}>
        <TSelectInput
          onFocus={props.onFocus}
          onClear={handleClear}
          borderless={props.borderless}
          disabled={isDisabled.value}
          clearable={props.clearable}
          allowInput={allowInput.value}
          class={inputClasses.value}
          label={props.label}
          prefixIcon={() => renderTNodeJSX('prefixIcon')}
          suffixIcon={() => renderTNodeJSX('suffixIcon') || <TimeIcon />}
          popupVisible={!isReadonly.value && isShowPanel.value}
          placeholder={!innerValue.value ? props.placeholder || globalConfig.value.placeholder : undefined}
          value={isShowPanel.value ? currentValue.value : innerValue.value ?? undefined}
          inputValue={isShowPanel.value ? currentValue.value : innerValue.value ?? undefined}
          inputProps={{ ...(props.inputProps as InputProps), size: props.size }}
          popupProps={{ overlayInnerStyle: { width: 'auto', padding: 0 }, ...(props.popupProps as object) }}
          status={props.status}
          tips={props.tips}
          valueDisplay={() => renderTNodeJSX('valueDisplay', { params: valueDisplayParams.value })}
          {...selectEvents.value}
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
