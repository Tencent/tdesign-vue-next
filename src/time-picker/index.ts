import mapProps from '../utils/map-props';
import _TimePicker from './time-picker';
import _TimeRangePicker from './time-range-picker';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTimePickerProps, TdTimeRangePickerProps } from './type';

export type TimePickerProps = TdTimePickerProps;
export type TimeRangePickerProps = TdTimeRangePickerProps;
export * from './type';

const LocalTimePicker = mapProps([{
  name: 'value', event: 'change', alias: ['modelValue'],
}])(_TimePicker);

const LocalTimeRangePicker = mapProps([{
  name: 'value', event: 'change', alias: ['modelValue'],
}])(_TimeRangePicker);

export const TimePicker: WithInstallType<typeof _TimePicker> = withInstall(LocalTimePicker);
export const TimeRangePicker: WithInstallType<typeof _TimeRangePicker> = withInstall(LocalTimeRangePicker);

export default TimePicker;
