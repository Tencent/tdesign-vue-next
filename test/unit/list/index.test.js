import { mount } from '@vue/test-utils';
import List from '@/src/list/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('List', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <List></List>;
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
