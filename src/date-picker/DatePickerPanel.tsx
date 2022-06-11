import { defineComponent, computed } from 'vue';
import dayjs from 'dayjs';

import useSingleValue from './hooks/useSingleValue';
import useFormat from './hooks/useFormat';
import { subtractMonth, addMonth, extractTimeObj } from '../_common/js/date-picker/utils-new';
import type { DateValue } from './type';
import props from './date-picker-panel-props';

import TSinglePanel from './panel/SinglePanel';

export default defineComponent({
  name: 'TDatePickerPanel',
  props,
  setup(props) {
    const { cacheValue, value, year, month, time, onChange } = useSingleValue(props);

    const { formatDate, format } = useFormat({
      value: value.value,
      mode: props.mode,
      format: props.format,
      valueType: props.valueType,
      enableTimePicker: props.enableTimePicker,
    });

    // 日期点击
    function onCellClick(date: Date, { e }: { e: MouseEvent }) {
      props.onCellClick?.({ date, e });

      // date 模式自动切换年月
      if (props.mode === 'date') {
        year.value = date.getFullYear();
        month.value = date.getMonth();
      }
      if (props.enableTimePicker) {
        cacheValue.value = formatDate(date);
      } else {
        onChange?.(formatDate(date, { formatType: 'valueType' }) as DateValue, {
          dayjsValue: dayjs(date),
          trigger: 'pick',
        });
      }
    }

    // 头部快速切换
    function onJumperClick(flag: number) {
      const monthCountMap = { date: 1, month: 12, year: 120 };
      const monthCount = monthCountMap[props.mode] || 0;

      const current = new Date(year.value, month.value);

      let next = null;
      if (flag === -1) {
        next = subtractMonth(current, monthCount);
      } else if (flag === 0) {
        next = new Date();
      } else if (flag === 1) {
        next = addMonth(current, monthCount);
      }

      const nextYear = next.getFullYear();
      const nextMonth = next.getMonth();

      year.value = nextYear;
      month.value = nextMonth;
    }

    // timepicker 点击
    function onTimePickerChange(val: string) {
      time.value = val;

      const { hours, minutes, seconds, milliseconds, meridiem } = extractTimeObj(val);

      // am pm 12小时制转化 24小时制
      let nextHours = hours;
      if (/am/i.test(meridiem) && nextHours === 12) nextHours -= 12;
      if (/pm/i.test(meridiem) && nextHours < 12) nextHours += 12;
      const currentDate = !dayjs(cacheValue.value as string, format).isValid()
        ? dayjs()
        : dayjs(cacheValue.value as string, format);
      const nextDate = currentDate.hour(nextHours).minute(minutes).second(seconds).millisecond(milliseconds).toDate();
      cacheValue.value = formatDate(nextDate);

      props.onTimeChange?.({
        time: val,
        date: dayjs(value.value).toDate(),
        trigger: 'time-hour',
      });
    }

    // 确定
    function onConfirmClick() {
      onChange?.(formatDate(cacheValue.value, { formatType: 'valueType' }) as DateValue, {
        dayjsValue: dayjs(cacheValue.value as string),
        trigger: 'confirm',
      });
    }

    // 预设
    function onPresetClick(presetValue: DateValue | (() => DateValue), { e, preset }: any) {
      const presetVal = typeof presetValue === 'function' ? presetValue() : presetValue;
      onChange?.(formatDate(presetVal, { formatType: 'valueType' }) as DateValue, {
        dayjsValue: dayjs(presetVal),
        trigger: 'preset',
      });
      props.onPresetClick?.({ e, preset });
    }

    function onYearChange(nextYear: number) {
      year.value = nextYear;

      props.onYearChange?.({
        year,
        date: dayjs(value.value).toDate(),
        trigger: 'year-select',
      });
    }

    function onMonthChange(nextMonth: number) {
      month.value = nextMonth;

      props.onMonthChange?.({
        month,
        date: dayjs(value.value).toDate(),
        trigger: 'month-select',
      });
    }

    const panelProps = computed(() => ({
      value: cacheValue.value as string,
      year: year.value,
      month: month.value,
      mode: props.mode,
      format: props.format,
      presets: props.presets,
      time: time.value as string,
      disableDate: props.disableDate,
      firstDayOfWeek: props.firstDayOfWeek,
      timePickerProps: props.timePickerProps,
      enableTimePicker: props.enableTimePicker,
      onCellClick,
      onJumperClick,
      onConfirmClick,
      onPresetClick,
      onYearChange,
      onMonthChange,
      onTimePickerChange,
    }));

    return () => <TSinglePanel {...panelProps.value} />;
  },
});
