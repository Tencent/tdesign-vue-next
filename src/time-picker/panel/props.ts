import { PropType } from 'vue';
import dayjs from 'dayjs';

import * as Props from '../props';
import { EPickerCols } from '../../_common/js/time-picker/const';

// 布尔类型
const BooleanType = {
  type: Boolean,
  default: true,
  validator(v: boolean): boolean {
    return typeof v === 'boolean';
  },
};

export const panelProps = () => ({
  disabled: {
    ...BooleanType,
    ...{
      default: false,
    },
  },
  isFocus: {
    ...BooleanType,
    ...{
      default: false,
    },
  },
  value: {
    type: String,
    default: '',
  },
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  steps: {
    type: Array as PropType<Array<string | number>>,
    ...{
      default: [1, 1, 1],
    },
  },
  isShowPanel: {
    ...BooleanType,
    ...{
      default: false,
    },
  },
  hideDisabledTime: {
    ...Props.default.hideDisabledTime,
  },
  disableTime: {
    type: Function,
  },
  isFooterDisplay: {
    ...BooleanType,
  },
});

export const panelColProps = () => ({
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  cols: {
    type: Array as PropType<Array<EPickerCols>>,
    default: () => [EPickerCols.hour, EPickerCols.minute, EPickerCols.second],
  },
  value: {
    type: String,
    default: '',
  },
  range: {
    type: Array as PropType<Array<dayjs.Dayjs>>,
    default: () => [] as Array<dayjs.Dayjs>,
  },
  steps: {
    type: Array as PropType<Array<string | number>>,
    ...{
      default: [1, 1, 1],
    },
  },
  hideDisabledTime: {
    ...Props.default.hideDisabledTime,
  },
  disableTime: {
    type: Function,
  },
  localeMeridiems: {
    type: Array as PropType<Array<string>>,
  },
});
