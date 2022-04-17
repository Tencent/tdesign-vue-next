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

  function toCurrent(value?: TdCalendarProps['value']): void {
    state.curDate = value ? dayjs(value) : createDefaultCurDate();
    state.curSelectedYear = state.curDate.year();
    state.curSelectedMonth = parseInt(state.curDate.format('M'), 10);
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
      toCurrent(v);
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
    toCurrent,
    checkDayVisibled,
  };
}
