import withInstall from '../utils/withInstall';

import _TimePickerPanel from './panel/time-picker-panel';
import _TimePicker from './time-picker';
import _TimeRangePicker from './time-range-picker';
import { TdTimePickerProps, TdTimeRangePickerProps } from './type';

import './style';

export * from './type';
export type TimePickerProps = TdTimePickerProps;
export type TimeRangePickerProps = TdTimeRangePickerProps;
export type TimePickerPanelProps = TdTimePickerProps;

export const TimePicker = withInstall(_TimePicker);
export const TimeRangePicker = withInstall(_TimeRangePicker);
export const TimePickerPanel = withInstall(_TimePickerPanel);

export default TimePicker;
