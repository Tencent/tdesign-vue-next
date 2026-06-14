import { ref, toRefs, computed, watch } from 'vue';
import { useVModel } from '@tdesign/shared-hooks';

import { TdDateRangePickerProps } from '../type';
import {
  isValidDate,
  formatDate,
  formatTime,
  getDefaultFormat,
  initYearMonthTime,
  extractTimeFormat,
} from '@tdesign/common-js/date-picker/format';

export function useRangeValue(props: TdDateRangePickerProps) {
  const { value: valueFromProps, modelValue } = toRefs(props);

  const [rawValue, onChange] = useVModel(valueFromProps, modelValue, props.defaultValue, props.onChange);
  const value = computed(() => (Array.isArray(rawValue.value) ? rawValue.value : []));

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
  }

  // warning invalid value
  if (!Array.isArray(rawValue.value)) {
    console.error(`typeof value: ${rawValue.value} must be Array!`);
  } else if (!isValidDate(rawValue.value, formatRef.value.format)) {
    console.error(
      `value: ${rawValue.value} is invalid dateTime! Check whether the value is consistent with format: ${formatRef.value.format}`,
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

  // 用于处理预设值的场景，打开面板自动展示未来某个时间的场景
  watch(
    () => isFirstValueSelected.value,
    () => {
      if (year.value[1] < year.value[0]) {
        year.value[1] = year.value[0];
      }
      // 只有当左右面板年份相同时，才需要比较月份大小
      if (year.value[0] === year.value[1] && month.value[1] < month.value[0]) {
        month.value[1] = month.value[0];
      }
    },
  );

  watch(
    value,
    (newValue) => {
      if (!rawValue.value) {
        cacheValue.value = [];
        return;
      }
      if (!isValidDate(newValue, formatRef.value.format)) return;

      cacheValue.value = formatDate(newValue, {
        format: formatRef.value.valueType,
        targetFormat: formatRef.value.format,
      });
      time.value = formatTime(
        newValue,
        formatRef.value.format,
        formatRef.value.timeFormat,
        props.defaultTime,
      ) as string[];
    },
    { immediate: true },
  );

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
