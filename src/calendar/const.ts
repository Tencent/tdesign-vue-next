/**
 * 日历组件模式的可选值
 */
export const MODE_LIST = [
  'month', 'year',
];
/**
 * 日历组件模式选项列表
 */
export const MODE_OPTION_LIST = [
  { value: 'month', label: '月' },
  { value: 'year', label: '年' },
];
/**
 * 日历组件首列星期的可选值
 */
export const FIRST_DAY_OF_WEEK_LIST = [
  1, 2, 3, 4, 5, 6, 7,
];
/**
 * 日历组件风格的可选值
 */
export const THEME_LIST = [
  'full', 'card',
];

/**
 * 星期的一些显示值
 */
export const DAY_CN_MAP = {
  1: {
    shortDisplay: '一',
  },
  2: {
    shortDisplay: '二',
  },
  3: {
    shortDisplay: '三',
  },
  4: {
    shortDisplay: '四',
  },
  5: {
    shortDisplay: '五',
  },
  6: {
    shortDisplay: '六',
  },
  7: {
    shortDisplay: '日',
  },
};

export const MONTH_CN_MAP = {
  1: {
    display: '一月',
  },
  2: {
    display: '二月',
  },
  3: {
    display: '三月',
  },
  4: {
    display: '四月',
  },
  5: {
    display: '五月',
  },
  6: {
    display: '六月',
  },
  7: {
    display: '七月',
  },
  8: {
    display: '八月',
  },
  9: {
    display: '九月',
  },
  10: {
    display: '十月',
  },
  11: {
    display: '十一月',
  },
  12: {
    display: '十二月',
  },
};

export default {
  MODE_LIST,
  MODE_OPTION_LIST,
  FIRST_DAY_OF_WEEK_LIST,
  THEME_LIST,
  DAY_CN_MAP,
  MONTH_CN_MAP,
};
