import { mount } from '@vue/test-utils';
import Steps from '@/src/steps/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Steps', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Steps></Steps>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });

  // test events
  describe('@event', () => {});

  // test slots
  describe('<slot>', () => {
    it('', () => {});
  });

  // test exposure function
  describe('function', () => {
    it('', () => {});
  });
});
