import { mount } from '@vue/test-utils';
import { MenuItem, Menu } from '@/src/menu';

// every component needs four parts: props/events/slots/functions.
describe('MenuItem', () => {
  // test props api
  describe('props', () => {
    it(':name', () => {
      const wrapper = mount({
        render() {
          return (
            <Menu>
              <MenuItem name="1-1"></MenuItem>
            </Menu>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':route', () => {
      const wrapper = mount({
        render() {
          return (
            <Menu>
              <MenuItem route={'/user/list'}></MenuItem>
            </Menu>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return (
            <Menu>
              <MenuItem disabled={true}></MenuItem>
            </Menu>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<icon>', () => {
      const wrapper = mount({
        provide: {
          TdMenu: Menu,
        },
        render() {
          return (
            <Menu>
              <MenuItem />
            </Menu>
          );
        },
      }, {
        slots: {
          icon: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<default>', () => {
      const wrapper = mount({
        provide: {
          TdMenu: Menu,
        },
        render() {
          return (
            <Menu>
              <MenuItem />
            </Menu>
          );
        },
      }, {
        slots: {
          default: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
