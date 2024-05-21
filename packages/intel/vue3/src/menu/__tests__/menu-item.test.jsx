import { mount } from '@vue/test-utils';
import { MenuItem, Menu } from 'tdesign-vue-next'

let $routerMock = { push: vi.fn() };

// every component needs four parts: props/events/slots/functions.
describe('MenuItem', () => {
  // test props api
  describe('props', () => {
    it(':name', () => {
      const wrapper = mount(
        {
          render() {
            return (
              <Menu>
                <MenuItem name="1-1"></MenuItem>
              </Menu>
            );
          },
        },
        { global: { mocks: { $router: $routerMock } } },
      );
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':route', () => {
      const wrapper = mount(
        {
          render() {
            return (
              <Menu>
                <MenuItem route={'/user/list'}></MenuItem>
              </Menu>
            );
          },
        },
        { global: { mocks: { $router: $routerMock } } },
      );
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled', () => {
      const wrapper = mount(
        {
          render() {
            return (
              <Menu>
                <MenuItem disabled={true}></MenuItem>
              </Menu>
            );
          },
        },
        { global: { mocks: { $router: $routerMock } } },
      );
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<icon>', () => {
      const wrapper = mount(
        {
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
        },
        {
          global: { mocks: { $router: $routerMock } },
          slots: {
            icon: '<div></div>',
          },
        },
      );
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<default>', () => {
      const wrapper = mount(
        {
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
        },
        {
          global: { mocks: { $router: $routerMock } },
          slots: {
            default: '<div></div>',
          },
        },
      );
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
