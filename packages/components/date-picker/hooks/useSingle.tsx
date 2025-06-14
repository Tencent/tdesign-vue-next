import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { omit } from 'lodash-es';

import { useDisabled, useReadonly, usePrefixClass } from '@tdesign/shared-hooks';

import { TdDatePickerProps, DateValue } from '../type';
import {
  isValidDate,
  formatDate,
  formatTime,
  getDefaultFormat,
  parseToDayjs,
} from '@tdesign/common-js/date-picker/format';
import { useSingleValue } from './useSingleValue';

export function useSingle(props: TdDatePickerProps) {
  const COMPONENT_NAME = usePrefixClass('date-picker');
  const disabled = useDisabled();

  const inputRef = ref();
  const isReadOnly = useReadonly();

  const { value, onChange, time, month, year, cacheValue } = useSingleValue(props);

  const formatRef = computed(() =>
    getDefaultFormat({
      mode: props.mode,
      format: props.format,
      valueType: props.valueType,
      enableTimePicker: props.multiple ? false : props.enableTimePicker,
    }),
  );

  const popupVisible = ref(false);
  const isHoverCell = ref(false);
  // 未真正选中前可能不断变更输入框的内容
  const inputValue = ref(
    props.multiple
      ? formatDate(value.value, { format: formatRef.value.format }) || []
      : formatDate(value.value, { format: formatRef.value.format }),
  );

  // input 设置
  const inputProps = computed(() => {
    const defaultInputProps = {
      ...props.inputProps,
      size: props.size,
      ref: inputRef,
      readonly: isReadOnly.value || !props.allowInput,
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
    };
    return props.multiple
      ? defaultInputProps
      : {
          ...defaultInputProps,
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
            cacheValue.value = val;
            const newMonth = parseToDayjs(val, formatRef.value.format).month();
            const newYear = parseToDayjs(val, formatRef.value.format).year();
            const newTime = formatTime(val, formatRef.value.format, formatRef.value.timeFormat, props.defaultTime);
            !Number.isNaN(newYear) && (year.value = newYear);
            !Number.isNaN(newMonth) && (month.value = newMonth);
            !Number.isNaN(newTime) && (time.value = newTime);
          },
          onEnter: (val: string) => {
            if (!val) {
              onChange('', { dayjsValue: dayjs(), trigger: 'enter' });
              popupVisible.value = false;
              return;
            }

            if (!isValidDate(val, formatRef.value.format) && !isValidDate(value.value, formatRef.value.format)) return;

            popupVisible.value = false;
            if (isValidDate(val, formatRef.value.format)) {
              onChange?.(
                formatDate(val, {
                  format: formatRef.value.format,
                  targetFormat: formatRef.value.valueType,
                }) as DateValue,
                {
                  dayjsValue: parseToDayjs(val, formatRef.value.format),
                  trigger: 'enter',
                },
              );
            } else if (isValidDate(value.value, formatRef.value.format)) {
              inputValue.value = formatDate(value.value, {
                format: formatRef.value.format,
              });
            } else {
              inputValue.value = '';
            }
          },
        };
  });

  // popup 设置
  const popupProps = computed(() => ({
    expandAnimation: true,
    ...omit(props.popupProps, 'on-visible-change'),
    disabled: disabled.value,
    overlayInnerStyle: props.popupProps?.overlayInnerStyle ?? { width: 'auto' },
    overlayClassName: [props.popupProps?.overlayClassName, `${COMPONENT_NAME.value}__panel-container`],
    onVisibleChange: (visible: boolean, context: any) => {
      if (disabled.value) return;
      // 这里劫持了进一步向 popup 传递的 onVisibleChange 事件，为了保证可以在 Datepicker 中使用 popupProps.onVisibleChange，故此处理
      props.popupProps?.onVisibleChange?.(visible, context);
      // TODO
      // @ts-ignore types only declare onVisibleChange，but not declare on-visible-change
      props.popupProps?.['on-visible-change']?.(visible, context);
      // 输入框点击不关闭面板
      if (context.trigger === 'trigger-element-click') {
        popupVisible.value = true;
        return;
      }
      popupVisible.value = visible;
    },
  }));

  watch(value, (value) => {
    if (!value) {
      inputValue.value = '';
      return;
    }
    if (!isValidDate(value, formatRef.value.format)) return;

    inputValue.value = formatDate(value, {
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
