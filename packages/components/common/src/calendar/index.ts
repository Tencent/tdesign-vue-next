import _Calendar from './calendar';
import { withInstall } from '@td/adapter-utils';
import { TdCalendarProps } from '@td/intel/calendar/type';

import './style';

export * from '@td/intel/calendar/type';
export type CalendarProps = TdCalendarProps;

export const Calendar = withInstall(_Calendar);
export default Calendar;
