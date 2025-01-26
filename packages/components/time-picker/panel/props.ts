import { isBoolean } from 'lodash-es';
import { PropType } from 'vue';
import dayjs from 'dayjs';

import * as Props from '../props';
import { EPickerCols } from '../../../common/js/time-picker/const';
import { TdTimePickerProps, TdTimeRangePickerProps } from '../type';

// 布尔类型
const BooleanType = {
  type: Boolean,
  default: true,
  validator(v: boolean): boolean {
    return isBoolean(v);
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
      default: true,
    },
  },
  activeIndex: {
    type: Number,
  },
  presets: {
    type: Object as PropType<TdTimePickerProps['presets'] | TdTimeRangePickerProps['presets']>,
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
