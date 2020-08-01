import { mount } from '@vue/test-utils';
import Popconfirm from '@/src/popconfirm/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Popconfirm', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Popconfirm></Popconfirm>;
        },
      });
      expect(wrapper.isEmpty()).toBe(false);
    });
  });

  // test events
  describe('@event', () => {
    console.log('@event');
  });

  // test slots
  describe('<slot>', () => {
    it('', () => {
      console.log('<slot>');
    });
  });

  // test exposure function
  describe('function', () => {
    it('', () => {
      console.log('function');
    });
  });
});
