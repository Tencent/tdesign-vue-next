import { mount } from '@vue/test-utils';
import Select from '@/src/select/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Select', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Select></Select>;
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
