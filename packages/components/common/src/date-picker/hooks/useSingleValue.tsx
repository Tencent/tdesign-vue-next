import { computed, ref, toRefs, watchEffect } from '@td/adapter-vue';
import {
  formatDate,
  formatTime,
  getDefaultFormat,
  isValidDate,
  parseToDayjs,
} from '@td/shared/_common/js/date-picker/format';
import useVModel from '../../hooks/useVModel';
import type { TdDatePickerProps } from '../type';
import { extractTimeFormat } from '@td/shared/_common/js/date-picker/utils';

export default function useSingleValue(props: TdDatePickerProps) {
  const { value: valueFromProps, modelValue } = toRefs(props);
  const [value, onChange] = useVModel(valueFromProps, modelValue, props.defaultValue, props.onChange);

  const formatRef = computed(() =>
    getDefaultFormat({
      mode: props.mode,
      format: props.format,
      enableTimePicker: props.enableTimePicker,
    }),
  );

  if (props.enableTimePicker) {
    if (!extractTimeFormat(formatRef.value.format)) {
      console.error(`format: ${formatRef.value.format} 不规范，包含时间选择必须要有时间格式化 HH:mm:ss`);
    }
  }

  const time = ref(formatTime(value.value, formatRef.value.format, formatRef.value.timeFormat, props.defaultTime));
  const month = ref<number>(parseToDayjs(value.value, formatRef.value.format).month());
  const year = ref<number>(parseToDayjs(value.value, formatRef.value.format).year());
  const cacheValue = ref(formatDate(value.value, { format: formatRef.value.format })); // 缓存选中值，panel 点击时更改

  // 输入框响应 value 变化
  watchEffect(() => {
    if (!value.value) {
      cacheValue.value = '';
      return;
    }
    if (!isValidDate(value.value, formatRef.value.format)) {
      return;
    }

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
