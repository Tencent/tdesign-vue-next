import _DatePicker from './DatePicker';
import _DatePickerPanel from './DatePickerPanel';
import _DateRangePicker from './DateRangePicker';
import _DateRangePickerPanel from './DateRangePickerPanel';
import withInstall from '../utils/withInstall';
import { TdDatePickerProps, TdDateRangePickerProps, TdDatePickerPanelProps, TdDateRangePickerPanelProps } from './type';

import './style';

export * from './type';
export type DatePickerProps = TdDatePickerProps;

export interface DatePickerPanelProps extends TdDatePickerPanelProps, Pick<TdDatePickerProps, 'modelValue'> {}

export type DateRangePickerProps = TdDateRangePickerProps;
export interface DateRangePickerPanelProps
  extends TdDateRangePickerPanelProps,
    Pick<TdDateRangePickerProps, 'modelValue'> {}

export const DatePicker = withInstall(_DatePicker);
export const DatePickerPanel = withInstall(_DatePickerPanel);
export const DateRangePicker = withInstall(_DateRangePicker);
export const DateRangePickerPanel = withInstall(_DateRangePickerPanel);

export default DatePicker;
