import { reactive, watch } from 'vue';

import dayjs from 'dayjs';
import isArray from 'lodash/isArray';

import { useConfig } from '../../hooks/useConfig';
import { COMPONENT_NAME } from '../const';
import { CalendarState } from '../interface';
import { TdCalendarProps } from '../type';
import { createDefaultCurDate } from '../utils';

export function useState(props: TdCalendarProps) {
  const { globalConfig } = useConfig(COMPONENT_NAME);

  const state = reactive<CalendarState>({
    realFirstDayOfWeek: 1,
    curDate: null,
    curDateList: [],
    curSelectedYear: null,
    curSelectedMonth: null,
    curSelectedMode: null,
    isShowWeekend: true,
    controlSize: 'medium',
  });

  function toToday() {
    const curDate = createDefaultCurDate();
    state.curDate = curDate;
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
    if (isArray(value)) {
      state.curDate = value && value.length ? dayjs(value[0]) : createDefaultCurDate();
    } else {
      state.curDate = value ? dayjs(value) : createDefaultCurDate();
    }
  }

  function setCurrentDateList(value?: TdCalendarProps['value']): void {
    if (isArray(value)) {
      state.curDateList = value && value.length ? value.map((item) => dayjs(item)) : [createDefaultCurDate()];
    } else {
      state.curDateList = value ? [dayjs(value)] : [createDefaultCurDate()];
    }
  }

  function checkDayVisible(day: number) {
    let re = true;
    if (!state.isShowWeekend) {
      re = day !== 6 && day !== 7;
    }
    return re;
  }

  watch(
    () => props.firstDayOfWeek,
    () => {
      state.realFirstDayOfWeek = props.firstDayOfWeek ?? globalConfig.value.firstDayOfWeek ?? 1;
    },
    { immediate: true },
  );
  watch(
    () => props.value,
    (v: TdCalendarProps['value']) => {
      if (props.multiple) {
        setCurrentDateList(v);
      } else {
        setCurrentDate(v);
      }
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
  watch(
    () => props.theme,
    (v: TdCalendarProps['theme']) => {
      if (v === 'card') state.controlSize = 'small';
      if (v === 'full') state.controlSize = 'medium';
    },
    { immediate: true },
  );
  return {
    state,
    toToday,
    checkDayVisible,
  };
}
