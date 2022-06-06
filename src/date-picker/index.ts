import _DatePicker from './DatePicker';
import _DateRangePicker from './DateRangePicker';
import withInstall from '../utils/withInstall';
import { TdDatePickerProps, TdDateRangePickerProps } from './type';

import './style';

export * from './type';
export type DatePickerProps = TdDatePickerProps;
export type DateRangePickerProps = TdDateRangePickerProps;

export const DatePicker = withInstall(_DatePicker);
export const DateRangePicker = withInstall(_DateRangePicker);

export default DatePicker;
