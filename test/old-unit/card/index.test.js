import { mount } from '@vue/test-utils';
import Card from '@/src/card';

// every component needs four parts: props/events/slots/functions.
describe('Card', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Card></Card>;
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
