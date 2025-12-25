import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { MenuItem, Menu } from '@tdesign/components/menu';

const $routerMock = { push: vi.fn() };

// Wrapper component that contains MenuItem (simulates the issue scenario)
const WrappedMenuItem = defineComponent({
  name: 'WrappedMenuItem',
  setup() {
    return () => <MenuItem value="wrapped-item">Wrapped Item</MenuItem>;
  },
});

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

  describe('tooltip in collapsed menu', () => {
    it('should show tooltip for wrapped menu-item when collapsed', () => {
      const wrapper = mount(
        {
          render() {
            return (
              <Menu collapsed={true}>
                <WrappedMenuItem />
              </Menu>
            );
          },
        },
        { global: { mocks: { $router: $routerMock } } },
      );
      // When collapsed, the MenuItem should be wrapped in a Tooltip
      // Check that the tooltip wrapper exists
      expect(wrapper.findComponent({ name: 'TPopup' }).exists()).toBe(true);
    });

    it('should show tooltip for direct menu-item when collapsed', () => {
      const wrapper = mount(
        {
          render() {
            return (
              <Menu collapsed={true}>
                <MenuItem value="direct-item">Direct Item</MenuItem>
              </Menu>
            );
          },
        },
        { global: { mocks: { $router: $routerMock } } },
      );
      // When collapsed, the MenuItem should be wrapped in a Tooltip
      expect(wrapper.findComponent({ name: 'TPopup' }).exists()).toBe(true);
    });

    it('should not show tooltip when menu is not collapsed', () => {
      const wrapper = mount(
        {
          render() {
            return (
              <Menu collapsed={false}>
                <WrappedMenuItem />
              </Menu>
            );
          },
        },
        { global: { mocks: { $router: $routerMock } } },
      );
      // When not collapsed, no tooltip should be shown
      expect(wrapper.findComponent({ name: 'TPopup' }).exists()).toBe(false);
    });
  });
});
