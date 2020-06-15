import { mount } from '@vue/test-utils';
import Radio from '@/src/radio/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Radio', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Radio></Radio>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });

  // // test events
  // describe('@event', () => {});

  // // test slots
  // describe('<slot>', () => {
  //   it('', () => {});
  // });

  // // test exposure function
  // describe('function', () => {
  //   it('', () => {});
  // });
});
