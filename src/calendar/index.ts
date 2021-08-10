import _Calendar from './calendar.vue';
import withInstall from '../utils/withInstall';
import { TdCalendarProps } from './type';

export * from './type';
export type CalendarProps = TdCalendarProps;

export const Calendar = withInstall(_Calendar);
export default Calendar;