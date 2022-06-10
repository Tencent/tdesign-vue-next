import { ref, toRefs, watchEffect } from 'vue';
import dayjs from 'dayjs';
import useVModel from '../../hooks/useVModel';

import { TdDateRangePickerProps, DateValue } from '../type';
import useFormat from './useFormat';

export const PARTIAL_MAP = { first: 'start', second: 'end' };

// 初始化面板年份月份
function initYearMonthTime(value: DateValue[], mode = 'date', format: string, timeFormat = 'HH:mm:ss') {
  const defaultYearMonthTime = {
    year: [dayjs().year(), dayjs().year()],
    month: [dayjs().month(), dayjs().month()],
    time: [dayjs().format(timeFormat), dayjs().format(timeFormat)],
  };
  if (mode === 'year') {
    defaultYearMonthTime.year[1] += 10;
  } else if (mode === 'month') {
    defaultYearMonthTime.year[1] += 1;
  } else if (mode === 'date') {
    defaultYearMonthTime.month[1] += 1;
  }

  if (!value || !Array.isArray(value) || !value.length) {
    return defaultYearMonthTime;
  }

  return {
    year: value.map((v) => dayjs(v, format).year()),
    month: value.map((v) => dayjs(v, format).month()),
    time: value.map((v) => dayjs(v, format).format(timeFormat)),
  };
}

export default function useRange(props: TdDateRangePickerProps) {
  const { value: valueFromProps, modelValue } = toRefs(props);

  const isMountedRef = ref(false);
  const inputRef = ref();

  const [value, onChange] = useVModel(valueFromProps, modelValue, props.defaultValue, props.onChange);
  const { format, isValidDate, timeFormat, formatDate, formatTime } = useFormat({
    mode: props.mode,
    value: props.value,
    format: props.format,
    valueType: props.valueType,
    enableTimePicker: props.enableTimePicker,
  });

  // warning invalid value
  if (!Array.isArray(value.value)) {
    console.error(`typeof value: ${value.value} must be Array!`);
  } else if (!isValidDate(value.value, 'valueType')) {
    console.error(`value: ${value.value} is invalid datetime!`);
  }

  const isFirstValueSelected = ref(false); // 记录面板点击次数，两次后才自动关闭
  const time = ref(initYearMonthTime(props.value, props.mode, format, timeFormat).time);
  const month = ref(initYearMonthTime(props.value, props.mode, format).month);
  const year = ref(initYearMonthTime(props.value, props.mode, format).year);
  const cacheValue = ref(formatDate(props.value)); // 选择阶段预选状态

  // 输入框响应 value 变化
  watchEffect(() => {
    if (!value.value) {
      cacheValue.value = [];
      time.value = [dayjs().format(timeFormat), dayjs().format(timeFormat)];
      return;
    }
    if (!isValidDate(value.value, 'valueType')) return;

    cacheValue.value = formatDate(value.value);
    time.value = formatTime(value.value) as string[];
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
