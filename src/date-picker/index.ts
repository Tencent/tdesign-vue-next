import _DatePicker from './date-picker';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdDatePickerProps, TdDateRangePickerProps } from './type';

export type DatePickerProps = TdDatePickerProps;
export type DateRangePickerProps = TdDateRangePickerProps;
export * from './type';

export const DatePicker: WithInstallType<typeof _DatePicker> = withInstall(_DatePicker);

export default DatePicker;
