import { ref, computed, watchEffect } from 'vue';
import { CalendarIcon } from 'tdesign-icons-vue-next';
import dayjs from 'dayjs';

import { usePrefixClass, useConfig } from '../../hooks/useConfig';
import { TdDatePickerProps, DateValue } from '../type';
import useFormat from './useFormat';
import useSingleValue from './useSingleValue';

export default function useSingle(props: TdDatePickerProps) {
  const COMPONENT_NAME = usePrefixClass('date-picker');
  const { global } = useConfig('datePicker');

  const inputRef = ref();

  const { value, onChange, time, month, year, cacheValue } = useSingleValue(props);

  const { isValidDate, formatDate, formatTime } = useFormat({
    value: value.value,
    mode: props.mode,
    format: props.format,
    valueType: props.valueType,
    enableTimePicker: props.enableTimePicker,
  });

  const popupVisible = ref(false);
  const isHoverCell = ref(false);
  // 未真正选中前可能不断变更输入框的内容
  const inputValue = ref(formatDate(value.value));

  // input 设置
  const inputProps = computed(() => ({
    ...props.inputProps,
    ref: inputRef,
    clearable: props.clearable,
    prefixIcon: props.prefixIcon,
    readonly: !props.allowInput,
    placeholder: props.placeholder || global.value.placeholder[props.mode],
    suffixIcon: props.suffixIcon || (() => <CalendarIcon />),
    class: [
      {
        [`${COMPONENT_NAME.value}__input--placeholder`]: isHoverCell.value,
      },
    ],
    onClear: (context: { e: InputEvent }) => {
      context?.e?.stopPropagation();
      popupVisible.value = false;
      onChange?.('', { dayjsValue: dayjs(''), trigger: 'clear' });
    },
    onBlur: (val: string, context: { e: FocusEvent }) => {
      props.onBlur?.({ value: val, e: context.e });
    },
    onFocus: (_: string, { e }: { e: FocusEvent }) => {
      props.onFocus?.({ value: value.value, e });
    },
    onChange: (val: string, context: { e: InputEvent }) => {
      props.onInput?.({ input: val, value: value.value, e: context.e });

      // 输入事件
      inputValue.value = val;

      // 跳过不符合格式化的输入框内容
      if (!isValidDate(val)) return;
      const newMonth = dayjs(val).month();
      const newYear = dayjs(val).year();
      const newTime = formatTime(val);
      !Number.isNaN(newYear) && (year.value = newYear);
      !Number.isNaN(newMonth) && (month.value = newMonth);
      !Number.isNaN(newTime) && (time.value = newTime);
    },
    onEnter: (val: string) => {
      if (!isValidDate(val) && !isValidDate(value.value)) return;

      popupVisible.value = false;
      if (isValidDate(val)) {
        onChange?.(formatDate(val, { formatType: 'valueType' }) as DateValue, {
          dayjsValue: dayjs(val),
          trigger: 'enter',
        });
      } else if (isValidDate(value.value)) {
        inputValue.value = formatDate(value.value);
      } else {
        inputValue.value = '';
      }
    },
  }));

  // popup 设置
  const popupProps = computed(() => ({
    expandAnimation: true,
    ...props.popupProps,
    overlayStyle: props.popupProps?.overlayStyle ?? { width: 'auto' },
    overlayClassName: [props.popupProps?.overlayClassName, `${COMPONENT_NAME.value}__panel-container`],
    onVisibleChange: (visible: boolean) => {
      popupVisible.value = visible;
      if (!visible) {
        isHoverCell.value = false;
        inputValue.value = formatDate(value.value);
      }
    },
  }));

  watchEffect(() => {
    if (!value.value) {
      inputValue.value = '';
      return;
    }
    if (!isValidDate(value.value, 'valueType')) return;

    inputValue.value = formatDate(value.value);
  });

  return {
    year,
    month,
    value,
    time,
    inputValue,
    popupVisible,
    inputProps,
    popupProps,
    inputRef,
    cacheValue,
    isHoverCell,
    onChange,
  };
}
