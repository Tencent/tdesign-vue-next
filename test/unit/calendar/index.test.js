import { mount } from '@vue/test-utils';
import Calendar from '@/src/calendar/index.ts';

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
      expect(wrapper.isEmpty()).toBe(false);
    });

    it(':defaultValue', () => {
      const wrapper = mount({
        render() {
          return <Calendar defaultValue={new Date(1998, 10, 11).toUTCString()}></Calendar>;
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

    it(':isShowWeekendDefault', () => {
      const wrapper = mount({
        render() {
          const testRange = {
            from: new Date(1998, 7),  // 1998-08
            to: new Date(2008, 3),  // 1998-04
          };
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
