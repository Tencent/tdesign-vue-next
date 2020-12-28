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

    it(':isShowWeekendDefault', () => {
      const wrapper = mount({
        render() {
          const testRange = {
            from: '2018-08',  // new Date(2017, 7)
            to: '2028-04',  // new Date(2027, 3)
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
