import { mount } from '@vue/test-utils';
import TimePicker from '@/src/time-picker/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('TimePicker', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <TimePicker></TimePicker>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  // test events
  // describe('@event', () => {});

  // test slots
  // describe('<slot>', () => {
  //   it('', () => {});
  // });

  // test exposure function
  // describe('function', () => {
  //   it('', () => {});
  // });
});
