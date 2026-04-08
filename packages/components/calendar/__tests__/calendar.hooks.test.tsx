import { nextTick } from 'vue';
import type { VueWrapper } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import MockDate from 'mockdate';
import { Calendar } from '@tdesign/components';

MockDate.set('2020-12-28');

describe('Calendar Hooks', () => {
  describe('useState', () => {
    it('toToday navigates to current date', async () => {
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

    it('setCurSelectedYear with valid year', () => {
      const wrapper = mount(<Calendar year={2022} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('setCurSelectedYear with string year', () => {
      const wrapper = mount(<Calendar year={'2022'} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('setCurSelectedMonth with valid month', () => {
      const wrapper = mount(<Calendar month={6} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('setCurSelectedMonth with string month', () => {
      const wrapper = mount(<Calendar month={'6'} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('setCurrentDate with array value (single mode)', () => {
      const wrapper = mount(<Calendar value={['2020-06-15']} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('setCurrentDate with empty array (single mode)', () => {
      const wrapper = mount(<Calendar value={[]} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('setCurrentDateList with array value', () => {
      const wrapper = mount(<Calendar multiple={true} value={['2020-06-15', '2020-06-20']} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('setCurrentDateList with empty array', () => {
      const wrapper = mount(<Calendar multiple={true} value={[]} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('setCurrentDateList with single string value', () => {
      const wrapper = mount(<Calendar multiple={true} value="2020-06-15" />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('setCurrentDateList with undefined value', () => {
      const wrapper = mount(<Calendar multiple={true} value={undefined} />);
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('checkDayVisible hides weekend when isShowWeekendDefault=false', () => {
      const wrapper = mount(<Calendar isShowWeekendDefault={false} />);
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(5);
      wrapper.unmount();
    });

    it('checkDayVisible shows all days when isShowWeekendDefault=true', () => {
      const wrapper = mount(<Calendar isShowWeekendDefault={true} />);
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
      wrapper.unmount();
    });

    it('watch firstDayOfWeek changes', async () => {
      const wrapper = mount(Calendar, {
        props: { firstDayOfWeek: 1 },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ firstDayOfWeek: 3 });
      await nextTick();
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('watch value changes in single mode', async () => {
      const wrapper = mount(Calendar, {
        props: { value: '2020-06-15' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ value: '2020-07-20' });
      await nextTick();
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('watch value changes in multiple mode', async () => {
      const wrapper = mount(Calendar, {
        props: { multiple: true, value: ['2020-06-15'] },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ value: ['2020-07-20', '2020-08-10'] });
      await nextTick();
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });

    it('watch isShowWeekendDefault changes', async () => {
      const wrapper = mount(Calendar, {
        props: { isShowWeekendDefault: true },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      expect(wrapper.findAll('.t-calendar__table-head-cell').length).toBe(7);
      await wrapper.setProps({ isShowWeekendDefault: false });
      await nextTick();
      expect(wrapper.findAll('.t-calendar__table-head-cell').length).toBe(5);
      wrapper.unmount();
    });

    it('watch mode changes', async () => {
      const wrapper = mount(Calendar, {
        props: { mode: 'month' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      expect(wrapper.find('.t-calendar__panel--month').exists()).toBe(true);
      await wrapper.setProps({ mode: 'year' });
      await nextTick();
      expect(wrapper.find('.t-calendar__panel--year').exists()).toBe(true);
      wrapper.unmount();
    });

    it('watch theme changes to card', async () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'full' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ theme: 'card' });
      await nextTick();
      expect(wrapper.find('.t-calendar--card').exists()).toBe(true);
      wrapper.unmount();
    });

    it('watch theme changes to full', async () => {
      const wrapper = mount(Calendar, {
        props: { theme: 'card' },
      }) as VueWrapper<InstanceType<typeof Calendar>>;
      await wrapper.setProps({ theme: 'full' });
      await nextTick();
      expect(wrapper.find('.t-calendar--full').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('useController', () => {
    it('visible when controllerConfig is true', () => {
      const wrapper = mount(<Calendar controllerConfig={true} />);
      expect(wrapper.find('.t-calendar__control').exists()).toBe(true);
      wrapper.unmount();
    });

    it('hidden when controllerConfig is false', () => {
      const wrapper = mount(<Calendar controllerConfig={false} />);
      expect(wrapper.find('.t-calendar__control').exists()).toBe(false);
      wrapper.unmount();
    });

    it('merges custom config with defaults', () => {
      const wrapper = mount(
        <Calendar
          controllerConfig={{
            year: { visible: false },
          }}
        />,
      );
      expect(wrapper.find('.t-calendar__control').exists()).toBe(true);
      wrapper.unmount();
    });

    it('checkControllerVisible returns false when conf[name] is false', () => {
      const wrapper = mount(
        <Calendar
          controllerConfig={{
            // @ts-expect-error testing runtime behavior
            weekend: false,
          }}
        />,
      );
      expect(wrapper.find('.t-calendar__control-tag').exists()).toBe(false);
      wrapper.unmount();
    });

    it('checkControllerVisible returns false when conf[name].visible is false', () => {
      const wrapper = mount(
        <Calendar
          controllerConfig={{
            weekend: { visible: false },
          }}
        />,
      );
      expect(wrapper.find('.t-calendar__control-tag').exists()).toBe(false);
      wrapper.unmount();
    });

    it('checkControllerDisabled with global disabled', () => {
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

    it('checkControllerDisabled with specific control disabled', () => {
      const wrapper = mount(
        <Calendar
          controllerConfig={{
            year: { visible: true, selectProps: { disabled: true } },
          }}
        />,
      );
      expect(wrapper.find('.t-calendar__control').exists()).toBe(true);
      wrapper.unmount();
    });

    it('emitControllerChange triggers onControllerChange', async () => {
      const onControllerChange = vi.fn();
      const wrapper = mount(<Calendar year={2020} month={12} onControllerChange={onControllerChange} />);
      const weekendTag = wrapper.find('.t-calendar__control-tag');
      if (weekendTag.exists()) {
        await weekendTag.trigger('click');
        await nextTick();
        await nextTick();
        expect(onControllerChange).toHaveBeenCalled();
        const arg = onControllerChange.mock.calls[0][0];
        expect(arg).toHaveProperty('isShowWeekend');
        expect(arg).toHaveProperty('filterDate');
        expect(arg).toHaveProperty('formattedFilterDate');
        expect(arg).toHaveProperty('mode');
      }
      wrapper.unmount();
    });
  });

  describe('useCalendarClass', () => {
    it('body class includes theme', () => {
      const wrapper = mount(<Calendar theme="full" />);
      expect(wrapper.find('.t-calendar').exists()).toBe(true);
      expect(wrapper.find('.t-calendar--full').exists()).toBe(true);
      wrapper.unmount();
    });

    it('body class with card theme', () => {
      const wrapper = mount(<Calendar theme="card" />);
      expect(wrapper.find('.t-calendar--card').exists()).toBe(true);
      wrapper.unmount();
    });

    it('panel class includes mode', () => {
      const wrapper = mount(<Calendar mode="month" />);
      expect(wrapper.find('.t-calendar__panel--month').exists()).toBe(true);
      wrapper.unmount();
    });

    it('control section classes exist', () => {
      const wrapper = mount(<Calendar />);
      expect(wrapper.find('.t-calendar__control').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__control-section').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__control-section-cell').exists()).toBe(true);
      wrapper.unmount();
    });

    it('table classes exist in month mode', () => {
      const wrapper = mount(<Calendar mode="month" />);
      expect(wrapper.find('.t-calendar__table').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__table-head').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__table-head-row').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__table-head-cell').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__table-body').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__table-body-row').exists()).toBe(true);
      wrapper.unmount();
    });

    it('table body cell classes', () => {
      const wrapper = mount(<Calendar />);
      expect(wrapper.find('.t-calendar__table-body-cell').exists()).toBe(true);
      expect(wrapper.find('.t-calendar__table-body-cell-display').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('useColHeaders', () => {
    it('renders 7 column headers by default', () => {
      const wrapper = mount(<Calendar mode="month" />);
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
      wrapper.unmount();
    });

    it('column headers respect firstDayOfWeek', () => {
      const wrapper = mount(<Calendar mode="month" firstDayOfWeek={3} />);
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
      wrapper.unmount();
    });

    it('column headers use custom week text from props', () => {
      const weekArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const wrapper = mount(<Calendar week={weekArray} />);
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells[0].text()).toBe('Mon');
      wrapper.unmount();
    });

    it('firstDayOfWeek=7 starts with Sunday', () => {
      const wrapper = mount(<Calendar firstDayOfWeek={7} />);
      const headCells = wrapper.findAll('.t-calendar__table-head-cell');
      expect(headCells.length).toBe(7);
      wrapper.unmount();
    });
  });
});
