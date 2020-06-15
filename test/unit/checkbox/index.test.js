import { mount } from '@vue/test-utils';
import Checkbox from '@/src/checkbox/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Checkbox', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Checkbox></Checkbox>;
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
