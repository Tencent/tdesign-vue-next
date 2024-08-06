import { mount } from '@vue/test-utils';
import Typography from '@/src/typography/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Typography', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Typography></Typography>;
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
