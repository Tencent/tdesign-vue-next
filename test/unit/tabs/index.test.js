import { mount } from '@vue/test-utils';
import Tabs from '@/src/tabs/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Tabs', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Tabs></Tabs>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });

  // test events
  describe('@event', () => null);

  // test slots
  describe('<slot>', () => {
    it('', () => null);
  });

  // test exposure function
  describe('function', () => {
    it('', () => null);
  });
});
