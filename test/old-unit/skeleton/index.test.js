import { mount } from '@vue/test-utils';
import Skeleton from '@/src/skeleton/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Skeleton', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Skeleton></Skeleton>;
        },
      });
      expect(wrapper.exists()).toBe(true);
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
