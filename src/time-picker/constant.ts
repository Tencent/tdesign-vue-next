import { prefix } from '../config';

export const COMPONENT_NAME = `${prefix}-time-picker`;

export enum EPickerCols {
  hour = 'hour',
  minute = 'minute',
  second = 'second',
  meridiem = 'meridiem'
}

export const AM = 'AM';
export const PM = 'PM';

export const MERIDIEM_LIST = [AM, PM];

// 上下午前置
export const amFormat = /^(a|A)\s+?[h]{1,2}(:[m]{1,2}(:[s]{1,2})?)?$/;
// 上下午后置
export const pmFormat = /^[h]{1,2}(:[m]{1,2}(:[s]{1,2})?)?(\s+(a|A))?$/;

export const TIME_PICKER_EMPTY: Array<undefined> = [undefined, undefined];

export enum KeyboardDirection {
  left = 37,
  up = 38,
  right = 39,
  down = 40
}

export const EMPTY_VALUE = -1;