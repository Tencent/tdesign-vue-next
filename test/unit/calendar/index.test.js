import { mount } from '@vue/test-utils';
import Calendar from '@/src/calendar/index.ts';

import MockDate from 'mockdate';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');
// every component needs four parts: props/events/slots/functions.
describe('Calendar', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Calendar></Calendar>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });

    it(':value', () => {
      const wrapper = mount({
        render() {
          return <Calendar value={'1998-11-11'}></Calendar>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':mode', () => {
      const wrapper = mount({
        render() {
          return <Calendar mode={'year'}></Calendar>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':firstDayOfWeek', () => {
      const wrapper = mount({
        render() {
          return <Calendar firstDayOfWeek={3}></Calendar>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':isShowWeekendDefault', () => {
      const wrapper = mount({
        render() {
          return <Calendar isShowWeekendDefault={false}></Calendar>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':range', () => {
      const wrapper = mount({
        render() {
          const testRange = [
            '2018-08',  // new Date(2017, 7)
            '2028-04',  // new Date(2027, 3)
          ];
          return <Calendar range={testRange}></Calendar>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Calendar theme={'card'}></Calendar>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  // test events
  describe('@event', () => {
    window.console.info('calendar test @event');
  });

  // test slots
  describe('<slot>', () => {
    it('', () => {
      window.console.info('calendar test<slot>');
    });
  });

  // test exposure function
  describe('function', () => {
    it('', () => {
      window.console.info('calendar test function');
    });
  });
});
