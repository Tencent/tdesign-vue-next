import { Instance as popperInstance } from '@popperjs/core/lib/types';
import dayjs from 'dayjs';
import { DatePickerConfig } from '../config-provider/config-receiver';
import { EPickerCols } from '../time-picker/interface';
import { DateValue, TdDatePickerProps, TdDateRangePickerProps } from './type';

export * from './type';
export type DatePickerProps = TdDatePickerProps;
export type DateRangePickerProps = TdDateRangePickerProps;

export type TdCSSProperties = Partial<CSSStyleDeclaration>;

export interface DatePickerData {
  tempValue: string | Date;
  global: DatePickerConfig;
  monthDate: Date;
  start: Date;
  end: Date;
  selectedDates: Date[];
  multiSeparator: string;
  inSelection: boolean;
  inline: boolean;
  dateFormat: string;
  foundation: popperInstance | null;
  showTime: boolean;
  inlineView: boolean;
  els: Element[];
  isOpen: boolean;
  startTimeValue: dayjs.Dayjs;
  endTimeValue: dayjs.Dayjs;
}

export interface DatePickerMethods {
  initClickAway: (el: Element) => void;
  attachDatePicker: () => void;
  setLocales: () => void;
  onNativeInput(event?: any): void;
  onNativeFocus(event?: any): void;
  onClick(event?: any): void;
  normalizeDateTime: (value: Date, oldValue: Date) => Date;
  dateClick: (value: Date) => void;
  hoverDate: (value: Date) => void;
  toggle: () => void;
  open: () => void;
  close: () => void;
  clickedApply: (closePicker?: boolean) => void;
  toggleTime: () => void;
  clickAway: () => void;
  clickRange: (value: Date[]) => void;
  clear: (triggerChange: boolean) => void;
  submitInput: (selectedDates: any[], triggerChange: boolean) => void;
  parseDate(value: any, format?: string): Date | boolean;
  isEnabled: (value: Date) => boolean;
  setDate(inputDate: any, triggerChange?: boolean): void;
  formatDate: (date: Date, format?: string) => string;
  createPopover: () => void;
  getPlaceholderText(): string;
  handleTimePick(col: EPickerCols, time: number): any;
  getDates(inputDate: any): Date[];
}

export interface DatePickerComputed {
  inputListeners: any;
  startText: string;
  endText: string;
  formattedValue: string;
  rangeText: string;
  min: Date | null;
  max: Date | null;
  classes: any;
  pickerStyles: any;
}

export type DisableDate = Array<DateValue> | DisableDateObj | ((date: Date | string) => boolean);

export interface DisableDateObj {
  from?: string;
  to?: string;
  before?: string;
  after?: string;
}

export interface PresetDate {
  [name: string]: DateValue | (() => DateValue);
}

export interface CalendarComponentProps {
  monthDate: Date;
  global: DatePickerConfig;
  selectedDates: Date[];
  start: Date;
  end: Date;
  minDate: Date;
  maxDate: Date;
  range: boolean;
}

export interface CalendarComponentData {
  showSelector: boolean;
}

export interface CalendarComponentComputed {
  monthName: string;
  year: number;
  month: number;
  calendar: any[];
  months: string[];
  years: number[];
}

export interface CalendarComponentMethods {
  toggleSelect: () => void;
  dayClass: (date: Date) => {};
}

export interface CalendarMonthData {
  showSelector: boolean;
}

export interface CalendarMonthMethods {
  monthClasses(idx: number): object;
  prevYear(): void;
  nextYear(): void;
  toggleSelect(): void;
  onChange(idx: number): void;
}
export interface CalendarMonthComputed {
  year: number;
  month: number;
  months: string[];
  years: number[];
}
export interface CalendarMonthProps {
  mode: string;
  monthDate: Date;
  global: DatePickerConfig;
  currentMonth: Date;
}

export type TimeOption = {
  label: string;
  value: number;
  disabled: boolean;
};
export type TimeColumn = {
  type: string;
  items: TimeOption[];
};

export interface CalendarTimeData {
  hour: null | number;
  minute: null | number;
  seconds: null | number;
  oldValue: DateValue;
  scrollPadding: TdCSSProperties;
  noScrollEvent: boolean;
  delay: number;
}
export interface CalendarTimeMethods {
  setInitData(): void;
  emitValue(): void;
  onChange(): void;
  mapTime(start: number, end: number, step: number, disabledData: any[]): TimeOption[];
  _disabledHours(): string[];
  _disabledMinutes(): string[];
  _disabledSeconds(): string[];
  isHoursDisabled(h: number): boolean;
  isMinutesDisabled(m: number): boolean;
  isSecondsDisabled(m: number): boolean;
  isActive(type: string, value: number): boolean;
  setTime(val: number, type: string): void;
  onScrollHours(vm: any, value: number): void;
  onScrollMinutes(vm: any, value: number): void;
  onScrollSeconds(vm: any, value: number): void;
  onScrollTimes(event: MouseEvent, type: string): void;
  padScrollTop(): void;
  getAvailableHour(): null | number;
  enableScrollEvent(vm: any): void;
  setScrollTop(): void;
}
export interface CalendarTimeComputed {
  cssClasses: object;
  hoursOptions: TimeOption[];
  minutesOptions: TimeOption[];
  secondsOptions: TimeOption[];
  columns: TimeColumn[];
  inputListeners: any;
}
export interface CalendarTimeProps {
  value: DateValue;
  format: string;
  minuteIncrement: number;
  secondsIncrement: number;
  height: number;
  // check css line height
  lineHeight: number;
  disabledHours: number[];
  disabledMinutes: number[];
  disabledSeconds: number[];
  minTime: DateValue;
  maxTime: DateValue;
  // behaviour: any;
  enableSeconds: boolean;
  inlineView: boolean;
}

export interface CalendarPresetsMethods {
  clickPreset(value: DateValue): void;
}

export interface CalendarPresetsProps {
  presets: TdDatePickerProps['presets'];
  global: DatePickerConfig;
  onClick: Function;
}

export interface DateRangeProps {
  mode: string;
  value: Array<Date>;
  minDate: Date;
  maxDate: Date;
  firstDayOfWeek: number;
  disableDate: TdDatePickerProps['disableDate'];
  global: DatePickerConfig;
  onChange: TdDatePickerProps['onChange'];
  onPick: TdDateRangePickerProps['onPick'];
}

export interface DateProps {
  mode: string;
  value: Date;
  minDate: Date;
  maxDate: Date;
  firstDayOfWeek: number;
  disableDate: TdDatePickerProps['disableDate'];
  global: DatePickerConfig;
  onChange: TdDatePickerProps['onChange'];
}

export interface DateHeaderProps {
  year: number;
  month: number;
  type: string;
}
export interface DateRangeMethods {
  initialPicker(): void;
  getLeftAndRightDataFromValue(value: Array<Date>): {
    leftYear: number;
    leftMonth: number;
    rightYear: number;
    rightMonth: number;
  };
  getData(value: { year: number; month: number; type: string }): object;
  getClickHandler(direction: string, date: DateValue, e: MouseEvent): object;
  clickHeader(flag: number, direction: string): void;
  clickDate(date: Date, e: MouseEvent): void;
  clickYear(date: Date, e: MouseEvent, type: string): void;
  clickMonth(date: Date, e: MouseEvent, type: string): void;
  onMouseEnter(date: Date): void;
  onTypeChange(): void;
  handleTypeChange(direction: string, type: string): void;
}
export interface DateMethods {
  getClickHandler(): Function;
  clickHeader(flag: number, direction: string): void;
  clickDate(date: Date): void;
  clickYear(date: Date, type: string): void;
  clickMonth(date: Date, type: string): void;
  onTypeChange(value: string): void;
}

export interface DateRangeComputed {
  leftData: object;
  rightData: object;
}
export interface DateComputed {
  tableData: object;
}
export interface DateRangeData {
  leftType: string;
  rightType: string;
  leftYear: number;
  rightYear: number;
  leftMonth: number;
  rightMonth: number;
  startValue: Date;
  endValue: Date;
  isFirstClick: boolean;
  firstClickValue: Date;
}
export interface DateData {
  year: number;
  month: number;
  type: string;
}

export interface Cell {
  active: boolean;
  disabled: boolean;
  now: boolean;
  text: string;
  value: Date;
}

export interface DatePickerInstance extends DatePickerData, DatePickerMethods, DatePickerComputed {}
