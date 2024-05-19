import { withInstall } from '@td/adapter-utils';
import type { TdCalendarProps } from '@td/intel/components/calendar/type';
import _Calendar from './calendar';

import './style';

export * from '@td/intel/components/calendar/type';
export type CalendarProps = TdCalendarProps;

export const Calendar = withInstall(_Calendar);
export default Calendar;
