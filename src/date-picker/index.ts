import _DatePicker from './DatePicker';
import _DatePickerPanel from './DatePickerPanel';
import _DateRangePicker from './DateRangePicker';
import _DateRangePickerPanel from './DateRangePickerPanel';
import withInstall from '../utils/withInstall';
import { TdDatePickerProps, TdDateRangePickerProps, TdDatePickerPanelProps, TdDateRangePickerPanelProps } from './type';

import './style';

export * from './type';
export type DatePickerProps = TdDatePickerProps;
export type DatePickerPanelProps = TdDatePickerPanelProps;
export type DateRangePickerProps = TdDateRangePickerProps;
export type DateRangePickerPanelProps = TdDateRangePickerPanelProps;

export const DatePicker = withInstall(_DatePicker);
export const DatePickerPanel = withInstall(_DatePickerPanel);
export const DateRangePicker = withInstall(_DateRangePicker);
export const DateRangePickerPanel = withInstall(_DateRangePickerPanel);

export default DatePicker;
