import { computed } from 'vue';

import { CellColHeader, CalendarState } from '../interface';
import { TdCalendarProps, WeekDay } from '../type';
import { useConfig } from '../../hooks/useConfig';
import { COMPONENT_NAME } from '../const';
import * as utils from '../utils';
import { isObject } from 'lodash-es';

export function useColHeaders(props: TdCalendarProps, state: CalendarState) {
  const { t, globalConfig } = useConfig(COMPONENT_NAME);

  const weekDisplayText = computed<TdCalendarProps['week']>(() => {
    return props.week || t(globalConfig.value.week).split(',');
  });
  function getWeekDisplay(weekNum: number): string {
    const weekText = weekDisplayText.value as string[];
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
