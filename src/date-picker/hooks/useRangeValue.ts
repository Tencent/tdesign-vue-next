import { ref, toRefs, watchEffect, computed } from 'vue';

import isArray from 'lodash/isArray';

import {
  isValidDate,
  formatDate,
  formatTime,
  getDefaultFormat,
  initYearMonthTime,
} from '../../_common/js/date-picker/format';
import { extractTimeFormat } from '../../_common/js/date-picker/utils';
import useVModel from '../../hooks/useVModel';
import { TdDateRangePickerProps } from '../type';

export const PARTIAL_MAP = { first: 'start', second: 'end' };

export default function useRangeValue(props: TdDateRangePickerProps) {
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
    if (!extractTimeFormat(formatRef.value.format))
      console.error(`format: ${formatRef.value.format} 不规范，包含时间选择必须要有时间格式化 HH:mm:ss`);
  }

  // warning invalid value
  if (!isArray(value.value)) {
    console.error(`typeof value: ${value.value} must be Array!`);
  } else if (!isValidDate(value.value, formatRef.value.format)) {
    console.error(
      `value: ${value.value} is invalid dateTime! Check whether the value is consistent with format: ${formatRef.value.format}`,
    );
  }

  const isFirstValueSelected = ref(false); // 记录面板点击次数，两次后才自动关闭
  const time = ref(
    initYearMonthTime({
      value: value.value,
      mode: props.mode,
      format: formatRef.value.format,
      timeFormat: formatRef.value.timeFormat,
    }).time,
  );
  const month = ref(
    initYearMonthTime({
      value: value.value,
      mode: props.mode,
      format: formatRef.value.format,
      enableTimePicker: props.enableTimePicker,
    }).month,
  );
  const year = ref(initYearMonthTime({ value: value.value, mode: props.mode, format: formatRef.value.format }).year);
  const cacheValue = ref(formatDate(value.value, { format: formatRef.value.format })); // 选择阶段预选状态

  // 输入框响应 value 变化
  watchEffect(() => {
    if (!value.value) {
      cacheValue.value = [];
      return;
    }
    if (!isValidDate(value.value, formatRef.value.format)) return;

    cacheValue.value = formatDate(value.value, {
      format: formatRef.value.format,
    });
    time.value = formatTime(
      value.value,
      formatRef.value.format,
      formatRef.value.timeFormat,
      props.defaultTime,
    ) as string[];
  });

  return {
    year,
    month,
    value,
    time,
    isFirstValueSelected,
    cacheValue,
    onChange,
  };
}
