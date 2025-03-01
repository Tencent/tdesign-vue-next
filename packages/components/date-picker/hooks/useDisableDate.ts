import dayjs from 'dayjs';
import { isArray, isFunction, isObject } from 'lodash-es';
import dayJsIsBetween from 'dayjs/plugin/isBetween';

dayjs.extend(dayJsIsBetween);

import type { TdDatePickerProps, TdDateRangePickerProps } from '../type';

export interface disableDateProps {
  disableDate?: TdDatePickerProps['disableDate'] | TdDateRangePickerProps['disableDate'];
  format?: TdDatePickerProps['format'];
  mode?: TdDatePickerProps['mode'];
  start?: Date;
  end?: Date;
}

export default function useDisableDate(props: disableDateProps) {
  return {
    disableDate: (value: Date) =>
      !isEnabled({ disableDate: props.disableDate, format: props.format, mode: props.mode, value }),
    minDate:
      isObject(props.disableDate) && 'before' in props.disableDate ? new Date(props.disableDate.before) : props.start,
    maxDate:
      isObject(props.disableDate) && 'after' in props.disableDate ? new Date(props.disableDate.after) : props.end,
  };
}

function isEnabled(props: any): boolean {
  if (!props.disableDate) return true;

  let isEnabled = true;
  // 值类型为 Function 则表示返回值为 true 的日期会被禁用
  if (isFunction(props.disableDate)) {
    return !props.disableDate(props.value);
  }

  // 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。
  if (isArray(props.disableDate)) {
    let isIncludes = false;
    const formatedDisabledDate = props.disableDate.map((item: string) => dayjs(item, props.format));
    formatedDisabledDate.forEach((item: any) => {
      if (item.isSame(dayjs(props.value))) {
        isIncludes = true;
      }
    });
    return !isIncludes;
  }

  // { from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。
  if (props.disableDate.from && props.disableDate.to) {
    const compareMin = dayjs(new Date(props.disableDate.from));
    const compareMax = dayjs(new Date(props.disableDate.to));

    return !dayjs(props.value).isBetween(compareMin, compareMax, props.mode, '[]');
  }

  const min = props.disableDate.before ? new Date(props.disableDate.before) : null;
  const max = props.disableDate.after ? new Date(props.disableDate.after) : null;

  // { before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。
  if (max && min) {
    const compareMin = dayjs(new Date(min));
    const compareMax = dayjs(new Date(max));

    isEnabled = dayjs(props.value).isBetween(compareMin, compareMax, props.mode, '[]');
  } else if (min) {
    const compareMin = dayjs(new Date(min));
    isEnabled = !dayjs(props.value).isBefore(compareMin, props.mode);
  } else if (max) {
    const compareMax = dayjs(new Date(max));
    isEnabled = !dayjs(props.value).isAfter(compareMax, props.mode);
  }
  return isEnabled;
}
