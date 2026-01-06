import { useConfig } from '@tdesign/shared-hooks';
import { isArray, isFunction } from 'lodash-es';
import dayjs from 'dayjs';
import { getRangeBounds, monthHasAnyAllowed as monthAllowed, yearHasAnyAllowed as yearAllowed } from './useSelectRange';

import { getWeeks, getYears, getMonths, getQuarters, flagActive } from '@tdesign/common-js/date-picker/utils';

export function useTableData(props: any) {
  // 国际化文本初始化
  const { globalConfig } = useConfig('datePicker');

  const options = {
    minDate: props.minDate,
    maxDate: props.maxDate,
    disableDate: props.disableDate,
    firstDayOfWeek: props.firstDayOfWeek ?? globalConfig.value.firstDayOfWeek,
    monthLocal: globalConfig.value.months as string[],
    quarterLocal: globalConfig.value.quarters as string[],
    showWeekOfYear: props.mode === 'week',
    dayjsLocale: globalConfig.value.dayjsLocale,
    cancelRangeSelectLimit: props.cancelRangeSelectLimit,
  };

  // 结合 range 进行禁用与边界设置
  const baseDisableDate = options.disableDate as (d: Date) => boolean | undefined;
  let finalDisableDate: (d: Date) => boolean = (date: Date) => (baseDisableDate ? !!baseDisableDate(date) : false);

  if (isArray(props.range)) {
    const { min: rawMin, max: rawMax } = getRangeBounds(props.range);
    const rangeMin = rawMin ? new Date(dayjs(rawMin).startOf('day').format()) : null;
    const rangeMax = rawMax ? new Date(dayjs(rawMax).endOf('day').format()) : null;
    const min = rangeMin;
    const max = rangeMax;

    // 与原有 min/maxDate 求交集（仅在 date/week 模式下使用，以免 year/month/quarter 被过度限制）
    if (['date', 'week'].includes(props.mode)) {
      if (min) {
        options.minDate = options.minDate ? new Date(Math.max(options.minDate.getTime(), min.getTime())) : min;
      }
      if (max) {
        options.maxDate = options.maxDate ? new Date(Math.min(options.maxDate.getTime(), max.getTime())) : max;
      }
    }

    // 额外通过函数层面确保越界禁用（防御性）
    const intervalOverlap = (aStart: Date, aEnd: Date, bStart: Date | null, bEnd: Date | null) => {
      const s1 = aStart.getTime();
      const e1 = aEnd.getTime();
      const s2 = bStart ? bStart.getTime() : -Infinity;
      const e2 = bEnd ? bEnd.getTime() : +Infinity;
      return !(e1 < s2 || s1 > e2);
    };

    finalDisableDate = (date: Date) => {
      const base = baseDisableDate ? !!baseDisableDate(date) : false;

      if (props.mode === 'date' || props.mode === 'week') {
        const t = date.getTime();
        const aboveMin = min ? t >= min.getTime() : true;
        const belowMax = max ? t <= max.getTime() : true;
        const allowed = aboveMin && belowMax;
        return base || !allowed;
      }

      if (props.mode === 'month') {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        const allowed = intervalOverlap(start, end, min, max);
        return base || !allowed;
      }

      if (props.mode === 'quarter') {
        const startMonth = Math.floor(date.getMonth() / 3) * 3;
        const start = new Date(date.getFullYear(), startMonth, 1);
        const end = new Date(date.getFullYear(), startMonth + 3, 0);
        end.setHours(23, 59, 59, 999);
        const allowed = intervalOverlap(start, end, min, max);
        return base || !allowed;
      }

      if (props.mode === 'year') {
        const start = new Date(date.getFullYear(), 0, 1);
        const end = new Date(date.getFullYear(), 11, 31);
        end.setHours(23, 59, 59, 999);
        const allowed = intervalOverlap(start, end, min, max);
        return base || !allowed;
      }

      return base;
    };
  } else if (isFunction(props.range)) {
    const allow = props.range as (d: Date) => boolean;
    finalDisableDate = (date: Date) => {
      const base = baseDisableDate ? !!baseDisableDate(date) : false;

      if (props.mode === 'date' || props.mode === 'week') {
        const disallowedByRange = !allow(date);
        return base || disallowedByRange;
      }

      if (props.mode === 'month') {
        const allowed = monthAllowed(props.range, date.getFullYear(), date.getMonth());
        return base || !allowed;
      }

      if (props.mode === 'quarter') {
        const startMonth = Math.floor(date.getMonth() / 3) * 3;
        let allowed = false;
        for (let m = startMonth; m < startMonth + 3; m++) {
          if (monthAllowed(props.range, date.getFullYear(), m)) {
            allowed = true;
            break;
          }
        }
        return base || !allowed;
      }

      if (props.mode === 'year') {
        const allowed = yearAllowed(props.range, date.getFullYear());
        return base || !allowed;
      }

      return base;
    };
  }

  options.disableDate = finalDisableDate;

  let data: Array<any> = [];
  if (props.mode === 'date') {
    data = getWeeks({ year: props.year, month: props.month }, options);
  } else if (props.mode === 'week') {
    data = getWeeks({ year: props.year, month: props.month }, options);
  } else if (props.mode === 'quarter') {
    data = getQuarters(props.year, options);
  } else if (props.mode === 'month') {
    data = getMonths(props.year, options);
  } else if (props.mode === 'year') {
    data = getYears(props.year, options);
  }
  return flagActive(data, {
    start: props.start,
    end: props.end,
    hoverStart: props.hoverStart,
    hoverEnd: props.hoverEnd,
    type: props.mode,
    isRange: props.isRange,
    value: props.value,
    multiple: props.multiple,
  });
}
