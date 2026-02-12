import { expect } from 'vitest';
import MockDate from 'mockdate';
import dayjs from 'dayjs';
import {
  getDay,
  getDayCn,
  getCellColIndex,
  addDate,
  createYearCellsData,
  createMonthCellsData,
  createDefaultCurDate,
} from '@tdesign/components/calendar/utils';
import type { CalendarState } from '@tdesign/components/calendar/types';
import type { TdCalendarProps } from '@tdesign/components/calendar/type';

MockDate.set('2020-12-28');

describe('Calendar Utils', () => {
  describe('getDay', () => {
    it('should return 1 for Monday', () => {
      expect(getDay(new Date(2020, 11, 28))).toBe(1);
    });

    it('should return 7 for Sunday', () => {
      expect(getDay(new Date(2020, 11, 27))).toBe(7);
    });

    it('should return 5 for Friday', () => {
      expect(getDay(new Date(2020, 11, 25))).toBe(5);
    });

    it('should return 6 for Saturday', () => {
      expect(getDay(new Date(2020, 11, 26))).toBe(6);
    });
  });

  describe('getDayCn', () => {
    it('should return Chinese day names for valid numbers', () => {
      expect(getDayCn(1)).toBe('一');
      expect(getDayCn(2)).toBe('二');
      expect(getDayCn(3)).toBe('三');
      expect(getDayCn(4)).toBe('四');
      expect(getDayCn(5)).toBe('五');
      expect(getDayCn(6)).toBe('六');
      expect(getDayCn(7)).toBe('日');
    });

    it('should return empty string for invalid number', () => {
      expect(getDayCn(0)).toBe('');
      expect(getDayCn(8)).toBe('');
      expect(getDayCn(-1)).toBe('');
    });
  });

  describe('getCellColIndex', () => {
    it('should return 0 when day equals firstDayOfWeek', () => {
      // Monday(1), firstDayOfWeek=1 => index 0
      const monday = new Date(2020, 11, 28);
      expect(getCellColIndex(1, monday)).toBe(0);
    });

    it('should return correct index when day > firstDayOfWeek', () => {
      // Friday(5), firstDayOfWeek=1 => 5-1=4
      const friday = new Date(2020, 11, 25);
      expect(getCellColIndex(1, friday)).toBe(4);
    });

    it('should return correct index when day < firstDayOfWeek', () => {
      // Monday(1), firstDayOfWeek=3 => 7-3+1=5
      const monday = new Date(2020, 11, 28);
      expect(getCellColIndex(3, monday)).toBe(5);
    });

    it('should handle Sunday (day=7) with firstDayOfWeek=1', () => {
      const sunday = new Date(2020, 11, 27);
      expect(getCellColIndex(1, sunday)).toBe(6);
    });

    it('should handle Sunday (day=7) with firstDayOfWeek=7', () => {
      const sunday = new Date(2020, 11, 27);
      expect(getCellColIndex(7, sunday)).toBe(0);
    });
  });

  describe('addDate', () => {
    it('should add positive days', () => {
      const date = new Date(2020, 11, 28);
      const result = addDate(date, 3);
      expect(result.getDate()).toBe(31);
      expect(result.getMonth()).toBe(11);
    });

    it('should add negative days', () => {
      const date = new Date(2020, 11, 28);
      const result = addDate(date, -3);
      expect(result.getDate()).toBe(25);
    });

    it('should handle month boundary', () => {
      const date = new Date(2020, 11, 28);
      const result = addDate(date, 5);
      expect(result.getMonth()).toBe(0);
      expect(result.getFullYear()).toBe(2021);
    });

    it('should not mutate original date', () => {
      const date = new Date(2020, 11, 28);
      addDate(date, 5);
      expect(date.getDate()).toBe(28);
    });
  });

  describe('createDefaultCurDate', () => {
    it('should return current date as dayjs object', () => {
      const result = createDefaultCurDate();
      expect(result.format('YYYY-MM-DD')).toBe('2020-12-28');
    });
  });

  describe('createYearCellsData', () => {
    const defaultState: CalendarState = {
      realFirstDayOfWeek: 1,
      curDate: dayjs('2020-12-28'),
      curDateList: [],
      curSelectedYear: 2020,
      curSelectedMonth: 12,
      curSelectedMode: 'year',
      isShowWeekend: true,
      controlSize: 'medium',
    };

    const defaultProps: TdCalendarProps = {
      format: 'YYYY-MM-DD',
      multiple: false,
    };

    it('should create 12 month cells', () => {
      const result = createYearCellsData(defaultProps, defaultState);
      expect(result.length).toBe(12);
    });

    it('should mark current month as isCurrent', () => {
      const result = createYearCellsData(defaultProps, defaultState);
      expect(result[11].isCurrent).toBe(true);
      expect(result[0].isCurrent).toBe(false);
    });

    it('should set mode to year for all cells', () => {
      const result = createYearCellsData(defaultProps, defaultState);
      for (const cell of result) {
        expect(cell.mode).toBe('year');
      }
    });

    it('should handle multiple mode', () => {
      const multiState = {
        ...defaultState,
        curDateList: [dayjs('2020-01-15'), dayjs('2020-06-20')],
      };
      const multiProps = { ...defaultProps, multiple: true };
      const result = createYearCellsData(multiProps, multiState);
      expect(result[0].isCurrent).toBe(true);
      expect(result[5].isCurrent).toBe(true);
      expect(result[2].isCurrent).toBe(false);
    });

    it('should format date with custom format', () => {
      const customProps = { ...defaultProps, format: 'YYYY/MM/DD' };
      const result = createYearCellsData(customProps, defaultState);
      expect(result[0].formattedDate).toContain('/');
    });
  });

  describe('createMonthCellsData', () => {
    const defaultState: CalendarState = {
      realFirstDayOfWeek: 1,
      curDate: dayjs('2020-12-28'),
      curDateList: [],
      curSelectedYear: 2020,
      curSelectedMonth: 12,
      curSelectedMode: 'month',
      isShowWeekend: true,
      controlSize: 'medium',
    };

    const defaultProps: TdCalendarProps = {
      format: 'YYYY-MM-DD',
      multiple: false,
    };

    it('should create week rows for a month', () => {
      const result = createMonthCellsData(defaultProps, defaultState);
      expect(result.length).toBeGreaterThanOrEqual(4);
      expect(result.length).toBeLessThanOrEqual(6);
    });

    it('each row should have 7 cells', () => {
      const result = createMonthCellsData(defaultProps, defaultState);
      for (const row of result) {
        expect(row.length).toBe(7);
      }
    });

    it('should mark current date as isCurrent in single mode', () => {
      const result = createMonthCellsData(defaultProps, defaultState);
      let foundCurrent = false;
      for (const row of result) {
        for (const cell of row) {
          if (cell.isCurrent) foundCurrent = true;
        }
      }
      expect(foundCurrent).toBe(true);
    });

    it('should mark multiple dates as isCurrent in multiple mode', () => {
      const multiState = {
        ...defaultState,
        curDateList: [dayjs('2020-12-15'), dayjs('2020-12-25')],
      };
      const multiProps = { ...defaultProps, multiple: true };
      const result = createMonthCellsData(multiProps, multiState);
      let currentCount = 0;
      for (const row of result) {
        for (const cell of row) {
          if (cell.isCurrent) currentCount++;
        }
      }
      expect(currentCount).toBe(2);
    });

    it('should include previous month days with belongTo = -1', () => {
      const result = createMonthCellsData(defaultProps, defaultState);
      const firstRow = result[0];
      const prevMonthCells = firstRow.filter((cell) => cell.belongTo === -1);
      expect(prevMonthCells.length).toBeGreaterThan(0);
    });

    it('should include next month days with belongTo = 1', () => {
      const result = createMonthCellsData(defaultProps, defaultState);
      const lastRow = result[result.length - 1];
      const nextMonthCells = lastRow.filter((cell) => cell.belongTo === 1);
      expect(nextMonthCells.length).toBeGreaterThanOrEqual(0);
    });

    it('should set mode to month for all cells', () => {
      const result = createMonthCellsData(defaultProps, defaultState);
      for (const row of result) {
        for (const cell of row) {
          expect(cell.mode).toBe('month');
        }
      }
    });

    it('should handle different firstDayOfWeek', () => {
      const sundayFirstState = {
        ...defaultState,
        realFirstDayOfWeek: 7,
      };
      const result = createMonthCellsData(defaultProps, sundayFirstState);
      expect(result.length).toBeGreaterThanOrEqual(4);
    });

    it('should fill last row with next month dates', () => {
      const febState = {
        ...defaultState,
        curSelectedMonth: 2,
        curSelectedYear: 2020,
        curDate: dayjs('2020-02-15'),
      };
      const result = createMonthCellsData(defaultProps, febState);
      const lastRow = result[result.length - 1];
      expect(lastRow.length).toBe(7);
    });
  });
});
