import { ref, toRefs, watchEffect, computed } from 'vue';
import dayjs from 'dayjs';
import useVModel from '../../hooks/useVModel';

import { TdDateRangePickerProps, DateRangeValue } from '../type';
import {
  isValidDate,
  formatDate,
  formatTime,
  getDefaultFormat,
  parseToDayjs,
} from '../../_common/js/date-picker/format';
import { extractTimeFormat } from '../../_common/js/date-picker/utils';

export const PARTIAL_MAP = { first: 'start', second: 'end' };

// 初始化面板年份月份
export function initYearMonthTime({
  value,
  mode = 'date',
  format,
  timeFormat = 'HH:mm:ss',
  enableTimePicker,
}: {
  value: DateRangeValue;
  mode: string;
  format: string;
  timeFormat?: string;
  enableTimePicker?: boolean;
}) {
  const defaultYearMonthTime = {
    year: [dayjs().year(), dayjs().year()],
    month: [dayjs().month(), dayjs().month()],
    time: [dayjs().format(timeFormat), dayjs().format(timeFormat)],
  };
  if (mode === 'year') {
    defaultYearMonthTime.year[1] += 10;
  } else if (mode === 'month' || mode === 'quarter') {
    defaultYearMonthTime.year[1] += 1;
  } else if ((mode === 'date' || mode === 'week') && !enableTimePicker) {
    defaultYearMonthTime.month[1] += 1;
  }

  if (!value || !Array.isArray(value) || !value.length) {
    return defaultYearMonthTime;
  }

  return {
    year: value.map((v) => parseToDayjs(v, format).year()),
    month: value.map((v) => parseToDayjs(v, format).month()),
    time: value.map((v) => parseToDayjs(v, format).format(timeFormat)),
  };
}

export default function useRangeValue(props: TdDateRangePickerProps) {
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

  // warning invalid value
  if (!Array.isArray(value.value)) {
    console.error(`typeof value: ${value.value} must be Array!`);
  } else if (!isValidDate(value.value, formatRef.value.valueType)) {
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
  const cacheValue = ref(
    formatDate(value.value, { format: formatRef.value.format, targetFormat: formatRef.value.format }),
  ); // 选择阶段预选状态

  // 输入框响应 value 变化
  watchEffect(() => {
    if (!value.value) {
      cacheValue.value = [];
      return;
    }
    if (!isValidDate(value.value, formatRef.value.valueType)) return;

    cacheValue.value = formatDate(value.value, {
      format: formatRef.value.format,
      targetFormat: formatRef.value.format,
    });
    time.value = formatTime(value.value, formatRef.value.timeFormat) as string[];
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
