import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import MockDate from 'mockdate';
import { Calendar } from '@tdesign/components';
import CalendarCell from '@tdesign/components/calendar/calendar-cell';

MockDate.set('2020-12-28');

describe('CalendarCell', () => {
  describe('props', () => {
    it(':item default returns null', () => {
      const itemDefault = (CalendarCell as any).props?.item?.default;
      expect(itemDefault()).toBeNull();
    });

    it(':theme default returns null', () => {
      const themeDefault = (CalendarCell as any).props?.theme?.default;
      expect(themeDefault()).toBeNull();
    });

    it('renders nothing when item is null', () => {
      const wrapper = mount(CalendarCell, {
        props: { item: null },
      });
      expect(wrapper.find('td').exists()).toBe(false);
      wrapper.unmount();
    });

    it('month mode displays date number', () => {
      const wrapper = mount(<Calendar mode="month" year={2020} month={12} fillWithZero={false} />);
      const cells = wrapper.findAll(
        '.t-calendar__table-body-cell:not(.t-is-disabled) .t-calendar__table-body-cell-display',
      );
      const firstCellText = cells[0].text();
      const num = Number(firstCellText);
      expect(num).toBeGreaterThan(0);
      expect(num).toBeLessThanOrEqual(31);
      wrapper.unmount();
    });

    it('month mode with fillWithZero pads single digit dates', () => {
      const wrapper = mount(<Calendar mode="month" year={2020} month={12} fillWithZero={true} />);
      const cells = wrapper.findAll(
        '.t-calendar__table-body-cell:not(.t-is-disabled) .t-calendar__table-body-cell-display',
      );
      const hasZeroPadded = cells.some((cell) => /^0\d$/.test(cell.text()));
      expect(hasZeroPadded).toBe(true);
      wrapper.unmount();
    });

    it('month mode with fillWithZero=false does not pad', () => {
      const wrapper = mount(<Calendar mode="month" year={2020} month={12} fillWithZero={false} />);
      const cells = wrapper.findAll(
        '.t-calendar__table-body-cell:not(.t-is-disabled) .t-calendar__table-body-cell-display',
      );
      const hasZeroPadded = cells.some((cell) => /^0\d$/.test(cell.text()));
      expect(hasZeroPadded).toBe(false);
      wrapper.unmount();
    });

    it('fillWithZero does not pad dates >= 10', () => {
      const wrapper = mount(<Calendar year={2020} month={12} fillWithZero={true} />);
      const cells = wrapper.findAll(
        '.t-calendar__table-body-cell:not(.t-is-disabled) .t-calendar__table-body-cell-display',
      );
      const hasDoubleDigitWithoutPad = cells.some((cell) => {
        const num = parseInt(cell.text(), 10);
        return num >= 10 && !cell.text().startsWith('0');
      });
      expect(hasDoubleDigitWithoutPad).toBe(true);
      wrapper.unmount();
    });

    it('year mode displays 12 month cells', () => {
      const wrapper = mount(<Calendar mode="year" year={2020} />);
      const cells = wrapper.findAll('.t-calendar__table-body-cell-display');
      expect(cells.length).toBe(12);
      wrapper.unmount();
    });

    it(':theme[full] renders cell content area', () => {
      const wrapper = mount(<Calendar theme="full" year={2020} month={12} />);
      const contentArea = wrapper.find('.t-calendar__table-body-cell-content');
      expect(contentArea.exists()).toBe(true);
      wrapper.unmount();
    });

    it(':theme[card] does not render cellAppend', () => {
      const wrapper = mount(
        <Calendar theme="card" year={2020} month={12} cellAppend={() => <div class="test-append">append</div>} />,
      );
      expect(wrapper.find('.test-append').exists()).toBe(false);
      wrapper.unmount();
    });

    it('now class for current date in month mode', () => {
      // MockDate is 2020-12-28
      const wrapper = mount(<Calendar year={2020} month={12} value="2020-12-01" />);
      const nowCell = wrapper.find('.t-calendar__table-body-cell--now');
      expect(nowCell.exists()).toBe(true);
      wrapper.unmount();
    });

    it('now class for current month in year mode', () => {
      const wrapper = mount(<Calendar mode="year" year={2020} />);
      const nowCell = wrapper.find('.t-calendar__table-body-cell--now');
      expect(nowCell.exists()).toBe(true);
      wrapper.unmount();
    });

    it('no now class for different year in year mode', () => {
      const wrapper = mount(<Calendar mode="year" year={2019} />);
      const nowCell = wrapper.find('.t-calendar__table-body-cell--now');
      expect(nowCell.exists()).toBe(false);
      wrapper.unmount();
    });

    it('disabled class for non-current month cells', () => {
      const wrapper = mount(<Calendar year={2020} month={12} />);
      const disabledCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-disabled');
      expect(disabledCells.length).toBeGreaterThan(0);
      wrapper.unmount();
    });

    it('checked class for selected date', () => {
      const wrapper = mount(<Calendar year={2020} month={12} value="2020-12-15" />);
      const checkedCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-checked');
      expect(checkedCells.length).toBe(1);
      wrapper.unmount();
    });

    it('multiple checked cells in multiple mode', () => {
      const wrapper = mount(
        <Calendar year={2020} month={12} multiple={true} value={['2020-12-16', '2020-12-17', '2020-12-25']} />,
      );
      const checkedCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-checked');
      expect(checkedCells.length).toBe(3);
      wrapper.unmount();
    });
  });

  describe('events', () => {
    it('click on enabled cell emits', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellClick={onCellClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('click');
      expect(onCellClick).toHaveBeenCalledTimes(1);
      expect(onCellClick.mock.calls[0][0]).toHaveProperty('cell');
      expect(onCellClick.mock.calls[0][0]).toHaveProperty('e');
      wrapper.unmount();
    });

    it('dblclick on enabled cell emits', async () => {
      const onCellDoubleClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellDoubleClick={onCellDoubleClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('dblclick');
      expect(onCellDoubleClick).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('contextmenu on enabled cell emits', async () => {
      const onCellRightClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellRightClick={onCellRightClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('contextmenu');
      expect(onCellRightClick).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('click on disabled cell does not emit', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellClick={onCellClick} />);
      const disabledCell = wrapper.find('.t-calendar__table-body-cell.t-is-disabled');
      if (disabledCell.exists()) {
        await disabledCell.trigger('click');
        expect(onCellClick).not.toHaveBeenCalled();
      }
      wrapper.unmount();
    });

    it('dblclick on disabled cell does not emit', async () => {
      const onCellDoubleClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellDoubleClick={onCellDoubleClick} />);
      const disabledCell = wrapper.find('.t-calendar__table-body-cell.t-is-disabled');
      if (disabledCell.exists()) {
        await disabledCell.trigger('dblclick');
        expect(onCellDoubleClick).not.toHaveBeenCalled();
      }
      wrapper.unmount();
    });

    it('contextmenu on disabled cell does not emit', async () => {
      const onCellRightClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellRightClick={onCellRightClick} />);
      const disabledCell = wrapper.find('.t-calendar__table-body-cell.t-is-disabled');
      if (disabledCell.exists()) {
        await disabledCell.trigger('contextmenu');
        expect(onCellRightClick).not.toHaveBeenCalled();
      }
      wrapper.unmount();
    });

    it('year mode cell click emits', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(<Calendar mode="year" year={2020} onCellClick={onCellClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell');
      await cell.trigger('click');
      expect(onCellClick).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('year mode cell dblclick emits', async () => {
      const onCellDoubleClick = vi.fn();
      const wrapper = mount(<Calendar mode="year" year={2020} onCellDoubleClick={onCellDoubleClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell');
      await cell.trigger('dblclick');
      expect(onCellDoubleClick).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('year mode cell contextmenu emits', async () => {
      const onCellRightClick = vi.fn();
      const wrapper = mount(<Calendar mode="year" year={2020} onCellRightClick={onCellRightClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell');
      await cell.trigger('contextmenu');
      expect(onCellRightClick).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it('no error when event callbacks not provided', async () => {
      const wrapper = mount(<Calendar year={2020} month={12} />);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('click');
      await cell.trigger('dblclick');
      await cell.trigger('contextmenu');
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });
  });
});
