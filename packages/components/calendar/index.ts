import _Calendar from './calendar';
import { withInstall } from '@tdesign/shared-utils';
import { TdCalendarProps } from './type';

import './style';

export * from './type';
export type CalendarProps = TdCalendarProps;

export const Calendar = withInstall(_Calendar);
export default Calendar;
