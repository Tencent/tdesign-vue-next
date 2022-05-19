import mapProps from '../utils/map-props';
import _TimePicker from './time-picker';
import _TimeRangePicker from './time-range-picker';
import withInstall from '../utils/withInstall';
import { TdTimePickerProps, TdTimeRangePickerProps } from './type';

import './style';

export * from './type';
export type TimePickerProps = TdTimePickerProps;
export type TimeRangePickerProps = TdTimeRangePickerProps;

export const TimePicker = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_TimePicker),
);
export const TimeRangePicker = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_TimeRangePicker),
);

export default TimePicker;
