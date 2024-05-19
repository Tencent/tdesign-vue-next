import _TimePicker from './time-picker';
import _TimeRangePicker from './time-range-picker';
import _TimePickerPanel from './panel/time-picker-panel';
import { TdTimePickerProps, TdTimeRangePickerProps } from '@td/intel/time-picker/type';

import withInstall from '../utils/withInstall';

import './style';

export * from '@td/intel/time-picker/type';
export type TimePickerProps = TdTimePickerProps;
export type TimeRangePickerProps = TdTimeRangePickerProps;
export type TimePickerPanelProps = TdTimePickerProps;

export const TimePicker = withInstall(_TimePicker);
export const TimeRangePicker = withInstall(_TimeRangePicker);
export const TimePickerPanel = withInstall(_TimePickerPanel);

export default TimePicker;
