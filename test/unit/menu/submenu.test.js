import { mount } from '@vue/test-utils';
import { Submenu } from '@/src/menu/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Submenu', () => {
  // test props api
  describe('props', () => {
    it(':name', () => {
      const wrapper = mount({
        render() {
          return <Submenu name={'1'}></Submenu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Submenu disabled={true}></Submenu>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<icon>', () => {
      const wrapper = mount(Submenu, {
        scopedSlots: {
          icon: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('<default>', () => {
      const wrapper = mount(Submenu, {
        scopedSlots: {
          default: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('<title>', () => {
      const wrapper = mount(Submenu, {
        scopedSlots: {
          title: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
