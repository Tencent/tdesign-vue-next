import { toRefs, watchEffect, ref, computed } from 'vue';
import {
  formatDate,
  formatTime,
  isValidDate,
  getDefaultFormat,
  parseToDayjs,
  extractTimeFormat,
} from '@tdesign/common-js/date-picker/format';
import useVModel from '../../hooks/useVModel';
import { TdDatePickerProps, DateMultipleValue, DateValue } from '../type';

export function useSingleValue(props: TdDatePickerProps) {
  const { value: valueFromProps, modelValue } = toRefs(props);
  const [value, onChange] = useVModel(valueFromProps, modelValue, props.defaultValue, props.onChange);

  const formatRef = computed(() =>
    getDefaultFormat({
      mode: props.mode,
      format: props.format,
      enableTimePicker: props.multiple ? false : props.enableTimePicker,
    }),
  );

  if (props.enableTimePicker) {
    if (!extractTimeFormat(formatRef.value.format))
      console.error(`format: ${formatRef.value.format} 不规范，包含时间选择必须要有时间格式化 HH:mm:ss`);
  }

  const time = ref(
    formatTime(
      props.multiple ? (value.value as DateMultipleValue)?.[0] : value.value,
      formatRef.value.format,
      formatRef.value.timeFormat,
      props.defaultTime,
    ),
  );
  const month = ref<number>(
    parseToDayjs(
      props.multiple ? (value.value as DateMultipleValue)?.[0] : (value.value as DateValue),
      formatRef.value.format,
    ).month(),
  );
  const year = ref<number>(
    parseToDayjs(
      props.multiple ? (value.value as DateMultipleValue)?.[0] : (value.value as DateValue),
      formatRef.value.format,
    ).year(),
  );
  const cacheValue = ref(
    formatDate(props.multiple ? (value.value as DateMultipleValue)?.[0] : value.value, {
      format: formatRef.value.format,
    }),
  ); // 缓存选中值，panel 点击时更改

  // 输入框响应 value 变化
  watchEffect(() => {
    if (!value.value) {
      cacheValue.value = '';
      return;
    }
    if (!isValidDate(value.value, formatRef.value.format)) return;

    cacheValue.value = formatDate(value.value, {
      format: formatRef.value.format,
    });
    time.value = formatTime(value.value, formatRef.value.format, formatRef.value.timeFormat, props.defaultTime);
  });

  return {
    year,
    month,
    value,
    time,
    cacheValue,
    onChange,
  };
}
