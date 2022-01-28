import _DatePicker from './date-picker';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdDatePickerProps, TdDateRangePickerProps } from './type';
import mapProps from '../utils/map-props';

import './style';

export * from './type';
export type DatePickerProps = TdDatePickerProps;
export type DateRangePickerProps = TdDateRangePickerProps;

export const DatePicker: WithInstallType<typeof _DatePicker> = withInstall(
  mapProps([
    {
      name: 'value',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_DatePicker),
);

export default DatePicker;
