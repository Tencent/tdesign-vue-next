import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import MockDate from 'mockdate';
import Calendar from '@tdesign/components/calendar';
import CalendarCell from '@tdesign/components/calendar/calendar-cell';

MockDate.set('2020-12-28');

describe('CalendarCell', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== Snapshot Tests ====================
  describe('props', () => {
    it('month mode cell snapshot', async () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'month', year: 2020, month: 12 },
      });
      await nextTick();
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      expect(cell.element).toMatchSnapshot();
    });

    it('year mode cell snapshot', async () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'year', year: 2020 },
      });
      await nextTick();
      const cell = wrapper.find('.t-calendar__table-body-cell');
      expect(cell.element).toMatchSnapshot();
    });

    it('checked cell snapshot', async () => {
      const wrapper = mount(Calendar, {
        props: { value: '2020-12-15' },
      });
      await nextTick();
      const checkedCell = wrapper.find('.t-calendar__table-body-cell.t-is-checked');
      expect(checkedCell.element).toMatchSnapshot();
    });

    it('disabled cell snapshot', async () => {
      const wrapper = mount(Calendar);
      await nextTick();
      const disabledCell = wrapper.find('.t-calendar__table-body-cell.t-is-disabled');
      expect(disabledCell.element).toMatchSnapshot();
    });

    it('now cell snapshot', async () => {
      const wrapper = mount(Calendar);
      await nextTick();
      const nowCell = wrapper.find('.t-calendar__table-body-cell--now');
      expect(nowCell.element).toMatchSnapshot();
    });

    it('full theme cell with cellAppend snapshot', async () => {
      const wrapper = mount(Calendar, {
        props: {
          theme: 'full',
          cellAppend: 'appended text',
        },
      });
      await nextTick();
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      expect(cell.element).toMatchSnapshot();
    });

    it('card theme cell snapshot', async () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'card' },
      });
      await nextTick();
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      expect(cell.element).toMatchSnapshot();
    });

    it(':item default returns null', () => {
      const itemDefault = (CalendarCell as any).props?.item?.default;
      if (itemDefault) {
        expect(itemDefault()).toBeNull();
      }
    });

    it(':theme default returns null', () => {
      const themeDefault = (CalendarCell as any).props?.theme?.default;
      if (themeDefault) {
        expect(themeDefault()).toBeNull();
      }
    });

    it(':theme[full]', () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'full' },
      });
      const contentArea = wrapper.find('.t-calendar__table-body-cell-content');
      expect(contentArea.exists()).toBeTruthy();
    });

    it(':theme[card]', () => {
      const wrapper = mount(Calendar, {
        props: {
          theme: 'card',
          cellAppend: () => <div class="test-append">append</div>,
        },
      });
      expect(wrapper.find('.test-append').exists()).toBeFalsy();
    });

    it('month mode displays date number', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'month', year: 2020, month: 12, fillWithZero: false },
      });
      const cells = wrapper.findAll(
        '.t-calendar__table-body-cell:not(.t-is-disabled) .t-calendar__table-body-cell-display',
      );
      const firstCellText = cells[0].text();
      expect(Number(firstCellText)).toBeGreaterThan(0);
      expect(Number(firstCellText)).toBeLessThanOrEqual(31);
    });

    it('year mode displays month names', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'year' },
      });
      const cells = wrapper.findAll('.t-calendar__table-body-cell-display');
      expect(cells.length).toBe(12);
    });

    it('now class for current date in month mode', () => {
      const wrapper = mount(Calendar, {
        props: { value: '2020-12-01' },
      });
      // 2020-12-28 is mocked "now"
      const nowCell = wrapper.find('.t-calendar__table-body-cell--now');
      expect(nowCell.exists()).toBeTruthy();
    });

    it('now class for current month in year mode', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'year', year: 2020 },
      });
      const nowCell = wrapper.find('.t-calendar__table-body-cell--now');
      expect(nowCell.exists()).toBeTruthy();
    });

    it('no now class for different year in year mode', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'year', year: 2019 },
      });
      const nowCell = wrapper.find('.t-calendar__table-body-cell--now');
      expect(nowCell.exists()).toBeFalsy();
    });

    it('disabled class for non-current month cells', () => {
      const wrapper = mount(Calendar);
      const disabledCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-disabled');
      expect(disabledCells.length).toBeGreaterThan(0);
    });

    it('checked class for selected date', () => {
      const wrapper = mount(Calendar, {
        props: { value: '2020-12-15' },
      });
      const checkedCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-checked');
      expect(checkedCells.length).toBe(1);
    });

    it('multiple checked cells in multiple mode', () => {
      const wrapper = mount(Calendar, {
        props: {
          multiple: true,
          value: ['2020-12-16', '2020-12-17', '2020-12-25'],
        },
      });
      const checkedCells = wrapper.findAll('.t-is-checked');
      expect(checkedCells.length).toBeGreaterThanOrEqual(3);
    });
  });

  // ==================== Events Tests ====================
  describe('events', () => {
    it('click on enabled cell emits click', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onCellClick },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('click');
      expect(onCellClick).toHaveBeenCalledTimes(1);
      expect(onCellClick.mock.calls[0][0]).toHaveProperty('cell');
      expect(onCellClick.mock.calls[0][0]).toHaveProperty('e');
    });

    it('dblclick on enabled cell emits dblclick', async () => {
      const onCellDoubleClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onCellDoubleClick },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('dblclick');
      expect(onCellDoubleClick).toHaveBeenCalledTimes(1);
    });

    it('contextmenu on enabled cell emits rightclick', async () => {
      const onCellRightClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onCellRightClick },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('contextmenu');
      expect(onCellRightClick).toHaveBeenCalledTimes(1);
    });

    it('click on disabled cell does not emit', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onCellClick },
      });
      const disabledCell = wrapper.find('.t-calendar__table-body-cell.t-is-disabled');
      if (disabledCell.exists()) {
        onCellClick.mockClear();
        await disabledCell.trigger('click');
        expect(onCellClick).not.toHaveBeenCalled();
      }
    });

    it('dblclick on disabled cell does not emit', async () => {
      const onCellDoubleClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onCellDoubleClick },
      });
      const disabledCell = wrapper.find('.t-calendar__table-body-cell.t-is-disabled');
      if (disabledCell.exists()) {
        await disabledCell.trigger('dblclick');
        expect(onCellDoubleClick).not.toHaveBeenCalled();
      }
    });

    it('contextmenu on disabled cell does not emit', async () => {
      const onCellRightClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onCellRightClick },
      });
      const disabledCell = wrapper.find('.t-calendar__table-body-cell.t-is-disabled');
      if (disabledCell.exists()) {
        await disabledCell.trigger('contextmenu');
        expect(onCellRightClick).not.toHaveBeenCalled();
      }
    });

    it('year mode cell click emits', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { mode: 'year', onCellClick },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell');
      if (cell.exists()) {
        await cell.trigger('click');
        expect(onCellClick).toHaveBeenCalled();
      }
    });

    it('year mode cell dblclick emits', async () => {
      const onCellDoubleClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { mode: 'year', onCellDoubleClick },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell');
      if (cell.exists()) {
        await cell.trigger('dblclick');
        expect(onCellDoubleClick).toHaveBeenCalled();
      }
    });

    it('year mode cell contextmenu emits', async () => {
      const onCellRightClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { mode: 'year', onCellRightClick },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell');
      if (cell.exists()) {
        await cell.trigger('contextmenu');
        expect(onCellRightClick).toHaveBeenCalled();
      }
    });
  });

  // ==================== Edge Cases Tests ====================
  describe('edge cases', () => {
    it('cell with item=null renders nothing', () => {
      const wrapper = mount(CalendarCell, {
        props: {
          item: null,
        },
      });
      // When item is null, render function returns false (no output)
      expect(wrapper.find('td').exists()).toBeFalsy();
    });

    it('cell fillWithZero with date >= 10 does not pad', () => {
      const wrapper = mount(Calendar, {
        props: { fillWithZero: true, year: 2020, month: 12 },
      });
      const cells = wrapper.findAll(
        '.t-calendar__table-body-cell:not(.t-is-disabled) .t-calendar__table-body-cell-display',
      );
      // Find a cell with date >= 10, should not have leading zero
      const hasDoubleDigitWithoutPad = cells.some((cell) => {
        const num = parseInt(cell.text(), 10);
        return num >= 10 && !cell.text().startsWith('0');
      });
      expect(hasDoubleDigitWithoutPad).toBeTruthy();
    });

    it('cell in year mode with fillWithZero renders correctly', () => {
      const wrapper = mount(Calendar, {
        props: {
          mode: 'year',
          fillWithZero: true,
        },
      });
      const cells = wrapper.findAll('.t-calendar__table-body-cell-display');
      expect(cells.length).toBe(12);
    });

    it('no error when event callbacks not provided', async () => {
      const wrapper = mount(Calendar);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('click');
      await cell.trigger('dblclick');
      await cell.trigger('contextmenu');
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
