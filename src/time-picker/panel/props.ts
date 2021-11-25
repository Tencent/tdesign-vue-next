import { PropType } from 'vue';
import dayjs from 'dayjs';

import * as Props from '../props';
import { EPickerCols } from '../constant';

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
    type: Array as PropType<Array<dayjs.Dayjs | undefined>>,
    default: () => [dayjs()] as Array<dayjs.Dayjs | undefined>,
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
    ...Props.default.disableTime,
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
    type: Object as PropType<dayjs.Dayjs>,
    ...{
      default: () => dayjs(),
    },
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
    ...Props.default.disableTime,
  },
  localeMeridiems: {
    type: Array as PropType<Array<string>>,
  },
});
