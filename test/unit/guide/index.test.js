import { mount } from '@vue/test-utils';
import Guide from '@/src/guide/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Guide', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Guide></Guide>;
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
