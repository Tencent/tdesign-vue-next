import { mount } from '@vue/test-utils';
import Tooltip from '@/src/tooltip/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Tooltip', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Tooltip></Tooltip>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });

  // test events
  // describe('@event', () => { });

  // test slots
  // describe('<slot>', () => {
  //   it('', () => { });
  // });

  // // test exposure function
  // describe('function', () => {
  //   it('', () => { });
  // });
});
