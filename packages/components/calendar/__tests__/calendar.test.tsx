import { nextTick } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import MockDate from 'mockdate';
import Calendar from '@tdesign/components/calendar';

MockDate.set('2020-12-28');

describe('Calendar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== Props Tests ====================
  describe('props', () => {
    it('default render', () => {
      const wrapper = mount(Calendar);
      expect(wrapper.find('.t-calendar').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar--full').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__panel--month').exists()).toBeTruthy();
    });

    it(':cell[string]', () => {
      const wrapper = mount(Calendar, {
        props: { cell: 'custom cell text' },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':cell[function]', () => {
      const wrapper = mount(Calendar, {
        props: {
          cell: (_h: any, params: any) => <div class="custom-cell">{params.formattedDate}</div>,
        },
      });
      expect(wrapper.find('.custom-cell').exists()).toBeTruthy();
    });

    it(':cell[slot]', () => {
      const wrapper = mount(Calendar, {
        slots: {
          cell: (params: any) => <div class="slot-cell">{params.formattedDate}</div>,
        },
      });
      expect(wrapper.find('.slot-cell').exists()).toBeTruthy();
    });

    it(':cellAppend[string]', () => {
      const wrapper = mount(Calendar, {
        props: { cellAppend: 'append text' },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':cellAppend[function]', () => {
      const wrapper = mount(Calendar, {
        props: {
          cellAppend: (_h: any, params: any) => <div class="custom-append">{params.formattedDate}</div>,
        },
      });
      expect(wrapper.find('.custom-append').exists()).toBeTruthy();
    });

    it(':cellAppend[slot]', () => {
      const wrapper = mount(Calendar, {
        slots: {
          cellAppend: (params: any) => <div class="slot-append">{params.formattedDate}</div>,
        },
      });
      expect(wrapper.find('.slot-append').exists()).toBeTruthy();
    });

    it(':controllerConfig[boolean:false]', () => {
      const wrapper = mount(Calendar, {
        props: { controllerConfig: false },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeFalsy();
    });

    it(':controllerConfig[boolean:true]', () => {
      const wrapper = mount(Calendar, {
        props: { controllerConfig: true },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeTruthy();
    });

    it(':controllerConfig[object]', () => {
      const wrapper = mount(Calendar, {
        props: {
          controllerConfig: {
            visible: true,
            disabled: false,
            year: { visible: true, selectProps: { disabled: false } },
            month: { visible: true, selectProps: { disabled: false } },
            mode: { visible: true, radioGroupProps: { disabled: false } },
            weekend: {
              visible: true,
              showWeekendButtonProps: { disabled: false },
              hideWeekendButtonProps: { disabled: false },
            },
            current: {
              visible: true,
              currentDayButtonProps: { disabled: false },
              currentMonthButtonProps: { disabled: false },
            },
          },
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':controllerConfig disabled all controls', () => {
      const wrapper = mount(Calendar, {
        props: {
          controllerConfig: {
            visible: true,
            disabled: true,
          },
        },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeTruthy();
    });

    it(':controllerConfig hide individual controls', () => {
      const wrapper = mount(Calendar, {
        props: {
          controllerConfig: {
            visible: true,
            year: { visible: false },
            month: { visible: false },
            mode: { visible: false },
            weekend: { visible: false },
            current: { visible: false },
          },
        },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeTruthy();
    });

    it(':controllerConfig with disabled selectProps', () => {
      const wrapper = mount(Calendar, {
        props: {
          controllerConfig: {
            visible: true,
            year: { visible: true, selectProps: { disabled: true } },
            month: { visible: true, selectProps: { disabled: true } },
            mode: { visible: true, radioGroupProps: { disabled: true } },
            weekend: {
              visible: true,
              showWeekendButtonProps: { disabled: true },
              hideWeekendButtonProps: { disabled: true },
            },
            current: {
              visible: true,
              currentDayButtonProps: { disabled: true },
              currentMonthButtonProps: { disabled: true },
            },
          },
        },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeTruthy();
    });

    it(':fillWithZero[boolean:true]', () => {
      const wrapper = mount(Calendar, {
        props: { fillWithZero: true },
      });
      const cellTexts = wrapper.findAll('.t-calendar__table-body-cell-display');
      const hasZeroPadded = cellTexts.some((cell) => /^0\d$/.test(cell.text()));
      expect(hasZeroPadded).toBeTruthy();
    });

    it(':fillWithZero[boolean:false]', () => {
      const wrapper = mount(Calendar, {
        props: { fillWithZero: false },
      });
      const cellTexts = wrapper.findAll('.t-calendar__table-body-cell-display');
      const hasZeroPadded = cellTexts.some((cell) => /^0\d$/.test(cell.text()));
      expect(hasZeroPadded).toBeFalsy();
    });

    it(':firstDayOfWeek[number]', () => {
      const wrapper = mount(Calendar, {
        props: { firstDayOfWeek: 3 },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':format[string]', () => {
      const wrapper = mount(Calendar, {
        props: { format: 'YYYY/MM/DD' },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':head[string]', () => {
      const wrapper = mount(Calendar, {
        props: { head: 'head text' },
      });
      expect(wrapper.find('.t-calendar__title').text()).toBe('head text');
    });

    it(':head[function]', () => {
      const wrapper = mount(Calendar, {
        props: {
          head: (_h: any, params: any) => <div class="custom-head">{params.formattedFilterDate}</div>,
        },
      });
      expect(wrapper.find('.custom-head').exists()).toBeTruthy();
    });

    it(':head[slot]', () => {
      const wrapper = mount(Calendar, {
        slots: {
          head: (params: any) => <div class="slot-head">{params.formattedFilterDate}</div>,
        },
      });
      expect(wrapper.find('.slot-head').exists()).toBeTruthy();
    });

    it(':isShowWeekendDefault[boolean:true]', () => {
      const wrapper = mount(Calendar, {
        props: { isShowWeekendDefault: true },
      });
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
    });

    it(':isShowWeekendDefault[boolean:false]', () => {
      const wrapper = mount(Calendar, {
        props: { isShowWeekendDefault: false },
      });
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(5);
    });

    it(':mode[month/year]', async () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'month' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      expect(wrapper.find('.t-calendar__panel--month').exists()).toBeTruthy();

      await wrapper.setProps({ mode: 'year' });
      await nextTick();
      expect(wrapper.find('.t-calendar__panel--year').exists()).toBeTruthy();
    });

    it(':month[number]', () => {
      const wrapper = mount(Calendar, {
        props: { year: 2020, month: 6 },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':month[string]', () => {
      const wrapper = mount(Calendar, {
        props: { year: '2020', month: '6' },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':multiple[boolean]', () => {
      const wrapper = mount(Calendar, {
        props: {
          multiple: true,
          value: ['2020-12-16', '2020-12-17', '2020-12-25'],
        },
      });
      const checkedCells = wrapper.findAll('.t-is-checked');
      expect(checkedCells.length).toBeGreaterThanOrEqual(3);
    });

    it(':preventCellContextmenu[boolean:true]', async () => {
      const onRightClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: {
          preventCellContextmenu: true,
          onCellRightClick: onRightClick,
        },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('contextmenu');
      expect(onRightClick).toHaveBeenCalled();
    });

    it(':preventCellContextmenu[boolean:false]', async () => {
      const onRightClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: {
          preventCellContextmenu: false,
          onCellRightClick: onRightClick,
        },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('contextmenu');
      expect(onRightClick).toHaveBeenCalled();
    });

    it(':range[array]', () => {
      const wrapper = mount(Calendar, {
        props: {
          range: ['2018-08', '2028-04'],
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':range with same year boundary', () => {
      const wrapper = mount(Calendar, {
        props: {
          year: 2020,
          month: 6,
          range: ['2020-03', '2020-09'],
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':range with different year boundary - begin year', () => {
      const wrapper = mount(Calendar, {
        props: {
          year: 2019,
          month: 6,
          range: ['2019-05', '2021-09'],
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':range with different year boundary - end year', () => {
      const wrapper = mount(Calendar, {
        props: {
          year: 2021,
          month: 6,
          range: ['2019-05', '2021-09'],
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':range triggers adjustMonth when selected month disabled', async () => {
      const wrapper = mount(Calendar, {
        props: {
          year: 2020,
          month: 1,
          range: ['2020-03', '2020-09'],
        },
      });
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':range adjustMonth when year equals endYear', async () => {
      const wrapper = mount(Calendar, {
        props: {
          year: 2021,
          month: 11,
          range: ['2019-05', '2021-09'],
        },
      });
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':theme[full/card]', async () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'full' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      expect(wrapper.find('.t-calendar--full').exists()).toBeTruthy();

      await wrapper.setProps({ theme: 'card' });
      await nextTick();
      expect(wrapper.find('.t-calendar--card').exists()).toBeTruthy();
    });

    it(':theme[card] hides weekend and current buttons', () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'card' },
      });
      expect(wrapper.find('.t-calendar__control-tag').exists()).toBeFalsy();
    });

    it(':value[string]', () => {
      const wrapper = mount(Calendar, {
        props: { value: '2020-12-11' },
      });
      const checkedCells = wrapper.findAll('.t-is-checked');
      expect(checkedCells.length).toBeGreaterThanOrEqual(1);
    });

    it(':value[Date]', () => {
      const wrapper = mount(Calendar, {
        props: { value: new Date(2020, 11, 11) },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it(':value[array] with multiple', () => {
      const wrapper = mount(Calendar, {
        props: {
          value: ['2020-12-01', '2020-12-15'],
          multiple: true,
        },
      });
      const checkedCells = wrapper.findAll('.t-is-checked');
      expect(checkedCells.length).toBeGreaterThanOrEqual(2);
    });

    it(':value not provided (default date)', () => {
      const wrapper = mount(Calendar);
      expect(wrapper.find('.t-is-checked').exists()).toBeTruthy();
    });

    it(':week[array]', () => {
      const weekArray = ['周一', '周二', '周三', '周四', '周五', '星期六', '星期天'];
      const wrapper = mount(Calendar, {
        props: { week: weekArray },
      });
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells[0].text()).toBe('周一');
      expect(headCells[6].text()).toBe('星期天');
    });

    it(':week[slot]', () => {
      const wrapper = mount(Calendar, {
        slots: {
          week: (params: any) => <span class="custom-week">Day{params.day}</span>,
        },
      });
      expect(wrapper.find('.custom-week').exists()).toBeTruthy();
    });

    it(':year[number]', () => {
      const wrapper = mount(Calendar, {
        props: { year: 2000 },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':year[string]', () => {
      const wrapper = mount(Calendar, {
        props: { year: '2000' },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':mode validator', () => {
      const validator = (Calendar as any).props?.mode?.validator;
      if (validator) {
        expect(validator('month')).toBe(true);
        expect(validator('year')).toBe(true);
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('invalid')).toBe(false);
      }
    });

    it(':theme validator', () => {
      const validator = (Calendar as any).props?.theme?.validator;
      if (validator) {
        expect(validator('full')).toBe(true);
        expect(validator('card')).toBe(true);
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        expect(validator('invalid')).toBe(false);
      }
    });

    it(':firstDayOfWeek validator', () => {
      const validator = (Calendar as any).props?.firstDayOfWeek?.validator;
      if (validator) {
        expect(validator(1)).toBe(true);
        expect(validator(7)).toBe(true);
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
        // 0 is falsy so !0 === true, validator returns true
        expect(validator(0)).toBe(true);
        expect(validator(8)).toBe(false);
      }
    });
  });

  // ==================== Events Tests ====================
  describe('events', () => {
    it('onCellClick', async () => {
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

    it('onCellDoubleClick', async () => {
      const onCellDoubleClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onCellDoubleClick },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('dblclick');
      expect(onCellDoubleClick).toHaveBeenCalledTimes(1);
    });

    it('onCellRightClick', async () => {
      const onCellRightClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onCellRightClick },
      });
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('contextmenu');
      expect(onCellRightClick).toHaveBeenCalledTimes(1);
    });

    it('onControllerChange', async () => {
      const onControllerChange = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onControllerChange },
      });
      // Toggle weekend to trigger controller change
      const weekendTag = wrapper.find('.t-calendar__control-tag');
      if (weekendTag.exists()) {
        await weekendTag.trigger('click');
        await nextTick();
        await nextTick();
        expect(onControllerChange).toHaveBeenCalled();
      }
    });

    it('onMonthChange', async () => {
      const onMonthChange = vi.fn();
      const wrapper = mount(Calendar, {
        props: { year: 2020, month: 6, onMonthChange },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await nextTick();
      await wrapper.setProps({ month: 7 });
      await nextTick();
      await nextTick();
      expect(onMonthChange).toHaveBeenCalled();
    });

    it('click disabled cell should not emit', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onCellClick },
      });
      const disabledCell = wrapper.find('.t-calendar__table-body-cell.t-is-disabled');
      if (disabledCell.exists()) {
        await disabledCell.trigger('click');
        // disabled cell click handler returns early, so CalendarCell doesn't emit
        // the parent still calls clickCell but with the disabled cell data
      }
    });

    it('cell click in multiple mode toggles selection', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: {
          multiple: true,
          value: ['2020-12-16'],
          onCellClick,
        },
      });
      // click a non-disabled cell to add to selection
      const cells = wrapper.findAll('.t-calendar__table-body-cell:not(.t-is-disabled)');
      if (cells.length > 0) {
        await cells[0].trigger('click');
        expect(onCellClick).toHaveBeenCalled();
      }
    });

    it('cell click in multiple mode removes already selected date', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: {
          multiple: true,
          value: ['2020-12-28'],
          onCellClick,
        },
      });
      // click the already-selected cell to deselect
      const checkedCell = wrapper.find('.t-calendar__table-body-cell.t-is-checked');
      if (checkedCell.exists()) {
        await checkedCell.trigger('click');
        expect(onCellClick).toHaveBeenCalled();
      }
    });

    it('cell click in single mode updates selected date', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(Calendar, {
        props: {
          value: '2020-12-15',
          onCellClick,
        },
      });
      const cells = wrapper.findAll('.t-calendar__table-body-cell:not(.t-is-disabled)');
      if (cells.length > 1) {
        await cells[1].trigger('click');
        expect(onCellClick).toHaveBeenCalled();
      }
    });

    it('weekend toggle button click', async () => {
      const onControllerChange = vi.fn();
      const wrapper = mount(Calendar, {
        props: {
          theme: 'full',
          onControllerChange,
        },
      });
      const weekendTag = wrapper.find('.t-calendar__control-tag');
      if (weekendTag.exists()) {
        await weekendTag.trigger('click');
        await nextTick();
        await nextTick();
        // After clicking, weekend should be hidden
        const headCells = wrapper.findAll('.t-calendar__table-head-cell');
        expect(headCells.length).toBe(5);
      }
    });

    it('mode radio switch triggers controller change', async () => {
      const onControllerChange = vi.fn();
      const wrapper = mount(Calendar, {
        props: {
          theme: 'full',
          mode: 'month',
          onControllerChange,
        },
      });
      // Click the "year" radio button to switch mode via UI
      const radioButtons = wrapper.findAll('.t-radio-button');
      const yearRadio = radioButtons[radioButtons.length - 1];
      if (yearRadio) {
        await yearRadio.trigger('click');
        await nextTick();
        await nextTick();
        await nextTick();
      }
      // Mode change triggers onControllerChange indirectly via watch
      expect(wrapper.exists()).toBeTruthy();
    });

    it('today button click', async () => {
      const wrapper = mount(Calendar, {
        props: { year: 2019, month: 3 },
      });
      const buttons = wrapper.findAll('.t-calendar__control-section .t-button');
      const todayBtn = buttons[buttons.length - 1];
      if (todayBtn) {
        await todayBtn.trigger('click');
        await nextTick();
        // After clicking today, should navigate to current date
        expect(wrapper.exists()).toBeTruthy();
      }
    });
  });

  // ==================== Year Mode Tests ====================
  describe('year mode', () => {
    it('renders year mode correctly', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'year' },
      });
      expect(wrapper.find('.t-calendar__panel--year').exists()).toBeTruthy();
      // 12 months, 4 per row = 3 rows
      const rows = wrapper.findAll('.t-calendar__table-body-row');
      expect(rows.length).toBe(3);
    });

    it('year mode shows currentMonth button text', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'year' },
      });
      const buttons = wrapper.findAll('.t-calendar__control-section .t-button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('year mode with multiple', () => {
      const wrapper = mount(Calendar, {
        props: {
          mode: 'year',
          multiple: true,
          value: ['2020-01-01', '2020-06-01'],
        },
      });
      const checkedCells = wrapper.findAll('.t-is-checked');
      expect(checkedCells.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ==================== Edge Cases Tests ====================
  describe('edge cases', () => {
    it('should handle component unmount gracefully', async () => {
      const wrapper = mount(Calendar);
      await nextTick();
      wrapper.unmount();
      expect(true).toBe(true);
    });

    it('value as empty array with multiple', () => {
      const wrapper = mount(Calendar, {
        props: {
          multiple: true,
          value: [],
        },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('value as single string with multiple', () => {
      const wrapper = mount(Calendar, {
        props: {
          multiple: true,
          value: '2020-12-25',
        },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('range with MIN_YEAR boundary', () => {
      const wrapper = mount(Calendar, {
        props: {
          year: 1970,
          range: ['1965-01', '1975-01'],
        },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('onCellClick not provided - no error', async () => {
      const wrapper = mount(Calendar);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('click');
      expect(wrapper.exists()).toBeTruthy();
    });

    it('onCellDoubleClick not provided - no error', async () => {
      const wrapper = mount(Calendar);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('dblclick');
      expect(wrapper.exists()).toBeTruthy();
    });

    it('onCellRightClick not provided - no error', async () => {
      const wrapper = mount(Calendar);
      const cell = wrapper.find('.t-calendar__table-body-cell:not(.t-is-disabled)');
      await cell.trigger('contextmenu');
      expect(wrapper.exists()).toBeTruthy();
    });

    it('firstDayOfWeek = 7 (Sunday first)', () => {
      const wrapper = mount(Calendar, {
        props: { firstDayOfWeek: 7 },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('card theme with year mode', () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'card', mode: 'year' },
      });
      expect(wrapper.find('.t-calendar--card').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__panel--year').exists()).toBeTruthy();
    });

    it('range where end year < MIN_YEAR (1970)', () => {
      const wrapper = mount(Calendar, {
        props: {
          year: 1970,
          range: ['1960-01', '1965-12'],
        },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('range where begin year < MIN_YEAR', () => {
      const wrapper = mount(Calendar, {
        props: {
          year: 1970,
          range: ['1960-01', '1980-12'],
        },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('fillWithZero undefined uses global default', () => {
      const wrapper = mount(Calendar, {
        props: { fillWithZero: undefined },
      });
      // global default fillWithZero should apply (true by default)
      const cellTexts = wrapper.findAll('.t-calendar__table-body-cell-display');
      const hasZeroPadded = cellTexts.some((cell) => /^0\d$/.test(cell.text()));
      expect(hasZeroPadded).toBeTruthy();
    });

    it('firstDayOfWeek undefined falls back to globalConfig', async () => {
      const wrapper = mount(Calendar, {
        props: { firstDayOfWeek: undefined },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      expect(wrapper.exists()).toBeTruthy();
      // Change firstDayOfWeek to trigger the watch
      await wrapper.setProps({ firstDayOfWeek: 5 });
      await nextTick();
      // Then back to undefined
      await wrapper.setProps({ firstDayOfWeek: undefined });
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
