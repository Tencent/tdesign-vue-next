import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
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
  });

  describe('slot', () => {
    it('accepts a single VNode returned by a wrapper component', () => {
      const MenuContent = defineComponent({
        setup(_, { slots }) {
          return () => <div>{slots.default?.()}</div>;
        },
      });
      const wrapper = mount(HeadMenu, {
        props: { expandType: 'popup' },
        slots: {
          default: () =>
            h(MenuContent, null, {
              default: () => <MenuItem value="one">One</MenuItem>,
            }),
        },
      });

      expect(wrapper.find('.t-menu__item').text()).toBe('One');
    });

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
});
