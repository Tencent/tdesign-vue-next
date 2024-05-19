import type dayjs from 'dayjs';
import type { SizeEnum } from '@td/shared/interface';

import type { CalendarCell, CalendarValue, TdCalendarProps, WeekDay } from './type';

/**
 * 日历组件的state定义
 */
export interface CalendarData {
  // 当前高亮的日期\月份（目前写死为“今天”）
  curDate: dayjs.Dayjs;
  // 当前选中的年份
  curSelectedYear: number;
  // 当前选中的月份
  curSelectedMonth: number;
  // 当前选中的模式（年 or 月）
  curSelectedMode: string;
  // 是否显示周末
  isShowWeekend: boolean;
  // 统一控件尺寸
  controlSize: string;
}

/**
 * 日历的显示范围
 */
export interface CalendarRange {
  from: CalendarValue;
  to: CalendarValue;
}

/**
 * 年\月下拉框选项
 */
export interface YearMonthOption {
  // 选项值
  value: number;
  // 选项展示的文本
  label: string;
  // 选项是否禁用
  disabled?: boolean;
}

/**
 * 日历主体头部（日历模式下使用）
 */
export interface CellColHeader {
  // 周几
  num: WeekDay;
  // 显示的文本
  display: string;
}

/**
 * 模式选项
 */
export interface ModeOption {
  // 选项值
  value: TdCalendarProps['mode'];
  // 选项展示的文本
  label: string;
}

/**
 * 单元格事件传参类型
 */
export interface CellEventOption {
  cell: CalendarCell;
  e: MouseEvent;
}

/**
 * 日历组件本身的状态管理
 */
export interface CalendarState {
  realFirstDayOfWeek: number;
  // 当前选中的高亮日期，单选（默认 multiple === false）的时候用这个
  curDate?: dayjs.Dayjs | null;
  // 当前选中的高亮日期列表，多选（multiple === true）的时候用这个
  curDateList?: dayjs.Dayjs[];
  curSelectedYear: number | null;
  curSelectedMonth: number | null;
  curSelectedMode: string | null;
  isShowWeekend: boolean;
  controlSize: SizeEnum;
}

/**
 * 单元格点击回调
 */
export type CellClickEventCallback = (options: CellEventOption) => void;
