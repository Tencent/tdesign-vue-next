import { computed, type Ref } from 'vue';
import { isArray, isFunction } from 'lodash-es';

import type { PickerDateRange, TdDatePickerProps } from '../type';
import { getRangeBounds } from '../utils';

// 判断某年某月是否存在可选日期（根据 range）
export function monthHasAnyAllowed(range: PickerDateRange, year: number, month: number): boolean {
  if (isArray(range)) {
    const { min, max } = getRangeBounds(range);
    if (min && year === min.getFullYear() && month < min.getMonth()) return false;
    if (max && year === max.getFullYear() && month > max.getMonth()) return false;
    if (min && year < min.getFullYear()) return false;
    if (max && year > max.getFullYear()) return false;
    return true;
  }
  if (isFunction(range)) {
    const allow = range as (d: Date) => boolean;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      if (allow(new Date(year, month, d))) return true;
    }
    return false;
  }
  return true;
}

// 判断某年是否存在可选日期
export function yearHasAnyAllowed(range: PickerDateRange, year: number): boolean {
  if (isArray(range)) {
    const { min, max } = getRangeBounds(range);
    if (min && year < min.getFullYear()) return false;
    if (max && year > max.getFullYear()) return false;
    return true;
  }
  if (isFunction(range)) {
    for (let m = 0; m < 12; m++) {
      if (monthHasAnyAllowed(range, year, m)) return true;
    }
    return false;
  }
  return true;
}

// 判断某年代（以结束年份表示）是否存在可选日期
export function decadeHasAnyAllowed(range: PickerDateRange, decadeEndYear: number): boolean {
  const start = decadeEndYear - 9;
  for (let y = start; y <= decadeEndYear; y++) {
    if (yearHasAnyAllowed(range, y)) return true;
  }
  return false;
}

// 计算分页（上一页/下一页）禁用状态
export function computePaginationDisabled(
  range: PickerDateRange,
  mode: 'date' | 'week' | 'month' | 'quarter' | 'year',
  year: number,
  month: number | undefined,
): { prev: boolean; next: boolean } {
  const monthCountMap: Record<string, number> = { date: 1, week: 1, month: 12, quarter: 12, year: 120 };
  const monthCount = monthCountMap[mode] || 0;
  const current = new Date(year, month || 0);
  const prev = new Date(current.getFullYear(), current.getMonth() - monthCount);
  const next = new Date(current.getFullYear(), current.getMonth() + monthCount);

  const { min, max } = getRangeBounds(range);

  const cmpYearMonth = (a: Date, b: Date): number => {
    if (a.getFullYear() !== b.getFullYear()) return a.getFullYear() - b.getFullYear();
    return a.getMonth() - b.getMonth();
  };

  let prevDisabled = false;
  let nextDisabled = false;

  if (isArray(range)) {
    if (min) {
      if (mode === 'date' || mode === 'week') prevDisabled = cmpYearMonth(prev, min) < 0;
      else prevDisabled = prev.getFullYear() < min.getFullYear();
    }
    if (max) {
      if (mode === 'date' || mode === 'week') nextDisabled = cmpYearMonth(next, max) > 0;
      else nextDisabled = next.getFullYear() > max.getFullYear();
    }
    if (mode === 'year') {
      if (min) prevDisabled = prev.getFullYear() < min.getFullYear();
      if (max) nextDisabled = next.getFullYear() > max.getFullYear();
    }
  } else if (isFunction(range)) {
    if (mode === 'date' || mode === 'week') {
      prevDisabled = !monthHasAnyAllowed(range, prev.getFullYear(), prev.getMonth());
      nextDisabled = !monthHasAnyAllowed(range, next.getFullYear(), next.getMonth());
    } else if (mode === 'month' || mode === 'quarter') {
      prevDisabled = !yearHasAnyAllowed(range, prev.getFullYear());
      nextDisabled = !yearHasAnyAllowed(range, next.getFullYear());
    } else if (mode === 'year') {
      const prevDecadeEnd = prev.getFullYear() - (prev.getFullYear() % 10) + 9;
      const nextDecadeEnd = next.getFullYear() - (next.getFullYear() % 10) + 9;
      prevDisabled = !decadeHasAnyAllowed(range, prevDecadeEnd);
      nextDisabled = !decadeHasAnyAllowed(range, nextDecadeEnd);
    }
  }

  return { prev: prevDisabled, next: nextDisabled };
}

export function useSelectRange(props: {
  range: TdDatePickerProps['range'];
  mode: TdDatePickerProps['mode'];
  year: Ref<number>;
  month?: Ref<number | undefined>;
}) {
  const rangeBounds = computed(() => getRangeBounds(props.range));

  const monthAllowed = (year: number, month: number): boolean => monthHasAnyAllowed(props.range, year, month);
  const yearAllowed = (year: number): boolean => yearHasAnyAllowed(props.range, year);
  const decadeAllowed = (decadeEndYear: number): boolean => decadeHasAnyAllowed(props.range, decadeEndYear);

  const paginationDisabled = computed(() =>
    computePaginationDisabled(props.range, props.mode as any, props.year.value, props.month?.value),
  );

  const canLoadMoreTop = (firstValue: number): boolean => {
    const { min } = rangeBounds.value;

    if (isArray(props.range)) {
      if (!min) return true;
      const minYear = min.getFullYear();
      if (props.mode === 'year') {
        const minDecadeEnd = Math.floor(minYear / 10) * 10 + 9;
        return firstValue > minDecadeEnd;
      }
      return firstValue > minYear;
    }

    if (isFunction(props.range)) {
      if (props.mode === 'year') {
        for (let i = firstValue - 10; i >= firstValue - 50; i -= 10) {
          if (decadeAllowed(i)) return true;
        }
        return false;
      }
      for (let i = firstValue - 1; i > firstValue - 10; i--) {
        if (yearAllowed(i)) return true;
      }
      return false;
    }

    return true;
  };

  const canLoadMoreBottom = (lastValue: number): boolean => {
    const { max } = rangeBounds.value;

    if (isArray(props.range)) {
      if (!max) return true;
      const maxYear = max.getFullYear();
      if (props.mode === 'year') {
        const maxDecadeEnd = Math.floor(maxYear / 10) * 10 + 9;
        return lastValue < maxDecadeEnd;
      }
      return lastValue < maxYear;
    }

    if (isFunction(props.range)) {
      if (props.mode === 'year') {
        for (let i = lastValue + 10; i <= lastValue + 50; i += 10) {
          if (decadeAllowed(i)) return true;
        }
        return false;
      }
      for (let i = lastValue + 1; i <= lastValue + 10; i++) {
        if (yearAllowed(i)) return true;
      }
      return false;
    }

    return true;
  };

  return {
    rangeBounds,
    monthHasAnyAllowed: monthAllowed,
    yearHasAnyAllowed: yearAllowed,
    decadeHasAnyAllowed: decadeAllowed,
    paginationDisabled,
    canLoadMoreTop,
    canLoadMoreBottom,
  };
}
