import { mount } from '@vue/test-utils';
import Comment from '@/src/comment/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Comment', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Comment></Comment>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });

  // test slots
  describe('<slot>', () => {
    it('', () => {});
  });

  // test exposure function
  describe('function', () => {
    it('', () => {});
  });
});
