import {
  DAY_CN_MAP,
  MONTH_CN_MAP,
} from './const';

const getYear = (dt: Date): number => dt.getFullYear();
const getMonth = (dt: Date): number => (dt.getMonth() + 1);

const getCurDate = (): Date => new Date();
const getCurYear = (): number => getYear(new Date());
const getCurMonth = (): number => getMonth(new Date());


const getBeginOfMonth = (year: number, month: number): Date => new Date(year, (month - 1));
const getEndOfMonth = (year: number, month: number): Date => new Date(new Date(year, month).getTime() - 1);
/**
 * 获取一个日期是周几（1~7）
 */
const getDay = (dt: Date): number => {
  let day = dt.getDay();
  if (day === 0) {
    day = 7;
  }
  return day;
};
/**
 * 获取星期的中文
 * @param num 星期（数字）
 */
const getDayCn = (num: number): string => {
  let re = '';
  const map = DAY_CN_MAP;
  const numStr = num.toString();
  if (numStr in map) {
    re = map[numStr].shortDisplay;
  }
  return re;
};

/**
 * 获取一个日期在日历上是第几列
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
 * 转日期字符串（y-m）
 */
const getMonthStr = (dt: Date) => {
  const y = dt.getFullYear();
  const m = dt.getMonth() + 1;
  return `${y}-${m}`;
};
/**
 * 转日期字符串（y-m-d）
 */
const getDateStr = (dt: Date) => {
  const y = dt.getFullYear();
  const m = dt.getMonth() + 1;
  const d = dt.getDate();
  return `${y}-${m}-${d}`;
};

/**
 * 对比两个日期，返回这两个日期是否是“同一天”
 * @param dt 日期
 * @param dtCompare 对比的日期
 */
const isSameDate = (dt: Date, dtCompare: Date): boolean => {
  let re = false;
  if (dt && dtCompare) {
    re = (dt.getFullYear() === dtCompare.getFullYear()
      && dt.getMonth() === dtCompare.getMonth()
      && dt.getDate() === dtCompare.getDate());
  }
  return re;
};

const createYearCellsData = (year: number, curDate: Date, theme: string) => {
  const monthsArr: any[] = [];
  const map = MONTH_CN_MAP;
  const isCurYear = getYear(curDate) === year;
  for (let num = 1; num <= 12; num++) {
    const date = new Date(year, num - 1);
    const isCurMon = (isCurYear && getMonth(curDate) === num);
    monthsArr.push({
      mode: 'year',
      theme,
      isCurYear,
      isCurMon,
      year,
      month: num,
      date,
      monthDiaplay: map[num.toString()].display,
    });
  }
  return monthsArr;
};

const createMonthCellsData = (year: number, month: number, firstDayOfWeek: number, curDate: Date, theme: string) => {
  const daysArr: any[] = [];
  const begin: Date = getBeginOfMonth(year, month); // 当前月份的开始日期
  const end: Date = getEndOfMonth(year, month);  // 当前月份的结束日期
  const days = end.getDate();

  const beginDateColIndex = getCellColIndex(firstDayOfWeek, begin);
  let arr = [];
  let num = 1;

  const createCellData = (
    belongTo: number,
    isCurDate: boolean,
    date: Date,
    weekNum: number
  ) => {
    const year = getYear(date);
    const month = getMonth(date);
    const day = getDay(date);
    const isWeekend = (day === 6 || day === 7);
    const dateNum = date.getDate();
    return {
      mode: 'month',
      theme,
      belongTo,
      isCurDate,
      year,
      month,
      day,
      isWeekend,
      weekNum,
      date,
      dateDiaplay: (dateNum > 9 ? `${dateNum}` : `0${dateNum}`),
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
    arr.push(createCellData(0, isSameDate(date, curDate), date, num));
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
  getYear,
  getMonth,
  getCurDate,
  getCurYear,
  getCurMonth,
  getBeginOfMonth,
  getEndOfMonth,
  getDay,
  getDayCn,
  getCellColIndex,
  addDate,
  getMonthStr,
  getDateStr,
  isSameDate,
  createYearCellsData,
  createMonthCellsData,
};
