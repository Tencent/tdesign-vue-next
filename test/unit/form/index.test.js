import { mount } from '@vue/test-utils';
import Form from '@/src/form/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Form', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Form></Form>;
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
