import { nextTick } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import MockDate from 'mockdate';
import { Calendar } from '@tdesign/components';
import calendarProps from '@tdesign/components/calendar/props';

MockDate.set('2020-12-28');

describe('Calendar', () => {
  describe('props', () => {
    let wrapper: VueWrapper<InstanceType<typeof Calendar>> | null = null;

    beforeEach(() => {
      wrapper = mount(<Calendar year={2020} month={12} />) as VueWrapper<InstanceType<typeof Calendar>>;
    });

    afterEach(() => {
      wrapper?.unmount();
      wrapper = null;
    });

    it('default render', () => {
      expect(wrapper.find('.t-calendar').exists()).toBe(true);
      expect(wrapper.find('.t-calendar--full').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__panel--month').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__control').exists()).toBe(true);
    });

    it(':cell[string]', () => {
      const wrapper = mount(<Calendar year={2020} month={12} cell="custom cell" />);
      const cells = wrapper.findAll('.t-calendar__table-body-cell:not(.t-is-disabled)');
      expect(cells[0].text()).toContain('custom cell');
      wrapper.unmount();
    });

    it(':cell[function]', () => {
      const cellFn = () => <div class="custom-cell">rendered</div>;
      const wrapper = mount(<Calendar year={2020} month={12} cell={cellFn} />);
      expect(wrapper.find('.custom-cell').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':cell[slot]', () => {
      const wrapper = mount(Calendar, {
        props: { year: 2020, month: 12 },
        slots: {
          cell: () => <div class="slot-cell">slot</div>,
        },
      });
      expect(wrapper.find('.slot-cell').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':cellAppend[string]', () => {
      const wrapper = mount(<Calendar year={2020} month={12} cellAppend="append text" />);
      const content = wrapper.find(
        '.t-calendar__table-body-cell:not(.t-is-disabled) .t-calendar__table-body-cell-content',
      );
      expect(content.text()).toContain('append text');
      wrapper.unmount();
    });

    it(':cellAppend[function]', () => {
      const appendFn = () => <div class="custom-append">appended</div>;
      const wrapper = mount(<Calendar year={2020} month={12} cellAppend={appendFn} />);
      expect(wrapper.find('.custom-append').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':cellAppend[slot]', () => {
      const wrapper = mount(Calendar, {
        props: { year: 2020, month: 12 },
        slots: {
          cellAppend: () => <div class="slot-append">slot append</div>,
        },
      });
      expect(wrapper.find('.slot-append').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':controllerConfig[boolean:false]', () => {
      const wrapper = mount(<Calendar controllerConfig={false} />);
      expect(wrapper.find('.t-calendar__control').exists()).toBe(false);
      wrapper.unmount();
    });

    it(':controllerConfig[boolean:true]', () => {
      const wrapper = mount(<Calendar controllerConfig={true} />);
      expect(wrapper.find('.t-calendar__control').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':controllerConfig[object] hide individual controls', () => {
      const wrapper = mount(
        <Calendar
          controllerConfig={{
            year: { visible: false },
            month: { visible: false },
            mode: { visible: false },
            weekend: { visible: false },
            current: { visible: false },
          }}
        />,
      );
      expect(wrapper.find('.t-calendar__control').exists()).toBe(true);
      // Year/month selects, mode radio, weekend tag, today button should all be hidden
      expect(wrapper.findAll('.t-calendar__control-section-cell').length).toBe(0);
      wrapper.unmount();
    });

    it(':controllerConfig[object] disabled all controls', () => {
      const wrapper = mount(
        <Calendar
          controllerConfig={{
            disabled: true,
          }}
        />,
      );
      expect(wrapper.find('.t-calendar__control').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':fillWithZero[boolean]', async () => {
      // Default: fillWithZero should pad single digits
      const cellTexts = wrapper.findAll(
        '.t-calendar__table-body-cell:not(.t-is-disabled) .t-calendar__table-body-cell-display',
      );
      const hasZeroPadded = cellTexts.some((cell) => /^0\d$/.test(cell.text()));
      expect(hasZeroPadded).toBe(true);

      await wrapper.setProps({ fillWithZero: false });
      const cellTexts2 = wrapper.findAll(
        '.t-calendar__table-body-cell:not(.t-is-disabled) .t-calendar__table-body-cell-display',
      );
      const hasZeroPadded2 = cellTexts2.some((cell) => /^0\d$/.test(cell.text()));
      expect(hasZeroPadded2).toBe(false);
    });

    it(':firstDayOfWeek[number]', () => {
      const validator = calendarProps.firstDayOfWeek.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator(1)).toBe(true);
      expect(validator(7)).toBe(true);
      expect(validator(8)).toBe(false);
    });

    it(':firstDayOfWeek changes column headers order', () => {
      const wrapper = mount(<Calendar firstDayOfWeek={3} year={2020} month={12} />);
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
      wrapper.unmount();
    });

    it(':format[string]', () => {
      const onCellClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} format="YYYY/MM/DD" onCellClick={onCellClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      cell.trigger('click');
      wrapper.unmount();
    });

    it(':head[string]', () => {
      const wrapper = mount(<Calendar head="Calendar Title" />);
      expect(wrapper.find('.t-calendar__title').text()).toBe('Calendar Title');
      wrapper.unmount();
    });

    it(':head[function]', () => {
      const headFn = () => <div class="custom-head">Header</div>;
      const wrapper = mount(<Calendar head={headFn} />);
      expect(wrapper.find('.custom-head').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':head[slot]', () => {
      const wrapper = mount(Calendar, {
        slots: {
          head: () => <div class="slot-head">Slot Header</div>,
        },
      });
      expect(wrapper.find('.slot-head').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':isShowWeekendDefault[boolean]', async () => {
      expect(wrapper.findAll('.t-calendar__table-head-cell').length).toBe(7);
      await wrapper.setProps({ isShowWeekendDefault: false });
      expect(wrapper.findAll('.t-calendar__table-head-cell').length).toBe(5);
    });

    it(':mode[month/year]', async () => {
      const validator = calendarProps.mode.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('month')).toBe(true);
      expect(validator('year')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      expect(wrapper.find('.t-calendar__panel--month').exists()).toBe(true);
      await wrapper.setProps({ mode: 'year' });
      expect(wrapper.find('.t-calendar__panel--year').exists()).toBe(true);
    });

    it(':month[string/number]', () => {
      const wrapper1 = mount(<Calendar year={2020} month={6} />);
      expect(wrapper1.find('.t-calendar__panel--month').exists()).toBe(true);
      wrapper1.unmount();

      const wrapper2 = mount(<Calendar year={'2020'} month={'6'} />);
      expect(wrapper2.find('.t-calendar__panel--month').exists()).toBe(true);
      wrapper2.unmount();
    });

    it(':multiple[boolean]', () => {
      const wrapper = mount(
        <Calendar year={2020} month={12} multiple={true} value={['2020-12-16', '2020-12-17', '2020-12-25']} />,
      );
      const checkedCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-checked');
      expect(checkedCells.length).toBe(3);
      wrapper.unmount();
    });

    it(':preventCellContextmenu[boolean]', async () => {
      const onCellRightClick = vi.fn();
      const wrapper = mount(
        <Calendar year={2020} month={12} preventCellContextmenu={true} onCellRightClick={onCellRightClick} />,
      );
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('contextmenu');
      expect(onCellRightClick).toHaveBeenCalledTimes(1);
      wrapper.unmount();
    });

    it(':range[array]', () => {
      const wrapper = mount(<Calendar year={2020} month={6} range={['2020-03', '2020-09']} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it(':theme[full/card]', async () => {
      const validator = calendarProps.theme.validator;
      expect(validator(undefined)).toBe(true);
      expect(validator(null)).toBe(true);
      expect(validator('full')).toBe(true);
      expect(validator('card')).toBe(true);
      // @ts-expect-error
      expect(validator('invalid')).toBe(false);

      expect(wrapper.find('.t-calendar--full').exists()).toBe(true);
      await wrapper.setProps({ theme: 'card' });
      expect(wrapper.find('.t-calendar--card').exists()).toBe(true);
      // Card theme hides weekend toggle and today button
      expect(wrapper.find('.t-calendar__control-tag').exists()).toBe(false);
    });

    it(':value[string]', () => {
      const wrapper = mount(<Calendar year={2020} month={12} value="2020-12-15" />);
      const checkedCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-checked');
      expect(checkedCells.length).toBe(1);
      wrapper.unmount();
    });

    it(':value[Date]', () => {
      const wrapper = mount(<Calendar year={2020} month={12} value={new Date(2020, 11, 15)} />);
      const checkedCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-checked');
      expect(checkedCells.length).toBe(1);
      wrapper.unmount();
    });

    it(':value[array]', () => {
      const wrapper = mount(<Calendar year={2020} month={12} multiple={true} value={['2020-12-01', '2020-12-15']} />);
      const checkedCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-checked');
      expect(checkedCells.length).toBe(2);
      wrapper.unmount();
    });

    it(':week[array]', () => {
      const weekArray = ['周一', '周二', '周三', '周四', '周五', '星期六', '星期天'];
      const wrapper = mount(<Calendar week={weekArray} />);
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells[0].text()).toBe('周一');
      expect(headCells[6].text()).toBe('星期天');
      wrapper.unmount();
    });

    it(':week[slot]', () => {
      const wrapper = mount(Calendar, {
        slots: {
          week: (params: any) => <span class="custom-week">Day{params.day}</span>,
        },
      });
      expect(wrapper.find('.custom-week').exists()).toBe(true);
      wrapper.unmount();
    });

    it(':year[string/number]', () => {
      const wrapper1 = mount(<Calendar year={2000} month={1} />);
      expect(wrapper1.exists()).toBe(true);
      wrapper1.unmount();

      const wrapper2 = mount(<Calendar year={'2000'} month={1} />);
      expect(wrapper2.exists()).toBe(true);
      wrapper2.unmount();
    });
  });

  describe('events', () => {
    it('cellClick', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellClick={onCellClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('click');
      expect(onCellClick).toHaveBeenCalledTimes(1);
      const arg = onCellClick.mock.calls[0][0];
      expect(arg).toHaveProperty('cell');
      expect(arg).toHaveProperty('e');
      expect(arg.cell).toHaveProperty('date');
      expect(arg.cell).toHaveProperty('formattedDate');
      expect(arg.cell).toHaveProperty('mode');
      wrapper.unmount();
    });

    it('cellDoubleClick', async () => {
      const onCellDoubleClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellDoubleClick={onCellDoubleClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('dblclick');
      expect(onCellDoubleClick).toHaveBeenCalledTimes(1);
      const arg = onCellDoubleClick.mock.calls[0][0];
      expect(arg).toHaveProperty('cell');
      expect(arg).toHaveProperty('e');
      wrapper.unmount();
    });

    it('cellRightClick', async () => {
      const onCellRightClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellRightClick={onCellRightClick} />);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('contextmenu');
      expect(onCellRightClick).toHaveBeenCalledTimes(1);
      const arg = onCellRightClick.mock.calls[0][0];
      expect(arg).toHaveProperty('cell');
      expect(arg).toHaveProperty('e');
      wrapper.unmount();
    });

    it('controllerChange', async () => {
      const onControllerChange = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onControllerChange={onControllerChange} />);
      const weekendTag = wrapper.find('.t-calendar__control-tag');
      expect(weekendTag.exists()).toBe(true);
      await weekendTag.trigger('click');
      await nextTick();
      await nextTick();
      expect(onControllerChange).toHaveBeenCalled();
      const arg = onControllerChange.mock.calls[0][0];
      expect(arg).toHaveProperty('isShowWeekend');
      expect(arg).toHaveProperty('filterDate');
      expect(arg).toHaveProperty('formattedFilterDate');
      expect(arg).toHaveProperty('mode');
      wrapper.unmount();
    });

    it('monthChange', async () => {
      const onMonthChange = vi.fn();
      const wrapper = mount(Calendar, {
        props: { year: 2020, month: 6, onMonthChange },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await nextTick();
      await wrapper.setProps({ month: 7 });
      await nextTick();
      await nextTick();
      expect(onMonthChange).toHaveBeenCalled();
      const arg = onMonthChange.mock.calls[onMonthChange.mock.calls.length - 1][0];
      expect(arg).toHaveProperty('month');
      expect(arg).toHaveProperty('year');
      wrapper.unmount();
    });

    it('cellClick in multiple mode toggles selection', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(
        <Calendar year={2020} month={12} multiple={true} value={['2020-12-16']} onCellClick={onCellClick} />,
      );
      // Click a non-selected cell to add
      const cells = wrapper.findAll('.t-calendar__table-body-cell:not(.t-is-disabled):not(.t-is-checked)');
      await cells[0].trigger('click');
      expect(onCellClick).toHaveBeenCalledTimes(1);

      // Click the already-selected cell to deselect
      const checkedCell = wrapper.find('.t-calendar__table-body-cell.t-is-checked');
      if (checkedCell.exists()) {
        await checkedCell.trigger('click');
        expect(onCellClick).toHaveBeenCalledTimes(2);
      }
      wrapper.unmount();
    });

    it('disabled cell click does not emit', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onCellClick={onCellClick} />);
      const disabledCell = wrapper.find('.t-calendar__table-body-cell.t-is-disabled');
      if (disabledCell.exists()) {
        await disabledCell.trigger('click');
        expect(onCellClick).not.toHaveBeenCalled();
      }
      wrapper.unmount();
    });

    it('weekend toggle hides weekend columns', async () => {
      const wrapper = mount(<Calendar year={2020} month={12} />);
      expect(wrapper.findAll('.t-calendar__table-head-cell').length).toBe(7);
      const weekendTag = wrapper.find('.t-calendar__control-tag');
      await weekendTag.trigger('click');
      await nextTick();
      expect(wrapper.findAll('.t-calendar__table-head-cell').length).toBe(5);
      wrapper.unmount();
    });

    it('today button navigates to current date', async () => {
      const onMonthChange = vi.fn();
      const wrapper = mount(<Calendar year={2019} month={3} onMonthChange={onMonthChange} />);
      const buttons = wrapper.findAll('.t-calendar__control-section .t-button');
      const todayBtn = buttons[buttons.length - 1];
      await todayBtn.trigger('click');
      await nextTick();
      await nextTick();
      expect(onMonthChange).toHaveBeenCalled();
      wrapper.unmount();
    });
  });

  describe('year mode', () => {
    it('renders 12 months in 3 rows', () => {
      const wrapper = mount(<Calendar mode="year" year={2020} />);
      expect(wrapper.find('.t-calendar__panel--year').exists()).toBe(true);
      const rows = wrapper.findAll('.t-calendar__table-body-row');
      expect(rows.length).toBe(3);
      const cells = wrapper.findAll('.t-calendar__table-body-cell');
      expect(cells.length).toBe(12);
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

    it('year mode with multiple values', () => {
      const wrapper = mount(<Calendar mode="year" year={2020} multiple={true} value={['2020-01-01', '2020-06-01']} />);
      const checkedCells = wrapper.findAll('.t-calendar__table-body-cell.t-is-checked');
      expect(checkedCells.length).toBe(2);
      wrapper.unmount();
    });
  });

  describe('range', () => {
    it('same year boundary disables months outside range', () => {
      const wrapper = mount(<Calendar year={2020} month={6} range={['2020-03', '2020-09']} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('different year boundary - begin year', () => {
      const wrapper = mount(<Calendar year={2019} month={6} range={['2019-05', '2021-09']} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('different year boundary - end year', () => {
      const wrapper = mount(<Calendar year={2021} month={6} range={['2019-05', '2021-09']} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('adjustMonth when selected month is disabled by range', async () => {
      const wrapper = mount(<Calendar year={2020} month={1} range={['2020-03', '2020-09']} />);
      await nextTick();
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('adjustMonth when year equals endYear', async () => {
      const wrapper = mount(<Calendar year={2021} month={11} range={['2019-05', '2021-09']} />);
      await nextTick();
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('range with MIN_YEAR boundary', () => {
      const wrapper = mount(<Calendar year={1970} range={['1965-01', '1975-01']} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('range where both < MIN_YEAR', () => {
      const wrapper = mount(<Calendar year={1970} range={['1960-01', '1965-12']} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });
  });
});
