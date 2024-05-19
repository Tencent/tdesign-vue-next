import isFunction from 'lodash/isFunction';
import dayjs from 'dayjs';
import dayJsIsBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import localeData from 'dayjs/plugin/localeData';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import chunk from 'lodash/chunk';
import { parseToDayjs } from './format';

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(localeData);
dayjs.extend(quarterOfYear);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(dayJsIsBetween);

/**
 * 首字母大写
 * @param {String} str 目标字符串
 * @returns {String}
 */
export function firstUpperCase(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase().concat(str.substring(1, str.length));
}

interface DateObj {
  year: number;
  month: number;
}

/**
 * 返回指定年、月的第一天日期
 * @param {Object} { year, month }
 * @returns {Date}
 */
function getFirstDayOfMonth({ year, month }: DateObj): Date {
  return new Date(year, month, 1);
}

/**
 * 返回指定年、月的天数
 * @param {Object} { year, month }
 * @returns {Number}
 */
function getDaysInMonth({ year, month }: DateObj): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * 返回指定年、月的最后一天日期
 * @param {Object} { year, month }
 * @returns {Date}
 */
function getLastDayOfMonth({ year, month }: DateObj): Date {
  return new Date(year, month, getDaysInMonth({ year, month }));
}

function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}

function isSameQuarter(date1: Date, date2: Date): boolean {
  return isSameYear(date1, date2) && dayjs(date1).quarter() === dayjs(date2).quarter();
}

function isSameMonth(date1: Date, date2: Date): boolean {
  return isSameYear(date1, date2) && date1.getMonth() === date2.getMonth();
}

function isSameWeek(date1: Date, date2: Date, dayjsLocale = 'zh-cn'): boolean {
  return isSameMonth(date1, date2) && dayjs(date1).locale(dayjsLocale).week() === dayjs(date2).locale(dayjsLocale).week();
}

function isSameDate(date1: Date, date2: Date): boolean {
  return isSameMonth(date1, date2) && date1.getDate() === date2.getDate();
}

/**
 * 比较两个日期对象的时间戳
 * @param {Date} date1 日期1
 * @param {Date} date2 日期2
 * @returns {Number} 返回 date1.getTime() - date2.getTime() 的差值
 */
function compareAsc(date1: { getTime: () => any }, date2: Date): number {
  const d1 = date1.getTime();
  const d2 = date2.getTime();

  if (d1 < d2) return -1;
  if (d1 > d2) return 1;
  return 0;
}

/**
 * 比较两个 Date 是否是同一天 或则 同一月 或则 同一年
 * @param {Date} date1 比较的日期
 * @param {Date} date2 比较的日期
 * @param {String} type 比较类型，默认比较到『日』 date|month|year
 * @returns {Boolean}
 */
export function isSame(date1: Date, date2: Date, type = 'date', dayjsLocale = 'zh-cn'): boolean {
  const func = {
    isSameYear,
    isSameQuarter,
    isSameMonth,
    isSameWeek,
    isSameDate,
  };
  return func[`isSame${firstUpperCase(type)}`](date1, date2, dayjsLocale);
}

export function outOfRanges(d: Date, min: any, max: any) {
  return (min && compareAsc(d, min) === -1) || (max && compareAsc(d, max) === 1);
}

/**
 * @returns {Date} 当天零点的日期对象
 */
export function getToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
}

/**
 * 返回日期对象的年、月、日、小时、分钟、秒、12小时制标识
 * @param {Date} date
 * @returns {Object}
 */
export function getDateObj(date: Date) {
  let tempDate = date;
  if (!(date instanceof Date)) {
    tempDate = getToday();
  }
  return {
    year: tempDate.getFullYear(),
    month: tempDate.getMonth(),
    date: tempDate.getDate(),
    hours: tempDate.getHours(),
    minutes: tempDate.getMinutes(),
    seconds: tempDate.getSeconds(),
    milliseconds: tempDate.getMilliseconds(),
    meridiem: tempDate.getHours() > 11 ? 'PM' : 'AM',
  };
}

/**
 * 设置日期对象的时间部分
 * @param {Date} date 日期
 * @param {Number} hours 小时
 * @param {Number} minutes 分钟
 * @param {Number} seconds 秒
 * @param {Number} milliseconds 毫秒
 * @returns {Date} 一个新的date
 */
export function setDateTime(
  date: Date,
  hours: number,
  minutes: number,
  seconds: number,
  milliseconds?: number
): Date {
  return dayjs(date)
    .hour(hours)
    .minute(minutes)
    .second(seconds)
    .millisecond(milliseconds)
    .toDate();
}

/**
 * 减少月份
 * @param {Date} date 起始日期
 * @param {Number} num 月份数
 * @returns {Date}
 */
export function subtractMonth(date: Date, num: number): Date {
  return dayjs(date).subtract(num, 'month').toDate();
}

/**
 * 增加月份
 * @param {Date} date 起始日期
 * @param {Number} num 月份数
 * @returns {Date}
 */
export function addMonth(date: Date, num: number): Date {
  return dayjs(date).add(num, 'month').toDate();
}

export type DateValue = string | Date | number;
export interface DisableDateObj { from?: string; to?: string; before?: string; after?: string }
export type DisableDate = Array<DateValue> | DisableDateObj | ((date: DateValue) => boolean);

export interface OptionsType {
  firstDayOfWeek: number;
  disableDate: DisableDate;
  minDate: Date;
  maxDate: Date;
  showWeekOfYear?: Boolean;
  dayjsLocale?: string;
  monthLocal?: string[];
  quarterLocal?: string[];
  cancelRangeSelectLimit?: boolean;
}

export function getWeeks(
  { year, month }: { year: number; month: number },
  {
    firstDayOfWeek,
    showWeekOfYear = false,
    disableDate = () => false,
    minDate,
    maxDate,
    dayjsLocale = 'zh-cn',
    cancelRangeSelectLimit = false,
  }: OptionsType,
) {
  const prependDay = getFirstDayOfMonth({ year, month });
  const appendDay = getLastDayOfMonth({ year, month });
  const maxDays = getDaysInMonth({ year, month });
  const daysArr = [];
  let i = 1;
  const today = getToday();
  for (i; i <= maxDays; i++) {
    const currentDay = new Date(year, month, i);
    daysArr.push({
      text: i,
      active: false,
      value: currentDay,
      disabled: (isFunction(disableDate) && disableDate(currentDay))
        || (!cancelRangeSelectLimit && outOfRanges(currentDay, minDate, maxDate)),
      now: isSame(today, currentDay),
      firstDayOfMonth: i === 1,
      lastDayOfMonth: i === maxDays,
      type: 'current-month',
      dayjsObj: dayjs(currentDay).locale(dayjsLocale),
    });
  }

  if (prependDay.getDay() !== firstDayOfWeek) {
    prependDay.setDate(0); // 上一月
    while (true) {
      daysArr.unshift({
        text: prependDay.getDate().toString(),
        active: false,
        value: new Date(prependDay),
        disabled: (isFunction(disableDate) && disableDate(prependDay)) || (!cancelRangeSelectLimit && outOfRanges(prependDay, minDate, maxDate)),
        additional: true, // 非当前月
        type: 'prev-month',
        dayjsObj: dayjs(prependDay).locale(dayjsLocale),
      });
      prependDay.setDate(prependDay.getDate() - 1);
      if (prependDay.getDay() === Math.abs(firstDayOfWeek + 6) % 7) break;
    }
  }

  const LEN = 42; // 显示6周
  while (daysArr.length < LEN) {
    appendDay.setDate(appendDay.getDate() + 1);
    daysArr.push({
      text: appendDay.getDate(),
      active: false,
      value: new Date(appendDay),
      disabled: (isFunction(disableDate) && disableDate(appendDay)) || (!cancelRangeSelectLimit && outOfRanges(appendDay, minDate, maxDate)),
      additional: true, // 非当前月
      type: 'next-month',
      dayjsObj: dayjs(appendDay).locale(dayjsLocale),
    });
  }

  const dataList = chunk(daysArr, 7);
  // 显示周数
  if (showWeekOfYear) {
    dataList.forEach((d) => {
      d.unshift({
        ...d[0],
        active: false,
        value: d[0].value,
        text: dayjs(d[0].value).locale(dayjsLocale).week(),
        dayjsObj: dayjs(d[0].value).locale(dayjsLocale),
      });
    });
  }

  return dataList;
}

export function getQuarters(
  year: number,
  {
    disableDate = () => false,
    minDate,
    maxDate,
    quarterLocal,
    dayjsLocale = 'zh-cn',
    cancelRangeSelectLimit = false,
  }: OptionsType,
) {
  const quarterArr = [];
  const today = getToday();

  for (let i = 1; i <= 4; i++) {
    const date = dayjs(new Date(year, 0)).quarter(i).toDate();

    quarterArr.push({
      value: date,
      now: isSame(date, today, 'quarter'),
      disabled: (isFunction(disableDate) && disableDate(date)) || (!cancelRangeSelectLimit && outOfRanges(date, minDate, maxDate)),
      active: false,
      text: quarterLocal[i - 1],
      dayjsObj: dayjs(date).locale(dayjsLocale),
    });
  }

  return chunk(quarterArr, 4);
}

export function getYears(
  year: number,
  {
    disableDate = () => false,
    minDate,
    maxDate,
    dayjsLocale = 'zh-cn',
    cancelRangeSelectLimit = false,
  }: OptionsType,
) {
  const startYear = parseInt((year / 10).toString(), 10) * 10;
  const endYear = startYear + 9;

  const yearArr = [];

  const today = getToday();

  for (let i = startYear; i <= endYear; i++) {
    const date = new Date(i, 1);

    yearArr.push({
      value: date,
      now: isSame(date, today, 'year'),
      disabled: (isFunction(disableDate) && disableDate(date)) || (!cancelRangeSelectLimit && outOfRanges(date, minDate, maxDate)),
      active: false,
      text: `${date.getFullYear()}`,
      dayjsObj: dayjs(date).locale(dayjsLocale),
    });
  }

  return chunk(yearArr, 3);
}

export function getMonths(year: number, params: OptionsType) {
  const {
    disableDate = () => false, minDate, maxDate, monthLocal, dayjsLocale = 'zh-cn', cancelRangeSelectLimit = false,
  } = params;
  const MonthArr = [];
  const today = getToday();

  for (let i = 0; i <= 11; i++) {
    const date = new Date(year, i);

    MonthArr.push({
      value: date,
      now: isSame(date, today, 'month'),
      disabled: (isFunction(disableDate) && disableDate(date)) || (!cancelRangeSelectLimit && outOfRanges(date, minDate, maxDate)),
      active: false,
      text: monthLocal[date.getMonth()], // `${date.getMonth() + 1} ${monthText || '月'}`,
      dayjsObj: dayjs(date).locale(dayjsLocale),
    });
  }

  return chunk(MonthArr, 3);
}

export interface DateTime {
  additional: boolean;
  active: boolean;
  highlight: boolean;
  hoverHighlight: boolean;
  startOfRange: boolean;
  endOfRange: boolean;
  hoverStartOfRange: boolean;
  hoverEndOfRange: boolean;
  value: Date;
}

export function flagActive(data: any[], { ...args }: any) {
  const { start, end, hoverStart, hoverEnd, type = 'date', isRange = false } = args;

  // 周选择器不更改 cell 样式
  if (type === 'week') return data;

  if (!isRange) {
    return data.map((row: any[]) => row.map((item: DateTime) => {
      const _item = item;
      _item.active = start && isSame(item.value, start, type) && !_item.additional;
      return _item;
    }));
  }

  return data.map((row: any[]) => row.map((item: DateTime) => {
    const _item = item;
    const date = item.value;

    const isStart = start && isSame(start, date, type);
    const isHoverStart = hoverStart && isSame(hoverStart, date, type);
    const isEnd = end && isSame(end, date, type);
    const isHoverEnd = hoverEnd && isSame(hoverEnd, date, type);
    _item.active = (isStart || isEnd) && !_item.additional;

    if (start && end) {
      _item.highlight = dayjs(date).isBetween(start, end, type, '[]') && !_item.additional;
      _item.startOfRange = isStart;
      _item.endOfRange = isEnd;
    }

    if (hoverStart && hoverEnd) {
      _item.hoverHighlight = dayjs(date).isBetween(hoverStart, hoverEnd, type, '[]') && !_item.additional;
      _item.hoverStartOfRange = isHoverStart;
      _item.hoverEndOfRange = isHoverEnd;
    }
    return _item;
  }));
}

// extract time format from a completed date format 'YYYY-MM-DD HH:mm' -> 'HH:mm'
export function extractTimeFormat(dateFormat: string = '') {
  const res = dateFormat.match(/(a\s)?h{1,2}(:m{1,2})?(:s{1,2})?(\sa)?/i);
  if (!res) return null;
  return res[0];
}

/**
 * 返回时间对象的小时、分钟、秒、12小时制标识
 * @param {String} timeFormat 'pm 20:11:11:333'
 * @returns {Object}
 */
export function extractTimeObj(timeFormat: string = '') {
  const matchedMeridiem = timeFormat.match(/[ap]m/i) || [''];
  const timeReg = /\d{1,2}(:\d{1,2})?(:\d{1,2})?(:\d{1,3})?/;
  const matchedTimeStr = timeFormat.match(timeReg) || ['0:0:0:0'];
  const [hours = 0, minutes = 0, seconds = 0, milliseconds = 0] = matchedTimeStr[0].split(':');

  return {
    hours: +hours,
    minutes: +minutes,
    seconds: +seconds,
    milliseconds: +milliseconds,
    meridiem: matchedMeridiem[0],
  };
}

/**
 * 日期是否可用
 * @param {Object} { value, disableDate, mode, format }
 * @returns {Boolean}
 */
export function isEnabledDate({
  value,
  disableDate,
  mode,
  format,
}: {
  value: Date;
  mode: 'year' | 'month' | 'date' | 'quarter' | 'week';
  format: string;
  disableDate: any;
}): boolean {
  if (!disableDate) return true;

  const availableMode = mode === 'quarter' ? 'date' : mode;

  let isEnabled = true;
  // 值类型为 Function 则表示返回值为 true 的日期会被禁用
  if (isFunction(disableDate)) {
    return !disableDate(value);
  }

  // 禁用日期，示例：['A', 'B'] 表示日期 A 和日期 B 会被禁用。
  if (Array.isArray(disableDate)) {
    const formattedDisabledDate = disableDate.map((item: string) => parseToDayjs(item, format));
    // eslint-disable-next-line
    const isIncludes = formattedDisabledDate.some(item => item.isSame(dayjs(value)));
    return !isIncludes;
  }

  // { from: 'A', to: 'B' } 表示在 A 到 B 之间的日期会被禁用。
  // eslint-disable-next-line
  const { from, to, before, after } = disableDate;

  if (from && to) {
    const compareMin = dayjs(new Date(from));
    const compareMax = dayjs(new Date(to));

    return !dayjs(value).isBetween(compareMin, compareMax, availableMode, '[]');
  }

  const min = before ? new Date(before) : null;
  const max = after ? new Date(after) : null;

  // { before: 'A', after: 'B' } 表示在 A 之前和在 B 之后的日期都会被禁用。
  if (max && min) {
    const compareMin = dayjs(new Date(min));
    const compareMax = dayjs(new Date(max));

    isEnabled = dayjs(value).isBetween(compareMin, compareMax, availableMode, '[]');
  } else if (min) {
    const compareMin = dayjs(new Date(min));
    isEnabled = !dayjs(value).isBefore(compareMin, availableMode);
  } else if (max) {
    const compareMax = dayjs(new Date(max));
    isEnabled = !dayjs(value).isAfter(compareMax, availableMode);
  }
  return isEnabled;
}

/**
 * formatDate 方法需要date作为入参，部分场景需要将timestamp或格式化后的时间string转换为date进行使用
 */
export function covertToDate(value: string, valueType: string) {
  return valueType === 'time-stamp'
    ? new Date(value)
    : dayjs(value, valueType).toDate();
}
