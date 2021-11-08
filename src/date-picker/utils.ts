import chunk from 'lodash/chunk';
import { TdCSSProperties } from './interface';

/**
 * next Month
 * @param { Date } date
 * @returns {Date}
 */
export const nextMonth = (date: Date) => {
  const isPassYear = date.getMonth() === 11;
  const newMonth = isPassYear ? 0 : date.getMonth() + 1;
  const year = isPassYear ? date.getFullYear() + 1 : date.getFullYear();
  return new Date(year, newMonth, 1);
};

/**
 * prev Month
 * @param {Date} date
 * @returns {Date}
 */
export const prevMonth = (date: Date) => {
  const passYear = date.getMonth() === 0;
  const newMonth = passYear ? 11 : date.getMonth() - 1;
  const year = passYear ? date.getFullYear() - 1 : date.getFullYear();
  return new Date(year, newMonth, 1);
};

/**
 * Empty value
 * @param mixedVar
 * @returns {Boolean}
 * @example
 * // example 1: empty(null)
 * // returns 1: true
 * // example 2: empty(undefined)
 * // returns 2: true
 * // example 3: empty([])
 * // returns 3: true
 * // example 4: empty({})
 * // returns 4: true
 * // example 5: empty({'fn' : function () {} })
 * // returns 5: false
 */
export function empty(mixedVar: any): mixedVar is undefined | null | false | '' | {} {
  let undef: undefined;
  const emptyValues = [undef, null, false, ''];
  for (let i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixedVar === 'object') {
    return Object.keys(mixedVar).length < 1;
  }

  return false;
}

/**
 * To Dashed from Camel Case
 * @param {String} strCamelCase
 * @returns {string}
 * @example
 * toDash('strCamelCase') === 'str-camel-case'
 */
export function toDash(strCamelCase: string): string {
  return String(strCamelCase)
    .split(/(?=[A-Z])/)
    .join('-')
    .toLowerCase();
}

export function setStyles(el: HTMLElement | SVGElement, styles: TdCSSProperties) {
  Object.entries(styles).forEach(([prop, val = null]) => {
    if (empty(val)) {
      el.style.removeProperty(prop);
      return;
    }
    const [value, pri = ''] = String(val).split('!');

    el.style.setProperty(toDash(prop), value, pri);
  });
}

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

function isSameYear(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear();
}

function isSameMonth(date1: Date, date2: Date) {
  return isSameYear(date1, date2) && date1.getMonth() === date2.getMonth();
}

function isSameDate(date1: Date, date2: Date) {
  return isSameMonth(date1, date2) && date1.getDate() === date2.getDate();
}

/**
 * 是否是某法范围内的日期，精确到日
 * @param {Date} value 目标日期
 * @param {Object} { start, end } 范围
 * @returns {Boolean}
 */
function isBetween(
  value: { getFullYear: () => number; getMonth: () => number; getDate: () => number },
  { start, end }: { start: any; end: any },
): boolean {
  const date = new Date(value.getFullYear(), value.getMonth(), value.getDate());

  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  return startTime <= date && endTime >= date;
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
export function isSame(date1: Date, date2: Date, type = 'date'): boolean {
  const func = {
    isSameYear,
    isSameMonth,
    isSameDate,
  };
  return func[`isSame${firstUpperCase(type)}`](date1, date2);
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
    meridiem: tempDate.getHours() > 11 ? 'PM' : 'AM',
  };
}

/**
 * 设置日期对象的时间部分
 * @param {Date} d 日期
 * @param {Number} hour 小时
 * @param {Number} min 分钟
 * @param {Number} sec 秒
 * @returns {Date} 一个新的date
 */
export function setDateTime(d: Date, hour: number, min: number, sec: number): Date {
  // eslint-disable-next-line
  const { year, month, date } = getDateObj(d);
  return new Date(year, month, date, hour, min, sec, 0);
}

/**
 * 增加月份
 * @param {Date} date 起始日期
 * @param {Number} num 月份数
 * @returns {Date}
 */
export function subtractMonth(date: Date, num: any): Date {
  const day = date.getDate();
  const newDate = new Date(date);

  let NUM = num;
  // eslint-disable-next-line no-plusplus
  while (NUM--) {
    newDate.setDate(0);
  }
  newDate.setDate(day);
  return newDate;
}

/**
 * 减月份
 * @param {Date} date 起始日期
 * @param {Number} num 月份数
 * @returns {Date}
 */
export function addMonth(date: Date, num: number): Date {
  let NUM = num;
  if (NUM < 0) NUM = 0;
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + NUM);
  return newDate;
}

interface OptionsType {
  firstDayOfWeek: number;
  disableDate: Function;
  minDate: Date;
  maxDate: Date;
}

export function getWeeks(
  { year, month }: { year: number; month: number },
  {
    firstDayOfWeek,
    disableDate = () => false,
    minDate,
    maxDate,
  }: OptionsType,
) {
  const prependDay = getFirstDayOfMonth({ year, month });

  const appendDay = getLastDayOfMonth({ year, month });

  const maxDays = getDaysInMonth({ year, month });

  const daysArr = [];

  const today = getToday();

  for (let i = 1; i <= maxDays; i++) {
    const currentDay = new Date(year, month, i);

    daysArr.push({
      text: i,
      active: false,
      value: currentDay,
      disabled: disableDate(currentDay) || outOfRanges(currentDay, minDate, maxDate),
      now: isSame(today, currentDay),
      firstDayOfMonth: i === 1,
      lastDayOfMonth: i === maxDays,
      type: 'current-month',
    });
  }

  if (prependDay.getDay() !== firstDayOfWeek) {
    prependDay.setDate(0); // 上一月

    while (true) {
      daysArr.unshift({
        text: prependDay.getDate().toString(),
        active: false,
        value: new Date(prependDay),
        disabled: disableDate(prependDay) || outOfRanges(prependDay, minDate, maxDate),
        additional: true, // 非当前月
        type: 'prev-month',
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
      disabled: disableDate(appendDay) || outOfRanges(appendDay, minDate, maxDate),
      additional: true, // 非当前月
      type: 'next-month',
    });
  }

  return chunk(daysArr, 7);
}

export function getYears(
  year: number,
  {
    disableDate = () => false,
    minDate,
    maxDate,
  }: OptionsType,
) {
  const startYear = parseInt((year / 10).toString(), 10) * 10;
  const endYear = startYear + 9;

  const yearArr = [];

  const today = getToday();

  for (let i = startYear; i <= endYear; i++) {
    const date = new Date(i, 1);

    let disabledMonth = 0;
    let outOfRangeMonth = 0;

    for (let j = 0; j < 12; j++) {
      const d = new Date(i, j);
      if (disableDate(d)) disabledMonth += 1;
      if (outOfRanges(d, minDate, maxDate)) outOfRangeMonth += 1;
    }

    yearArr.push({
      value: date,
      now: isSame(date, today, 'year'),
      disabled: disabledMonth === 12 || outOfRangeMonth === 12,
      active: false,
      text: `${date.getFullYear()}`,
    });
  }

  return chunk(yearArr, 4);
}

export function getMonths(year: number, { disableDate = () => false, minDate, maxDate }: OptionsType) {
  const MONTH_ARR = [];

  const today = getToday();

  for (let i = 0; i <= 11; i++) {
    const date = new Date(year, i);

    let disabledDay = 0;
    let outOfRangeDay = 0;

    const daysInMonth = getDaysInMonth({ year, month: i });

    for (let j = 1; j <= daysInMonth; j++) {
      const d = new Date(year, i, j);
      if (disableDate(d)) disabledDay += 1;
      if (outOfRanges(d, minDate, maxDate)) outOfRangeDay += 1;
    }

    MONTH_ARR.push({
      value: date,
      now: isSame(date, today, 'month'),
      disabled: disabledDay === daysInMonth || outOfRangeDay === daysInMonth,
      active: false,
      text: `${date.getMonth() + 1} 月`,
    });
  }

  return chunk(MONTH_ARR, 4);
}

export interface DateTime {
  active: boolean;
  highlight: boolean;
  startOfRange: boolean;
  endOfRange: boolean;
  value: Date;
}

export function flagActive(data: any[], { ...args }: any) {
  const { start, end, type = 'date' } = args;

  if (!end) {
    return data.map((row: any[]) => row.map((item: DateTime) => {
      const ITEM = item;
      ITEM.active = isSame(item.value, start, type);
      return ITEM;
    }));
  }

  return data.map((row: any[]) => row.map((item: DateTime) => {
    const ITEM = item;
    const date = item.value;
    const isStart = isSame(start, date, type);
    const isEnd = isSame(end, date, type);
    ITEM.active = isStart || isEnd;
    ITEM.highlight = isBetween(date, { start, end });
    ITEM.startOfRange = isStart;
    ITEM.endOfRange = isEnd;
    return ITEM;
  }));
}

// extract time format from a completed date format 'YYYY-MM-DD HH:mm' -> 'HH:mm'
export function extractTimeFormat(dateFormat: string) {
  const res = dateFormat.match(/(a\s)?h{1,2}:m{1,2}(:s{1,2})?(\sa)?/i);
  if (!res) return null;
  return res[0];
}
