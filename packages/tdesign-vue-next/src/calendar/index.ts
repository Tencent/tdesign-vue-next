import { withInstall } from '@td/adapter-vue';
import _Calendar from '@td/components-common/src/calendar/calendar';
import type { TdCalendarProps } from './type';

import '@td/components-common/src/calendar/style';

export * from './type';
export type CalendarProps = TdCalendarProps;

export const Calendar = withInstall(_Calendar);
export default Calendar;
