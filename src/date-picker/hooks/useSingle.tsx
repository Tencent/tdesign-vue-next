import { ref, computed, watchEffect } from 'vue';
import { CalendarIcon as TdCalendarIcon } from 'tdesign-icons-vue-next';
import dayjs from 'dayjs';

import { useFormDisabled } from '../../form/hooks';
import { usePrefixClass, useConfig } from '../../hooks/useConfig';
import { useGlobalIcon } from '../../hooks/useGlobalIcon';
import { TdDatePickerProps, DateValue } from '../type';
import {
  isValidDate,
  formatDate,
  formatTime,
  getDefaultFormat,
  parseToDayjs,
} from '../../_common/js/date-picker/format';
import useSingleValue from './useSingleValue';

export default function useSingle(props: TdDatePickerProps) {
  const COMPONENT_NAME = usePrefixClass('date-picker');
  const { globalConfig } = useConfig('datePicker');
  const { CalendarIcon } = useGlobalIcon({ CalendarIcon: TdCalendarIcon });
  const disabled = useFormDisabled();

  const inputRef = ref();

  const { value, onChange, time, month, year, cacheValue } = useSingleValue(props);

  const formatRef = computed(() =>
    getDefaultFormat({
      mode: props.mode,
      format: props.format,
      enableTimePicker: props.enableTimePicker,
    }),
  );

  const popupVisible = ref(false);
  const isHoverCell = ref(false);
  // 未真正选中前可能不断变更输入框的内容
  const inputValue = ref(formatDate(value.value, { format: formatRef.value.format }));

  // input 设置
  const inputProps = computed(() => ({
    ...props.inputProps,
    ref: inputRef,
    prefixIcon: props.prefixIcon,
    readonly: !props.allowInput,
    placeholder: props.placeholder || globalConfig.value.placeholder[props.mode],
    suffixIcon: props.suffixIcon || (() => <CalendarIcon />),
    class: [
      {
        [`${COMPONENT_NAME.value}__input--placeholder`]: isHoverCell.value,
      },
    ],
    onClear: (context: { e: InputEvent }) => {
      context?.e?.stopPropagation();
      popupVisible.value = false;
      onChange?.('', { dayjsValue: dayjs(), trigger: 'clear' });
    },
    onBlur: (val: string, context: { e: FocusEvent }) => {
      props.onBlur?.({ value: val, e: context.e });
    },
    onFocus: (_: string, { e }: { e: FocusEvent }) => {
      props.onFocus?.({ value: value.value, e });
    },
    onChange: (val: string) => {
      // 输入事件
      inputValue.value = val;

      // 跳过不符合格式化的输入框内容
      if (!isValidDate(val, formatRef.value.format)) return;
      const newMonth = dayjs(val).month();
      const newYear = dayjs(val).year();
      const newTime = formatTime(val, formatRef.value.timeFormat);
      !Number.isNaN(newYear) && (year.value = newYear);
      !Number.isNaN(newMonth) && (month.value = newMonth);
      !Number.isNaN(newTime) && (time.value = newTime);
    },
    onEnter: (val: string) => {
      if (!isValidDate(val, formatRef.value.format) && !isValidDate(value.value, formatRef.value.format)) return;

      popupVisible.value = false;
      if (isValidDate(val, formatRef.value.format)) {
        onChange?.(formatDate(val, { format: formatRef.value.format }) as DateValue, {
          dayjsValue: parseToDayjs(val, formatRef.value.format),
          trigger: 'enter',
        });
      } else if (isValidDate(value.value, formatRef.value.format)) {
        inputValue.value = formatDate(value.value, {
          format: formatRef.value.format,
        });
      } else {
        inputValue.value = '';
      }
    },
  }));

  // popup 设置
  const popupProps = computed(() => ({
    expandAnimation: true,
    ...props.popupProps,
    disabled: disabled.value,
    overlayInnerStyle: props.popupProps?.overlayInnerStyle ?? { width: 'auto' },
    overlayClassName: [props.popupProps?.overlayClassName, `${COMPONENT_NAME.value}__panel-container`],
    onVisibleChange: (visible: boolean, context: any) => {
      if (disabled.value) return;

      // 输入框点击不关闭面板
      if (context.trigger === 'trigger-element-click') {
        popupVisible.value = true;
        return;
      }
      if (!visible) {
        isHoverCell.value = false;
        inputValue.value = formatDate(value.value, {
          format: formatRef.value.format,
        });
      }
      popupVisible.value = visible;
    },
  }));

  watchEffect(() => {
    if (!value.value) {
      inputValue.value = '';
      return;
    }
    if (!isValidDate(value.value, formatRef.value.format)) return;

    inputValue.value = formatDate(value.value, {
      format: formatRef.value.format,
    });
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
