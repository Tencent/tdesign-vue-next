import { defineComponent, watchEffect, computed, ref } from 'vue';
import dayjs from 'dayjs';
import { usePrefixClass, useConfig } from '../hooks/useConfig';

import props from './date-range-picker-props';
import { DateValue, DateRangePickerPartial } from './type';

import { RangeInputPopup as TRangeInputPopup } from '../range-input';
import TRangePanel from './panel/RangePanel';
import useRange from './hooks/useRange';
import useFormat from './hooks/useFormat';
import { subtractMonth, addMonth, extractTimeObj } from '../_common/js/date-picker/utils-new';

export default defineComponent({
  name: 'TDateRangePicker',
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('date-range-picker');
    const { global } = useConfig('datePicker');

    const {
      inputValue,
      popupVisible,
      rangeInputProps,
      popupProps,
      value,
      year,
      month,
      time,
      cacheValue,
      activeIndex,
      isHoverCell,
      isFirstValueSelected,
      onChange,
    } = useRange(props);

    const { formatTime, formatDate, isValidDate, format, timeFormat } = useFormat({
      mode: props.mode,
      value: props.value,
      enableTimePicker: props.enableTimePicker,
      format: props.format,
      valueType: props.valueType,
    });

    // 记录面板是否选中过
    const isSelected = ref(false);

    watchEffect(() => {
      // 面板展开重置数据
      if (popupVisible.value) {
        isSelected.value = false;
        isFirstValueSelected.value = false;
        cacheValue.value = formatDate(value.value || []) as string[];
        time.value = formatTime(
          formatTime(value.value || [dayjs().format(timeFormat), dayjs().format(timeFormat)]),
        ) as string[];
      }
    });

    // 日期 hover
    function onCellMouseEnter(date: Date) {
      isHoverCell.value = true;
      const nextValue = [...(inputValue.value as string[])];
      nextValue[activeIndex.value] = formatDate(date) as string;
      inputValue.value = nextValue;
    }

    // 日期 leave
    function onCellMouseLeave() {
      isHoverCell.value = false;
      inputValue.value = cacheValue.value;
    }

    // 日期点击
    function onCellClick(date: Date, { e, partial }: { e: MouseEvent; partial: DateRangePickerPartial }) {
      props.onPick?.(date, { e, partial });

      isHoverCell.value = false;
      isSelected.value = true;

      const nextValue = [...(inputValue.value as string[])];
      nextValue[activeIndex.value] = formatDate(date) as string;
      cacheValue.value = nextValue;
      inputValue.value = nextValue;

      // date 模式自动切换年月
      if (props.mode === 'date') {
        // 选择了不属于面板中展示月份的日期
        const partialIndex = partial === 'start' ? 0 : 1;
        const isAdditional = dayjs(date).month() !== month[partialIndex];
        if (isAdditional) {
          // 保证左侧时间小于右侧
          if (activeIndex.value === 0) month.value = [dayjs(date).month(), Math.min(dayjs(date).month() + 1, 11)];
          if (activeIndex.value === 1) month.value = [Math.max(dayjs(date).month() - 1, 0), dayjs(date).month()];
        }
      }

      // 有时间选择器走 confirm 逻辑
      if (props.enableTimePicker) return;

      // 确保两端都是有效值
      const notValidIndex = nextValue.findIndex((v) => !v || !isValidDate(v));

      // 首次点击不关闭、确保两端都有有效值并且无时间选择器时点击后自动关闭
      if (notValidIndex === -1 && nextValue.length === 2 && !props.enableTimePicker && isFirstValueSelected.value) {
        onChange?.(formatDate(nextValue, { formatType: 'valueType' }) as DateValue[], {
          dayjsValue: nextValue.map((v) => dayjs(v)),
          trigger: 'pick',
        });
        isFirstValueSelected.value = false;
        popupVisible.value = false;
      } else if (notValidIndex !== -1) {
        activeIndex.value = notValidIndex;
      } else {
        activeIndex.value = activeIndex.value ? 0 : 1;
      }

      // 记录选中一次
      isFirstValueSelected.value = true;
    }

    // 头部快速切换
    function onJumperClick(flag: number, { partial }: { partial: DateRangePickerPartial }) {
      const partialIndex = partial === 'start' ? 0 : 1;

      const monthCountMap = { date: 1, month: 12, year: 120 };
      const monthCount = monthCountMap[props.mode] || 0;
      const current = new Date(year.value[partialIndex], month.value[partialIndex]);

      let next = null;
      if (flag === -1) {
        next = subtractMonth(current, monthCount);
      } else if (flag === 0) {
        next = new Date();
      } else if (flag === 1) {
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

      year.value = nextYear;
      month.value = nextMonth;
    }

    // time-picker 点击
    function onTimePickerChange(val: string) {
      const { hours, minutes, seconds, milliseconds, meridiem } = extractTimeObj(val);

      const nextInputValue = [...(inputValue.value as DateValue[])];
      const changedInputValue = inputValue[activeIndex.value];
      const currentDate = !dayjs(changedInputValue, format).isValid()
        ? dayjs().year(year.value[activeIndex.value]).month(month.value[activeIndex.value])
        : dayjs(changedInputValue, format);
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
      inputValue.value = formatDate(nextInputValue);
      cacheValue.value = formatDate(nextInputValue);
    }

    // 确定
    function onConfirmClick() {
      const nextValue = [...(inputValue.value as string[])];

      const notValidIndex = nextValue.findIndex((v) => !v || !isValidDate(v));

      // 首次点击不关闭、确保两端都有有效值并且无时间选择器时点击后自动关闭
      if (notValidIndex === -1 && nextValue.length === 2 && isFirstValueSelected) {
        onChange?.(formatDate(nextValue, { formatType: 'valueType' }) as DateValue[], {
          dayjsValue: nextValue.map((v) => dayjs(v)),
          trigger: 'confirm',
        });
        year.value = nextValue.map((v) => dayjs(v, format).year());
        month.value = nextValue.map((v) => dayjs(v, format).month());
        popupVisible.value = false;
      } else if (notValidIndex !== -1) {
        activeIndex.value = notValidIndex;
      } else {
        activeIndex.value = activeIndex.value ? 0 : 1;
      }

      // 记录选中一次
      isFirstValueSelected.value = true;
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
        onChange?.(formatDate(presetValue, { formatType: 'valueType' }) as DateValue[], {
          dayjsValue: presetValue.map((p) => dayjs(p)),
          trigger: 'preset',
        });
        popupVisible.value = false;
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
    }

    const panelProps = computed(() => ({
      hoverValue: (isHoverCell.value ? inputValue.value : []) as string[],
      value: (isSelected.value ? cacheValue.value : value.value) as string[],
      isFirstValueSelected: isFirstValueSelected.value,
      activeIndex: activeIndex.value,
      year: year.value,
      month: month.value,
      mode: props.mode,
      format: props.format,
      presets: props.presets,
      time: time.value,
      disableDate: props.disableDate,
      firstDayOfWeek: props.firstDayOfWeek || global.value.firstDayOfWeek,
      timePickerProps: props.timePickerProps,
      enableTimePicker: props.enableTimePicker,
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

    return () => (
      <div class={COMPONENT_NAME.value}>
        <TRangeInputPopup
          disabled={props.disabled}
          inputValue={inputValue.value as string[]}
          popupProps={popupProps.value}
          rangeInputProps={rangeInputProps.value}
          popupVisible={popupVisible.value}
          panel={() => <TRangePanel {...panelProps.value} />}
        />
      </div>
    );
  },
});
