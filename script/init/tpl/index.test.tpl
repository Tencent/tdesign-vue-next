import { mount } from '@vue/test-utils';
import <%= upperComponent %> from '@/src/<%= component %>/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('<%= upperComponent %>', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <<%= upperComponent %>></<%= upperComponent %>>;
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
