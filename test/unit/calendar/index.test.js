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
