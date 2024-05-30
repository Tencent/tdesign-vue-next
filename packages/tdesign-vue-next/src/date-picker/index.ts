import { withInstall } from '@td/adapter-vue';
import type { TdDatePickerPanelProps, TdDatePickerProps, TdDateRangePickerPanelProps, TdDateRangePickerProps } from './type';
import _DatePicker from '@td/components-common/src/date-picker/DatePicker';
import _DatePickerPanel from '@td/components-common/src/date-picker/DatePickerPanel';
import _DateRangePicker from '@td/components-common/src/date-picker/DateRangePicker';
import _DateRangePickerPanel from '@td/components-common/src/date-picker/DateRangePickerPanel';

import '@td/components-common/src/date-picker/style';

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
