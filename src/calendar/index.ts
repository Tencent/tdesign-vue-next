import _Calendar from './calendar';
import withInstall from '../utils/withInstall';
import { TdCalendarProps } from './type';

import './style';

export * from './type';
export type CalendarProps = TdCalendarProps;

export const Calendar = withInstall(_Calendar);
export default Calendar;
