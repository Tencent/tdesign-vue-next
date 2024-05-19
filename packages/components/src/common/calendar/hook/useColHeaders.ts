import { computed } from '@td/adapter-vue';

import { isObject } from 'lodash-es';
import { useConfig } from '@td/adapter-hooks';
import type { CalendarState, CellColHeader } from '../interface';
import type { TdCalendarProps, WeekDay } from '../type';
import { COMPONENT_NAME } from '../const';
import * as utils from '../utils';

export function useColHeaders(props: TdCalendarProps, state: CalendarState) {
  const { t, globalConfig } = useConfig(COMPONENT_NAME);

  const weekDipalyText = computed<TdCalendarProps['week']>(() => {
    return props.week || t(globalConfig.value.week).split(',');
  });
  function getWeekDisplay(weekNum: number): string {
    const weekText = weekDipalyText.value;
    return isObject(weekText) && weekText[weekNum - 1] ? weekText[weekNum - 1] : utils.getDayCn(weekNum);
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
