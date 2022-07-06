import { defineComponent, computed, ref } from 'vue';
import dayjs from 'dayjs';

import props from './date-range-picker-panel-props';
import {
  DateValue,
  DateRangePickerPartial,
  TdDateRangePickerPanelProps,
  DatePickerYearChangeTrigger,
  DatePickerMonthChangeTrigger,
} from './type';

import TRangePanel from './panel/RangePanel';
import useRangeValue from './hooks/useRangeValue';
import useFormat from './hooks/useFormat';
import { subtractMonth, addMonth, extractTimeObj } from '../_common/js/date-picker/utils';

export default defineComponent({
  name: 'TDateRangePickerPanel',
  props,
  setup(props: TdDateRangePickerPanelProps) {
    const { value, year, month, time, cacheValue, isFirstValueSelected, onChange } = useRangeValue(props);

    const formatRef = computed(() =>
      useFormat({
        mode: props.mode,
        value: props.value,
        enableTimePicker: props.enableTimePicker,
        format: props.format,
        valueType: props.valueType,
      }),
    );

    // 记录面板是否选中过
    const isSelected = ref(false);
    const isHoverCell = ref(false);
    const hoverValue = ref([]);
    const activeIndex = computed(() => (isFirstValueSelected.value ? 1 : 0));

    // 日期 hover
    function onCellMouseEnter(date: Date) {
      isHoverCell.value = true;
      const nextValue = [...(hoverValue.value as string[])];
      nextValue[activeIndex.value] = formatRef.value.formatDate(date) as string;
      hoverValue.value = nextValue;
    }

    // 日期 leave
    function onCellMouseLeave() {
      isHoverCell.value = false;
      hoverValue.value = cacheValue.value as string[];
    }

    // 日期点击
    function onCellClick(date: Date, { e, partial }: { e: MouseEvent; partial: DateRangePickerPartial }) {
      isHoverCell.value = false;
      isSelected.value = true;

      const nextValue = [...(cacheValue.value as string[])];
      nextValue[activeIndex.value] = formatRef.value.formatDate(date) as string;
      cacheValue.value = nextValue;

      // 有时间选择器走 confirm 逻辑
      if (props.enableTimePicker) return;

      // 首次点击不关闭、确保两端都有有效值并且无时间选择器时点击后自动关闭
      if (nextValue.length === 2 && !props.enableTimePicker && isFirstValueSelected.value) {
        onChange?.(
          formatRef.value.formatDate(nextValue, { formatType: 'valueType', sortType: 'swap' }) as DateValue[],
          {
            dayjsValue: nextValue.map((v) => dayjs(v)),
            trigger: 'pick',
          },
        );
        isFirstValueSelected.value = false;
      } else {
        isFirstValueSelected.value = true;
      }

      props.onCellClick?.({ date: value.value.map((v) => dayjs(v).toDate()), e, partial });
    }

    // 头部快速切换
    function onJumperClick({ trigger, partial }: { trigger: string; partial: DateRangePickerPartial }) {
      const partialIndex = partial === 'start' ? 0 : 1;

      const triggerMap = {
        prev: 'arrow-previous',
        next: 'arrow-next',
      };
      const monthCountMap = { date: 1, month: 12, year: 120 };
      const monthCount = monthCountMap[props.mode] || 0;
      const current = new Date(year.value[partialIndex], month.value[partialIndex]);

      let next = null;
      if (trigger === 'prev') {
        next = subtractMonth(current, monthCount);
      } else if (trigger === 'current') {
        next = new Date();
      } else if (trigger === 'next') {
        next = addMonth(current, monthCount);
      }

      const nextYear = [...year.value];
      nextYear[partialIndex] = next.getFullYear();
      const nextMonth = [...month.value];
      nextMonth[partialIndex] = next.getMonth();

      // 保证左侧时间不大于右侧
      if (partialIndex === 0) {
        nextYear[1] = Math.max(nextYear[0], nextYear[1]);

        if (nextYear[0] === nextYear[1]) {
          nextMonth[1] = Math.max(nextMonth[0], nextMonth[1]);
        }
      }

      // 保证左侧时间不大于右侧
      if (partialIndex === 1) {
        nextYear[0] = Math.min(nextYear[0], nextYear[1]);

        if (nextYear[0] === nextYear[1]) {
          nextMonth[0] = Math.min(nextMonth[0], nextMonth[1]);
        }
      }

      if (year.value.some((y) => !nextYear.includes(y))) {
        props.onYearChange?.({
          partial,
          year: nextYear[partialIndex],
          date: value.value.map((v) => dayjs(v).toDate()),
          trigger: trigger === 'current' ? 'today' : (`year-${triggerMap[trigger]}` as DatePickerYearChangeTrigger),
        });
      }
      if (month.value.some((m) => !nextMonth.includes(m))) {
        props.onMonthChange?.({
          partial,
          month: nextMonth[partialIndex],
          date: value.value.map((v) => dayjs(v).toDate()),
          trigger: trigger === 'current' ? 'today' : (`month-${triggerMap[trigger]}` as DatePickerMonthChangeTrigger),
        });
      }

      year.value = nextYear;
      month.value = nextMonth;
    }

    // time-picker 点击
    function onTimePickerChange(val: string) {
      const { hours, minutes, seconds, milliseconds, meridiem } = extractTimeObj(val);

      const nextInputValue = [...(cacheValue.value as DateValue[])];
      const changedInputValue = cacheValue.value[activeIndex.value];
      const currentDate = !dayjs(changedInputValue, formatRef.value.format).isValid()
        ? dayjs().year(year.value[activeIndex.value]).month(month.value[activeIndex.value])
        : dayjs(changedInputValue, formatRef.value.format);
      // am pm 12小时制转化 24小时制
      let nextHours = hours;
      if (/am/i.test(meridiem) && nextHours === 12) nextHours -= 12;
      if (/pm/i.test(meridiem) && nextHours < 12) nextHours += 12;

      const nextDate = currentDate.hour(nextHours).minute(minutes).second(seconds).millisecond(milliseconds).toDate();
      nextInputValue[activeIndex.value] = nextDate;

      const nextTime = [...time.value];
      nextTime[activeIndex.value] = val;
      time.value = nextTime;

      isSelected.value = true;
      cacheValue.value = formatRef.value.formatDate(nextInputValue);

      props.onTimeChange?.({
        time: val,
        date: value.value.map((v) => dayjs(v).toDate()),
        partial: activeIndex.value ? 'end' : 'start',
        trigger: 'time-hour',
      });
    }

    // 确定
    function onConfirmClick({ e }: { e: MouseEvent }) {
      const nextValue = [...(cacheValue.value as string[])];

      const notValidIndex = nextValue.findIndex((v) => !v || !formatRef.value.isValidDate(v));

      // 首次点击不关闭、确保两端都有有效值并且无时间选择器时点击后自动关闭
      if (notValidIndex === -1 && nextValue.length === 2 && isFirstValueSelected.value) {
        onChange?.(
          formatRef.value.formatDate(nextValue, { formatType: 'valueType', sortType: 'swap' }) as DateValue[],
          {
            dayjsValue: nextValue.map((v) => dayjs(v)),
            trigger: 'confirm',
          },
        );
        year.value = nextValue.map((v) => dayjs(v, formatRef.value.format).year());
        month.value = nextValue.map((v) => dayjs(v, formatRef.value.format).month());
        isFirstValueSelected.value = false;
      } else {
        isFirstValueSelected.value = true;
      }

      props.onConfirm?.({ date: value.value.map((v) => dayjs(v).toDate()), e });
    }

    // 预设
    function onPresetClick(preset: any) {
      let presetValue = preset;
      if (typeof preset === 'function') {
        presetValue = preset();
      }
      if (!Array.isArray(presetValue)) {
        console.error(`preset: ${preset} 预设值必须是数组!`);
      } else {
        onChange?.(
          formatRef.value.formatDate(presetValue, { formatType: 'valueType', sortType: 'swap' }) as DateValue[],
          {
            dayjsValue: presetValue.map((p) => dayjs(p)),
            trigger: 'preset',
          },
        );
      }
    }

    function onYearChange(nextVal: number, { partial }: { partial: DateRangePickerPartial }) {
      let partialIndex = partial === 'start' ? 0 : 1;
      if (props.enableTimePicker) partialIndex = activeIndex.value;

      const nextYear = [...year.value];
      nextYear[partialIndex] = nextVal;
      // 保证左侧时间不大于右侧
      if (partialIndex === 0) nextYear[1] = Math.max(nextYear[0], nextYear[1]);
      if (partialIndex === 1) nextYear[0] = Math.min(nextYear[0], nextYear[1]);

      year.value = nextYear;

      props.onYearChange?.({
        partial,
        year: nextYear[partialIndex],
        date: value.value.map((v) => dayjs(v).toDate()),
        trigger: 'year-select',
      });
    }

    function onMonthChange(nextVal: number, { partial }: { partial: DateRangePickerPartial }) {
      let partialIndex = partial === 'start' ? 0 : 1;
      if (props.enableTimePicker) partialIndex = activeIndex.value;

      const nextMonth = [...month.value];
      nextMonth[partialIndex] = nextVal;
      // 保证左侧时间不大于右侧
      if (year[0] === year[1]) {
        if (partialIndex === 0) nextMonth[1] = Math.max(nextMonth[0], nextMonth[1]);
        if (partialIndex === 1) nextMonth[0] = Math.min(nextMonth[0], nextMonth[1]);
      }

      month.value = nextMonth;

      props.onMonthChange?.({
        partial,
        month: nextMonth[partialIndex],
        date: value.value.map((v) => dayjs(v).toDate()),
        trigger: 'month-select',
      });
    }

    const panelProps = computed(() => ({
      hoverValue: (isHoverCell.value ? hoverValue.value : []) as string[],
      value: (isSelected.value ? cacheValue.value : value.value) as string[],
      activeIndex: activeIndex.value,
      year: year.value,
      month: month.value,
      mode: props.mode,
      format: props.format,
      presets: props.presets,
      time: time.value,
      disableDate: props.disableDate,
      firstDayOfWeek: props.firstDayOfWeek,
      timePickerProps: props.timePickerProps,
      enableTimePicker: props.enableTimePicker,
      presetsPlacement: props.presetsPlacement,
      panelPreselection: props.panelPreselection,
      onCellClick,
      onCellMouseEnter,
      onCellMouseLeave,
      onJumperClick,
      onConfirmClick,
      onPresetClick,
      onYearChange,
      onMonthChange,
      onTimePickerChange,
    }));

    return () => <TRangePanel {...panelProps.value} />;
  },
});
