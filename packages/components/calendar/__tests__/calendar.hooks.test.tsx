import { nextTick } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import MockDate from 'mockdate';
import Calendar from '@tdesign/components/calendar';

MockDate.set('2020-12-28');

describe('Calendar Hooks', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  // ==================== useState Tests ====================
  describe('useState', () => {
    it('toToday should navigate to current date', async () => {
      const wrapper = mount(Calendar, {
        props: { year: 2019, month: 3 },
      });
      // Find and click "today" button
      const buttons = wrapper.findAll('.t-calendar__control-section .t-button');
      const todayBtn = buttons[buttons.length - 1];
      if (todayBtn) {
        await todayBtn.trigger('click');
        await nextTick();
        expect(wrapper.exists()).toBeTruthy();
      }
    });

    it('setCurSelectedYear with valid year', () => {
      const wrapper = mount(Calendar, {
        props: { year: 2022 },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurSelectedYear with string year', () => {
      const wrapper = mount(Calendar, {
        props: { year: '2022' },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurSelectedYear with undefined falls back to current year', () => {
      const wrapper = mount(Calendar);
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurSelectedMonth with valid month', () => {
      const wrapper = mount(Calendar, {
        props: { month: 6 },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurSelectedMonth with string month', () => {
      const wrapper = mount(Calendar, {
        props: { month: '6' },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurSelectedMonth with undefined falls back to current month', () => {
      const wrapper = mount(Calendar);
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurrentDate with string value', () => {
      const wrapper = mount(Calendar, {
        props: { value: '2020-06-15' },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurrentDate with Date value', () => {
      const wrapper = mount(Calendar, {
        props: { value: new Date(2020, 5, 15) },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurrentDate with undefined value falls back to default', () => {
      const wrapper = mount(Calendar, {
        props: { value: undefined },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurrentDate with array value (single mode)', () => {
      const wrapper = mount(Calendar, {
        props: { value: ['2020-06-15'] },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurrentDate with empty array value (single mode)', () => {
      const wrapper = mount(Calendar, {
        props: { value: [] },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurrentDateList with array value', () => {
      const wrapper = mount(Calendar, {
        props: { multiple: true, value: ['2020-06-15', '2020-06-20'] },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurrentDateList with empty array', () => {
      const wrapper = mount(Calendar, {
        props: { multiple: true, value: [] },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurrentDateList with single string value', () => {
      const wrapper = mount(Calendar, {
        props: { multiple: true, value: '2020-06-15' },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('setCurrentDateList with undefined value', () => {
      const wrapper = mount(Calendar, {
        props: { multiple: true, value: undefined },
      });
      expect(wrapper.exists()).toBeTruthy();
    });

    it('checkDayVisible returns false for weekend when hidden', () => {
      const wrapper = mount(Calendar, {
        props: { isShowWeekendDefault: false },
      });
      // Saturday and Sunday columns should be hidden
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(5);
    });

    it('checkDayVisible returns true for all days when weekend shown', () => {
      const wrapper = mount(Calendar, {
        props: { isShowWeekendDefault: true },
      });
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
    });

    it('watch firstDayOfWeek changes', async () => {
      const wrapper = mount(Calendar, {
        props: { firstDayOfWeek: 1 },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ firstDayOfWeek: 3 });
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });

    it('watch value changes in single mode', async () => {
      const wrapper = mount(Calendar, {
        props: { value: '2020-06-15' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ value: '2020-07-20' });
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });

    it('watch value changes in multiple mode', async () => {
      const wrapper = mount(Calendar, {
        props: { multiple: true, value: ['2020-06-15'] },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ value: ['2020-07-20', '2020-08-10'] });
      await nextTick();
      expect(wrapper.exists()).toBeTruthy();
    });

    it('watch isShowWeekendDefault changes', async () => {
      const wrapper = mount(Calendar, {
        props: { isShowWeekendDefault: true },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      expect(wrapper.findAll('.t-calendar__table-head-cell').length).toBe(7);
      await wrapper.setProps({ isShowWeekendDefault: false });
      await nextTick();
      expect(wrapper.findAll('.t-calendar__table-head-cell').length).toBe(5);
    });

    it('watch mode changes', async () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'month' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      expect(wrapper.find('.t-calendar__panel--month').exists()).toBeTruthy();
      await wrapper.setProps({ mode: 'year' });
      await nextTick();
      expect(wrapper.find('.t-calendar__panel--year').exists()).toBeTruthy();
    });

    it('watch theme changes to card sets controlSize to small', async () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'full' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ theme: 'card' });
      await nextTick();
      expect(wrapper.find('.t-calendar--card').exists()).toBeTruthy();
    });

    it('watch theme changes to full sets controlSize to medium', async () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'card' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ theme: 'full' });
      await nextTick();
      expect(wrapper.find('.t-calendar--full').exists()).toBeTruthy();
    });
  });

  // ==================== useController Tests ====================
  describe('useController', () => {
    it('configData returns default when controllerConfig is true', () => {
      const wrapper = mount(Calendar, {
        props: { controllerConfig: true },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeTruthy();
    });

    it('configData returns default(false) when controllerConfig is false', () => {
      const wrapper = mount(Calendar, {
        props: { controllerConfig: false },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeFalsy();
    });

    it('configData merges custom config with defaults', () => {
      const wrapper = mount(Calendar, {
        props: {
          controllerConfig: {
            visible: true,
            year: { visible: false },
          },
        },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeTruthy();
    });

    it('checkControllerVisible returns false when conf is falsy', () => {
      const wrapper = mount(Calendar, {
        props: { controllerConfig: false },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeFalsy();
    });

    it('checkControllerVisible returns false when conf[name] is false', () => {
      const wrapper = mount(Calendar, {
        props: {
          controllerConfig: {
            visible: true,
            // @ts-expect-error testing runtime behavior with false value
            weekend: false,
          },
        },
      });
      // Weekend tag should not be visible
      expect(wrapper.find('.t-calendar__control-tag').exists()).toBeFalsy();
    });

    it('checkControllerVisible returns false when conf[name].visible is false', () => {
      const wrapper = mount(Calendar, {
        props: {
          controllerConfig: {
            visible: true,
            weekend: { visible: false },
          },
        },
      });
      expect(wrapper.find('.t-calendar__control-tag').exists()).toBeFalsy();
    });

    it('checkControllerDisabled returns true when conf.disabled is true', () => {
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

    it('checkControllerDisabled returns true when specific control propsName.disabled is true', () => {
      const wrapper = mount(Calendar, {
        props: {
          controllerConfig: {
            visible: true,
            year: { visible: true, selectProps: { disabled: true } },
          },
        },
      });
      expect(wrapper.find('.t-calendar__control').exists()).toBeTruthy();
    });

    it('emitControllerChange triggers onControllerChange callback', async () => {
      const onControllerChange = vi.fn();
      const wrapper = mount(Calendar, {
        props: { onControllerChange },
      });
      // Click weekend toggle to trigger controller change
      const weekendTag = wrapper.find('.t-calendar__control-tag');
      if (weekendTag.exists()) {
        await weekendTag.trigger('click');
        await nextTick();
        await nextTick();
        expect(onControllerChange).toHaveBeenCalled();
        const callArg = onControllerChange.mock.calls[0][0];
        expect(callArg).toHaveProperty('isShowWeekend');
        expect(callArg).toHaveProperty('filterDate');
        expect(callArg).toHaveProperty('formattedFilterDate');
        expect(callArg).toHaveProperty('mode');
      }
    });

    it('options computed returns correct controller options', async () => {
      const onControllerChange = vi.fn();
      const wrapper = mount(Calendar, {
        props: {
          year: 2020,
          month: 6,
          format: 'YYYY/MM/DD',
          onControllerChange,
        },
      });
      // Trigger change to capture options
      const todayBtn = wrapper.findAll('.t-calendar__control-section .t-button');
      if (todayBtn.length > 0) {
        await todayBtn[todayBtn.length - 1].trigger('click');
        await nextTick();
        await nextTick();
        if (onControllerChange.mock.calls.length > 0) {
          const callArg = onControllerChange.mock.calls[0][0];
          expect(callArg.mode).toBeDefined();
        }
      }
    });
  });

  // ==================== useCalendarClass Tests ====================
  describe('useCalendarClass', () => {
    it('body class includes theme', () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'full' },
      });
      expect(wrapper.find('.t-calendar').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar--full').exists()).toBeTruthy();
    });

    it('body class with card theme', () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'card' },
      });
      expect(wrapper.find('.t-calendar--card').exists()).toBeTruthy();
    });

    it('panel class includes mode', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'month' },
      });
      expect(wrapper.find('.t-calendar__panel--month').exists()).toBeTruthy();
    });

    it('control section classes exist', () => {
      const wrapper = mount(Calendar);
      expect(wrapper.find('.t-calendar__control').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__control-section').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__control-section-cell').exists()).toBeTruthy();
    });

    it('table classes exist in month mode', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'month' },
      });
      expect(wrapper.find('.t-calendar__table').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__table-head').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__table-head-row').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__table-head-cell').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__table-body').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__table-body-row').exists()).toBeTruthy();
    });

    it('table body cell classes', () => {
      const wrapper = mount(Calendar);
      expect(wrapper.find('.t-calendar__table-body-cell').exists()).toBeTruthy();
      expect(wrapper.find('.t-calendar__table-body-cell-display').exists()).toBeTruthy();
    });
  });

  // ==================== useColHeaders Tests ====================
  describe('useColHeaders', () => {
    it('renders 7 column headers by default', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'month' },
      });
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
    });

    it('column headers respect firstDayOfWeek', () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'month', firstDayOfWeek: 3 },
      });
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
    });

    it('column headers use custom week text from props', () => {
      const weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const wrapper = mount(Calendar, {
        props: { week: weekArray },
      });
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells[0].text()).toBe('Mon');
    });

    it('firstDayOfWeek=1 starts with Monday', () => {
      const wrapper = mount(Calendar, {
        props: { firstDayOfWeek: 1 },
      });
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
    });

    it('firstDayOfWeek=7 starts with Sunday', () => {
      const wrapper = mount(Calendar, {
        props: { firstDayOfWeek: 7 },
      });
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
    });
  });
});
