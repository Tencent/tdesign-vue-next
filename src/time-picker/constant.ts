import { prefix } from '../config';

export const componentName = `${prefix}-time-picker`;

export enum EPickerCols {
    zh = 'zh-cn',
    hour = 'hour',
    minute = 'minute',
    second = 'second',
    en = 'en'
}

export const zhList = ['上午', '下午'];
export const enList = ['am', 'pm'];
export const pmList = ['下午', 'pm'];
export const amList = ['上午', 'am'];

export const meridianZHList = [
  {
    label: '上午',
    value: 'am',
  },
  {
    label: '下午',
    value: 'pm',
  },
];

export const meridianENList = [
  {
    label: 'am',
    value: 'am',
  },
  {
    label: 'pm',
    value: 'pm',
  },
];
// 上下午前置
export const meridianBeforeFormatREG = /^(a|A)\s+?[hH]{1,2}(:[m]{1,2}(:[s]{1,2})?)?$/;
// 上下午后置
export const meridianAfterFormatREG = /^[hH]{1,2}(:[m]{1,2}(:[s]{1,2})?)?(\s+(a|A))?$/;
