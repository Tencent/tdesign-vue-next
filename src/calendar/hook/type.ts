import dayjs from 'dayjs';
import { SizeEnum } from '../../common';

export interface CalendarState {
  realFirstDayOfWeek: number;
  curDate: dayjs.Dayjs | null;
  curSelectedYear: number | null;
  curSelectedMonth: number | null;
  curSelectedMode: string | null;
  isShowWeekend: boolean;
  controlSize: SizeEnum;
}
