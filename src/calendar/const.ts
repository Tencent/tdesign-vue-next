import { ModeOption } from './type';
import { prefix } from '../config';

// 组件名
export const COMPONENT_NAME = `${prefix}-calendar`;

// 非法日期的标识
export const INVALID_DATE = 'Invalid Date';
// 最小年份
export const MIN_YEAR = 1970;

// 每年首月份
export const FIRST_MONTH_OF_YEAR = 1;
// 每年最后一个月份
export const LAST_MONTH_OF_YEAR = 12;

// 一些固定的文本
export const TEXT_MAP: Record<string, string> = {
  showWeekend: '显示周末',
  hideWeekend: '隐藏周末',
  today: '今天',
  thisMonth: '本月',
};

/**
 * 日历组件模式的可选值
 */
export const MODE_LIST: string[] = [
  'month', 'year',
];
/**
 * 日历组件模式选项列表
 */
export const MODE_OPTION_LIST: ModeOption[] = [
  { value: 'month', label: '月' },
  { value: 'year', label: '年' },
];
/**
 * 日历组件首列星期的可选值
 */
export const FIRST_DAY_OF_WEEK_LIST: number[] = [
  1, 2, 3, 4, 5, 6, 7,
];
/**
 * 日历组件风格的可选值
 */
export const THEME_LIST: string[] = [
  'full', 'card',
];

/**
 * 星期的一些显示值
 */
export const DAY_CN_MAP: Record<string, string> = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日',
};

export const MONTH_CN_MAP: Record<string, string> = {
  1: '一月',
  2: '二月',
  3: '三月',
  4: '四月',
  5: '五月',
  6: '六月',
  7: '七月',
  8: '八月',
  9: '九月',
  10: '十月',
  11: '十一月',
  12: '十二月',
};

export default {
  COMPONENT_NAME,
  MIN_YEAR,
  INVALID_DATE,
  FIRST_MONTH_OF_YEAR,
  LAST_MONTH_OF_YEAR,
  TEXT_MAP,
  MODE_LIST,
  MODE_OPTION_LIST,
  FIRST_DAY_OF_WEEK_LIST,
  THEME_LIST,
  DAY_CN_MAP,
  MONTH_CN_MAP,
};
