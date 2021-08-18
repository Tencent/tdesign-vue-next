import dayjs from 'dayjs';

import { CalendarCell } from './type';

// 组件的一些常量
import {
  FIRST_MONTH_OF_YEAR,
  LAST_MONTH_OF_YEAR,
  DAY_CN_MAP,
} from './const';

/**
 * 获取一个日期是周几（1~7）
 */
const getDay = (dt: Date): number => {
  let day = dayjs(dt).day();
  if (day === 0) {
    day = 7;
  }
  return day;
};

/**
 * 获取星期的中文
 * @param num 星期（1~7）
 */
const getDayCn = (num: number): string => {
  let re = '';
  const numStr = num.toString();
  if (numStr in DAY_CN_MAP) {
    re = DAY_CN_MAP[numStr];
  }
  return re;
};

/**
 * 获取一个日期在日历上的列下标
 * @param firstDayOfWeek 周起始日（1~7）
 * @param dt
 */
const getCellColIndex = (firstDayOfWeek: number, dt: Date): number => {
  let re = 0;
  const day = getDay(dt);
  if (day >= firstDayOfWeek) {
    re = day - firstDayOfWeek;
  } else {
    re = 7 - firstDayOfWeek + day;
  }
  return re;
};
/**
 * 返回日期+天数（天数可以负数）
 */
const addDate = (dt: Date, days: number) => {
  const d = new Date(dt);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * 创建月历单元格数据
 * @param year 月历年份
 * @param curDate 当前日期
 */
const createYearCellsData = (
  year: number,
  curDate: dayjs.Dayjs,
  format: string,
): CalendarCell[] => {
  const monthsArr: CalendarCell[] = [];
  const isCurYear = curDate.year() === year;
  for (let num = FIRST_MONTH_OF_YEAR; num <= LAST_MONTH_OF_YEAR; num++) {
    const date = new Date(year, num - 1);
    const curDateMon = parseInt(curDate.format('M'), 10);
    const isCurrent = (isCurYear && curDateMon === num);
    monthsArr.push({
      mode: 'year',
      isCurrent,
      date,
      formattedDate: dayjs(date).format(format),
      filterDate: null,
      formattedFilterDate: null,
      isShowWeekend: true,
    });
  }

  return monthsArr;
};

/**
 * 创建日历单元格数据
 * @param year 日历年份
 * @param month 日历月份
 * @param firstDayOfWeek 周起始日（1~7）
 * @param curDate 当前日期
 * @param format 日期格式
 */
const createMonthCellsData = (
  year: number,
  month: number,
  firstDayOfWeek: number,
  curDate: dayjs.Dayjs,
  format: string,
): CalendarCell[][] => {
  const daysArr: CalendarCell[][] = [];
  // 当前月份的开始日期
  const begin: Date = dayjs(`${year}-${month}`).startOf('month')
    .toDate();
  // 当前月份的结束日期
  const end: Date = dayjs(`${year}-${month}`).endOf('month')
    .toDate();
  const days = end.getDate();

  const beginDateColIndex = getCellColIndex(firstDayOfWeek, begin);
  let arr = [];
  let num = 1;

  const createCellData = (
    belongTo: number,
    isCurrent: boolean,
    date: Date,
    weekOrder: number
  ): CalendarCell => {
    const day = getDay(date);
    return {
      mode: 'month',
      belongTo,
      isCurrent,
      day,
      weekOrder,
      date,
      formattedDate: dayjs(date).format(format),
      filterDate: null,
      formattedFilterDate: null,
      isShowWeekend: true,
    };
  };

  // 添加上个月中和当前月第一天同一周的日期
  for (let i = 0; i < beginDateColIndex; i++) {
    const date = addDate(begin, (i - beginDateColIndex));
    arr.push(createCellData(-1, false, date, num));
    if (arr.length === 7) {
      daysArr.push(arr);
      arr = [];
      num += 1;
    }
  }
  for (let i = 0; i < days; i++) {
    const date = addDate(begin, i);
    arr.push(createCellData(0, curDate.isSame(dayjs(date)), date, num));
    if (arr.length === 7) {
      daysArr.push(arr);
      arr = [];
      num += 1;
    }
  }
  // 添加下个月中和当前月最后同一周的日期
  if (arr.length) {
    const nextMonthCellNum = 7 - arr.length;
    for (let i = 0 ; i < nextMonthCellNum; i++) {
      const date = addDate(end, i + 1);
      arr.push(createCellData(1, false, date, num));
    }
    daysArr.push(arr);
  }

  return daysArr;
};


export {
  getDayCn,
  getCellColIndex,
  addDate,
  createYearCellsData,
  createMonthCellsData,
};
