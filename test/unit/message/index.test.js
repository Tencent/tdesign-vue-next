import { mount } from '@vue/test-utils';
import Message from '@/src/message/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Message', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Message></Message>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });

  // test events
  // describe('@event', () => {});

  // test slots
  describe('<slot>', () => {
    // it('', () => {});
  });

  // test exposure function
  describe('function', () => {
    // it('', () => {});
  });
});
