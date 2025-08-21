import { defineComponent, computed } from 'vue';
import dayjs from 'dayjs';
import { isFunction } from 'lodash-es';
import { useSingleValue } from './hooks/useSingleValue';
import { formatDate, getDefaultFormat, parseToDayjs } from '@tdesign/common-js/date-picker/format';
import { subtractMonth, addMonth, extractTimeObj } from '@tdesign/common-js/date-picker/utils';
import type {
  DateValue,
  TdDatePickerPanelProps,
  DatePickerYearChangeTrigger,
  DatePickerMonthChangeTrigger,
} from './type';

import datePickerPanelProps from './date-picker-panel-props';
import datePickerProps from './props';

import TSinglePanel from './components/panel/SinglePanel';
import { useConfig } from '@tdesign/shared-hooks';

export default defineComponent({
  name: 'TDatePickerPanel',
  props: {
    value: datePickerProps.value,
    defaultValue: datePickerProps.defaultValue,
    modelValue: datePickerProps.modelValue,
    disabled: datePickerProps.disabled,
    disableDate: datePickerProps.disableDate,
    enableTimePicker: datePickerProps.enableTimePicker,
    firstDayOfWeek: datePickerProps.firstDayOfWeek,
    format: datePickerProps.format,
    mode: datePickerProps.mode,
    presets: datePickerProps.presets,
    presetsPlacement: datePickerProps.presetsPlacement,
    timePickerProps: datePickerProps.timePickerProps,
    ...datePickerPanelProps,
  },

  setup(props: TdDatePickerPanelProps) {
    const { globalConfig } = useConfig('datePicker');
    const { dayjsLocale } = globalConfig.value;
    const { cacheValue, value, year, month, time, onChange } = useSingleValue(props);

    const formatRef = computed(() =>
      getDefaultFormat({
        mode: props.mode,
        format: props.format,
        enableTimePicker: props.enableTimePicker,
      }),
    );

    // 日期点击
    function onCellClick(date: Date, { e }: { e: MouseEvent }) {
      props.onCellClick?.({ date, e });

      // date 模式自动切换年月
      if (props.mode === 'date') {
        year.value = date.getFullYear();
        month.value = date.getMonth();
      }
      if (props.enableTimePicker) {
        cacheValue.value = formatDate(date, { format: formatRef.value.format, dayjsLocale });
      } else {
        onChange?.(formatDate(date, { format: formatRef.value.format, dayjsLocale }) as DateValue, {
          dayjsValue: parseToDayjs(date, formatRef.value.format),
          trigger: 'pick',
        });
      }
    }

    // 头部快速切换
    function onJumperClick({ trigger }: { trigger: 'prev' | 'next' | 'current' }) {
      const triggerMap = {
        prev: 'arrow-previous',
        next: 'arrow-next',
      };
      const monthCountMap = { date: 1, week: 1, month: 12, quarter: 12, year: 120 };
      const monthCount = monthCountMap[props.mode] || 0;

      const current = new Date(year.value, month.value);

      let next = null;
      if (trigger === 'prev') {
        next = subtractMonth(current, monthCount);
      } else if (trigger === 'current') {
        next = new Date();
      } else if (trigger === 'next') {
        next = addMonth(current, monthCount);
      }

      const nextYear = next.getFullYear();
      const nextMonth = next.getMonth();

      if (year.value !== nextYear) {
        props.onYearChange?.({
          year: nextYear,
          date: dayjs(value.value as DateValue).toDate(),
          trigger: trigger === 'current' ? 'today' : (`year-${triggerMap[trigger]}` as DatePickerYearChangeTrigger),
        });
      }
      if (month.value !== nextMonth) {
        props.onMonthChange?.({
          month: nextMonth,
          date: dayjs(value.value as DateValue).toDate(),
          trigger: trigger === 'current' ? 'today' : (`month-${triggerMap[trigger]}` as DatePickerMonthChangeTrigger),
        });
      }

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
      const currentDate = !dayjs(cacheValue.value as string, formatRef.value.format).isValid()
        ? dayjs()
        : dayjs(cacheValue.value as string, formatRef.value.format);
      const nextDate = currentDate.hour(nextHours).minute(minutes).second(seconds).millisecond(milliseconds).toDate();
      cacheValue.value = formatDate(nextDate, { format: formatRef.value.format, dayjsLocale });

      props.onTimeChange?.({
        time: val,
        date: dayjs(value.value as DateValue).toDate(),
        trigger: 'time-hour',
      });
    }

    // 确定
    function onConfirmClick({ e }: { e: MouseEvent }) {
      onChange?.(
        formatDate(cacheValue.value, {
          format: formatRef.value.format,
          dayjsLocale,
        }) as DateValue,
        {
          dayjsValue: parseToDayjs(cacheValue.value as string, formatRef.value.format),
          trigger: 'confirm',
        },
      );
      props.onConfirm?.({ date: dayjs(cacheValue.value as string).toDate(), e });
    }

    // 预设
    function onPresetClick(preset: any, context: any) {
      const presetVal = isFunction(preset) ? preset() : preset;
      onChange?.(formatDate(presetVal, { format: formatRef.value.format, dayjsLocale }) as DateValue, {
        dayjsValue: parseToDayjs(presetVal, formatRef.value.format),
        trigger: 'preset',
      });
      props.onPresetClick?.(context);
    }

    function onYearChange(nextYear: number) {
      year.value = nextYear;

      props.onYearChange?.({
        year: year.value,
        date: dayjs(value.value as DateValue).toDate(),
        trigger: 'year-select',
      });
    }

    function onMonthChange(nextMonth: number) {
      month.value = nextMonth;

      props.onMonthChange?.({
        month: month.value,
        date: dayjs(value.value as DateValue).toDate(),
        trigger: 'month-select',
      });
    }

    const panelProps = computed(() => ({
      value: cacheValue.value as string,
      year: year.value,
      month: month.value,
      mode: props.mode,
      format: formatRef.value.format,
      presets: props.presets,
      time: time.value as string,
      disableDate: props.disableDate,
      firstDayOfWeek: props.firstDayOfWeek,
      timePickerProps: props.timePickerProps,
      enableTimePicker: props.enableTimePicker,
      presetsPlacement: props.presetsPlacement,
      popupVisible: true,
      panelClick: props.onPanelClick,
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
