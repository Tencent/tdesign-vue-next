import { withInstall } from '@td/adapter-vue';
import type { TdCalendarProps } from './type';
import _Calendar from '@td/components-common/src/calendar/calendar';

import '@td/components-common/src/calendar/style';

export * from './type';
export type CalendarProps = TdCalendarProps;

export const Calendar = withInstall(_Calendar);
export default Calendar;
