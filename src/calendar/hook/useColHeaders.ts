import { computed } from 'vue';

import { CellColHeader, CalendarState } from '../interface';
import { TdCalendarProps, WeekDay } from '../type';
import { useConfig } from '../../hooks/useConfig';
import { COMPONENT_NAME } from '../const';
import * as utils from '../utils';

export function useColHeaders(props: TdCalendarProps, state: CalendarState) {
  const { t, global } = useConfig(COMPONENT_NAME);

  const weekDipalyText = computed<TdCalendarProps['week']>(() => {
    return props.week || t(global.value.week).split(',');
  });
  function getWeekDisplay(weekNum: number): string {
    const weekText = weekDipalyText.value;
    return typeof weekText === 'object' && weekText[weekNum - 1] ? weekText[weekNum - 1] : utils.getDayCn(weekNum);
  }
  const cellColHeaders = computed<CellColHeader[]>(() => {
    const re: CellColHeader[] = [];
    const min: WeekDay = 1;
    const max: WeekDay = 7;

    for (let i = state.realFirstDayOfWeek; i <= max; i++) {
      re.push({
        num: i as WeekDay,
        display: getWeekDisplay(i),
      });
    }
    if (state.realFirstDayOfWeek > min) {
      for (let i = min; i < state.realFirstDayOfWeek; i++) {
        re.push({
          num: i as WeekDay,
          display: getWeekDisplay(i),
        });
      }
    }
    return re;
  });

  return {
    cellColHeaders,
  };
}
