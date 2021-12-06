/* eslint-disable no-undef */

import { Instance } from '@popperjs/core';
import dayjs from 'dayjs';
import { TdTimePickerProps, TdTimeRangePickerProps } from './type';

export type TimePickerProps = TdTimePickerProps;
export type TimeRangePickerProps = TdTimeRangePickerProps;

export * from './type';

// 输入类型
export type TimeInputType = 'hour' | 'minute' | 'second' | 'meridiem';

// 键盘操作
export enum KeyboardDirection {
  left = 37,
  up = 38,
  right = 39,
  down = 40,
}

export enum EPickerCols {
  hour = 'hour',
  minute = 'minute',
  second = 'second',
  meridiem = 'meridiem',
}

export interface InputTime {
  hour: number | string;
  minute?: number | string;
  second?: number | string;
  meridiem: 'AM' | 'PM' | string;
}

interface TimePickerSetInputValue {
  (val: dayjs.Dayjs | undefined): InputTime | undefined;
}

interface TimePickerDayjs2InputTime {
  (val: dayjs.Dayjs): InputTime;
}

export interface TimePickerInstance {
  setInputValue: TimePickerSetInputValue;
  dayjs2InputTime: TimePickerDayjs2InputTime;
  formatString: string;
  formatedValue: string;
}

export interface PickerData {
  hour: number | string;
  minute?: number | string;
  second?: number | string;
  meridiem?: 'AM' | 'PM';
}

export interface InputEvent extends Event {
  data?: string;
  target: HTMLInputElement;
}

// 输入变动数据
export interface TimeInputEvent {
  type: 'hour' | 'minute' | 'second';
  value: number;
  index?: number;
}

export interface TimePickerPanelInstance {
  renderFooter: () => HTMLElement;
  renderBody: () => HTMLElement;
  // 点击确认按钮 isFooterDisplay为true 只使用body部分可以不传
  confirmBtnClick?: () => void;
  // 点击此刻按钮 isFooterDisplay为true 只使用body部分可以不传
  nowAction?: () => void;
  renderSinglePicker: (index: number) => HTMLElement;
  handleTimePick: (col: EPickerCols, time: string | number, index: number) => void;
  scrollToTime: (colIndex: number, col: EPickerCols, time: number | string, behavior: ScrollBehavior) => void;
  panelColUpdate: () => void;
  classNames: Array<string>;
  colValues: Array<dayjs.Dayjs>;
  cols: Array<EPickerCols>;
  formatField: Record<string, string>;
  sectionComponentName: string;
  rangePicker: boolean;
  panel: Instance;
  isFooterDisplay: boolean;
  localeMeridiems: Array<string>;
}

export interface TimePickerPanelColInstance {
  renderScrollers: () => Array<HTMLElement>;
  renderScroller: (col: EPickerCols) => HTMLElement;
  renderActiveMask: () => HTMLElement;
  scrollToTime: (col: EPickerCols, time: number | string, behavior?: ScrollBehavior) => void;
  getTimeItemHeight: (col: EPickerCols) => number; // 获取每个time item的高度
  generateColTime: (col: EPickerCols) => Array<number | string>;
  generateTimeList: (num: number, step: number) => Array<number>;
  generateColRows: (col: EPickerCols) => Array<HTMLElement>;
  calcScrollYDistance: (index: number) => number;
  calculateTimeIdx(time: number | string, step: number | string, type: EPickerCols): number;
  splitValue: Record<EPickerCols, number | string>;
  timeItemCanUsed: (col: EPickerCols, time: string | number) => boolean;
  handleTimeItemClick: (e: MouseEvent, col: EPickerCols, time: number | string) => void;
  handleScroll: (col: EPickerCols) => void;
  isCurrent: (col: EPickerCols, colItem: string | number) => boolean;
  updateTimeScrollPos: () => void;
  closestLookup: (availableArr: Array<any>, x: number, step: number) => number;
  disableFilter: (preIdx: number, col: EPickerCols) => any;
  getScrollDistance: (col: EPickerCols, time: number | string) => number;
  valStr: string;
  isPm: boolean;
  currentTimes: [number, number, number];
  timeArr: [string, string, string];
  timeItemMargin: number;
}
