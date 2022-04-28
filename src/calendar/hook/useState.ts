import { reactive, watch } from 'vue';
import dayjs from 'dayjs';

import { useConfig } from '../../hooks/useConfig';
import { COMPONENT_NAME } from '../const';
import { createDefaultCurDate } from '../utils';
import { TdCalendarProps } from '../type';
import { CalendarState } from '../interface';

export function useState(props: TdCalendarProps) {
  const { global } = useConfig(COMPONENT_NAME);

  const state = reactive<CalendarState>({
    realFirstDayOfWeek: 1,
    curDate: null,
    curSelectedYear: null,
    curSelectedMonth: null,
    curSelectedMode: null,
    isShowWeekend: true,
    controlSize: 'medium',
  });

  function toToday() {
    const curDate = createDefaultCurDate();
    state.curSelectedYear = curDate.year();
    state.curSelectedMonth = parseInt(curDate.format('M'), 10);
  }

  function setCurSelectedYear(year?: TdCalendarProps['year']) {
    const curSelectedYear = year ? parseInt(`${year}`, 10) : createDefaultCurDate().year();
    if (!isNaN(curSelectedYear) && curSelectedYear > 0) {
      state.curSelectedYear = curSelectedYear;
    }
  }

  function setCurSelectedMonth(month?: TdCalendarProps['month']) {
    const curSelectedMonth = month ? parseInt(`${month}`, 10) : parseInt(createDefaultCurDate().format('M'), 10);
    if (!isNaN(curSelectedMonth) && curSelectedMonth > 0 && curSelectedMonth <= 12) {
      state.curSelectedMonth = curSelectedMonth;
    }
  }

  function setCurrentDate(value?: TdCalendarProps['value']): void {
    state.curDate = value ? dayjs(value) : createDefaultCurDate();
  }

  function checkDayVisibled(day: number) {
    let re = true;
    if (!state.isShowWeekend) {
      re = day !== 6 && day !== 7;
    }
    return re;
  }

  watch(
    () => props.firstDayOfWeek,
    (v: TdCalendarProps['firstDayOfWeek']) => {
      state.realFirstDayOfWeek = props.firstDayOfWeek ?? global.value.firstDayOfWeek ?? 1;
    },
    { immediate: true },
  );
  watch(
    () => props.value,
    (v: TdCalendarProps['value']) => {
      setCurrentDate(v);
    },
    { immediate: true },
  );
  watch(
    () => props.year,
    (v: TdCalendarProps['year']) => {
      setCurSelectedYear(v);
    },
    { immediate: true },
  );
  watch(
    () => props.month,
    (v: TdCalendarProps['month']) => {
      setCurSelectedMonth(v);
    },
    { immediate: true },
  );
  watch(
    () => props.isShowWeekendDefault,
    (v: TdCalendarProps['isShowWeekendDefault']) => {
      state.isShowWeekend = v;
    },
    { immediate: true },
  );
  watch(
    () => props.mode,
    (v: TdCalendarProps['mode']) => {
      state.curSelectedMode = v;
    },
    { immediate: true },
  );

  return {
    state,
    toToday,
    checkDayVisibled,
  };
}
