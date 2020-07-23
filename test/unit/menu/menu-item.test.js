import { mount } from '@vue/test-utils';
import { MenuItem } from '@/src/menu/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('MenuItem', () => {
  // test props api
  describe('props', () => {
    it(':name', () => {
      const wrapper = mount({
        render() {
          return <MenuItem name="1-1"></MenuItem>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':route', () => {
      const wrapper = mount({
        render() {
          return <MenuItem route={'/user/list'}></MenuItem>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <MenuItem disabled={true}></MenuItem>;
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<icon>', () => {
      const wrapper = mount(MenuItem, {
        scopedSlots: {
          icon: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('<default>', () => {
      const wrapper = mount(MenuItem, {
        scopedSlots: {
          default: '<div></div>',
        },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
