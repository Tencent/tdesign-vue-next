import Calendar from './calendar.vue';
import setInstallFn from '../utils/setInstallFn';
import { TdCalendarProps } from '@TdTypes/calendar/TdCalendarProps';

setInstallFn('Calendar', Calendar);


export type CalendarProps = TdCalendarProps;

export { Calendar };
export default Calendar;
