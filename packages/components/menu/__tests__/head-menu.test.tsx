import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { HeadMenu, MenuItem } from '@tdesign/components/menu';

// every component needs four parts: props/events/slots/functions.
describe('HeadMenu', () => {
  // test props api
  describe('props', () => {
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <HeadMenu theme={'light'}></HeadMenu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':active', () => {
      const wrapper = mount({
        render() {
          return <HeadMenu value={'2-1'}></HeadMenu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':height', () => {
      const wrapper = mount({
        render() {
          return <HeadMenu height={'750px'}></HeadMenu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('<logo>', () => {
      const wrapper = mount(HeadMenu, {
        slots: {
          logo: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<operations>', () => {
      const wrapper = mount(HeadMenu, {
        slots: {
          operations: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('JSX rendering', () => {
    it('should not warn about slot invoked outside of render function when using JSX with dynamic MenuItems', () => {
      const warnSpy = vi.spyOn(console, 'warn');
      const menuOptions = [
        { label: '用户信息', key: 'info' },
        { label: '身份验证', key: 'security' },
      ];

      const MenuComponent = defineComponent({
        setup() {
          return () => (
            <HeadMenu>
              {menuOptions.map((menu) => (
                <MenuItem key={menu.key} value={menu.key}>
                  {menu.label}
                </MenuItem>
              ))}
            </HeadMenu>
          );
        },
      });

      const wrapper = mount(MenuComponent);
      expect(wrapper.exists()).toBe(true);

      // Check that no warning about slot invoked outside of render function was logged
      const slotWarnings = warnSpy.mock.calls.filter((call) =>
        call.some(
          (arg) => typeof arg === 'string' && arg.includes('Slot "default" invoked outside of the render function'),
        ),
      );
      expect(slotWarnings.length).toBe(0);

      warnSpy.mockRestore();
    });
  });
});
