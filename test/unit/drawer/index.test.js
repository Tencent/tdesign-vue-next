import { mount } from '@vue/test-utils';
import Drawer from '@/src/drawer/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Drawer', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Drawer></Drawer>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });

  // test events
  // describe('@event', () => {});

  // test slots
  // describe('<slot>', () => {
  //   it('', () => {});
  // });

  // test exposure function
  // describe('function', () => {
  //   it('', () => {});
  // });
});
