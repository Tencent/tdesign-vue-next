import { withInstall } from '@td/adapter-vue';
import _TimePicker from '@td/components-common/src/time-picker/time-picker';
import _TimeRangePicker from '@td/components-common/src/time-picker/time-range-picker';
import _TimePickerPanel from '@td/components-common/src/time-picker/panel/time-picker-panel';
import type { TdTimePickerProps, TdTimeRangePickerProps } from './type';

import '@td/components-common/src/time-picker/style';

export * from './type';
export type TimePickerProps = TdTimePickerProps;
export type TimeRangePickerProps = TdTimeRangePickerProps;
export type TimePickerPanelProps = TdTimePickerProps;

export const TimePicker = withInstall(_TimePicker);
export const TimeRangePicker = withInstall(_TimeRangePicker);
export const TimePickerPanel = withInstall(_TimePickerPanel);

export default TimePicker;
