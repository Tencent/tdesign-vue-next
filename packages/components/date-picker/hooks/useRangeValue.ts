import { ref, toRefs, watchEffect, computed, watch } from 'vue';
import { useVModel } from '@tdesign/shared-hooks';
import { isArray } from 'lodash-es';

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

  const [value, onChange] = useVModel(valueFromProps, modelValue, props.defaultValue, 'onChange');

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

  // 用于处理预设值的场景，打开面板自动展示未来某个时间的场景
  watch(
    () => isFirstValueSelected.value,
    () => {
      if (year.value[1] < year.value[0]) {
        year.value[1] = year.value[0];
      }
      if (month.value[1] < month.value[0]) {
        month.value[1] = month.value[0];
      }
    },
  );

  // 输入框响应 value 变化
  watchEffect(() => {
    if (!value.value) {
      cacheValue.value = [];
      return;
    }
    if (!isValidDate(value.value, formatRef.value.format)) return;

    cacheValue.value = formatDate(value.value, {
      format: formatRef.value.valueType,
      targetFormat: formatRef.value.format,
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
