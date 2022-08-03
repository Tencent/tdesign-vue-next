import { toRefs, watchEffect, ref, computed } from 'vue';
import dayjs from 'dayjs';
import { formatDate, formatTime, isValidDate, getDefaultFormat } from './useFormat';
import useVModel from '../../hooks/useVModel';
import { TdDatePickerProps } from '../type';
import { extractTimeFormat } from '../../_common/js/date-picker/utils';

export default function useSingleValue(props: TdDatePickerProps) {
  const { value: valueFromProps, modelValue } = toRefs(props);
  const [value, onChange] = useVModel(valueFromProps, modelValue, props.defaultValue, props.onChange);

  const formatRef = computed(() =>
    getDefaultFormat({
      mode: props.mode,
      format: props.format,
      valueType: props.valueType,
      enableTimePicker: props.enableTimePicker,
    }),
  );

  if (props.enableTimePicker) {
    if (!extractTimeFormat(formatRef.value.format))
      console.error(`format: ${formatRef.value.format} 不规范，包含时间选择必须要有时间格式化 HH:mm:ss`);
    if (!extractTimeFormat(formatRef.value.valueType) && formatRef.value.valueType !== 'time-stamp')
      console.error(`valueType: ${formatRef.value.valueType} 不规范，包含时间选择必须要有时间格式化 HH:mm:ss`);
  }

  const time = ref(formatTime(value.value, formatRef.value.timeFormat));
  const month = ref<number>(dayjs(value.value).month() || new Date().getMonth());
  const year = ref<number>(dayjs(value.value).year() || new Date().getFullYear());
  const cacheValue = ref(
    formatDate(value.value, { format: formatRef.value.format, targetFormat: formatRef.value.format }),
  ); // 缓存选中值，panel 点击时更改

  // 输入框响应 value 变化
  watchEffect(() => {
    if (!value.value) {
      cacheValue.value = '';
      return;
    }
    if (!isValidDate(value.value, formatRef.value.valueType)) return;

    cacheValue.value = formatDate(value.value, {
      format: formatRef.value.format,
      targetFormat: formatRef.value.format,
    });
    time.value = formatTime(value.value, formatRef.value.timeFormat);
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
