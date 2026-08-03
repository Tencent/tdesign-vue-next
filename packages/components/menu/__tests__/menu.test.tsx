import { mount } from '@vue/test-utils';
import { defineComponent, inject } from 'vue';
import { Menu } from '@tdesign/components/menu';
import { TdMenuInterface } from '../types';

const MenuContextProbe = defineComponent({
  setup() {
    const menu = inject<TdMenuInterface>('TdMenu');
    return () => (
      <div>
        <span data-testid="expanded-values">{menu?.expandValues?.value.join(',')}</span>
        <button data-testid="remove-missing" onClick={() => menu?.open?.('missing', 'remove')} />
      </div>
    );
  },
});

// every component needs four parts: props/events/slots/functions.
describe('Menu', () => {
  // test props api
  describe('props', () => {
    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Menu></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':theme', () => {
      const wrapper = mount({
        render() {
          return <Menu theme={'light'}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':active', () => {
      const wrapper = mount({
        render() {
          return <Menu value={'2-1'}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':width', () => {
      const wrapper = mount({
        render() {
          return <Menu width={'256px'}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':collapsed', () => {
      const wrapper = mount({
        render() {
          return <Menu collapsed={true}></Menu>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slot', () => {
    it('keeps expanded values when removing a missing popup value', async () => {
      const wrapper = mount(Menu, {
        props: { expandType: 'popup', defaultExpanded: ['one', 'two'] },
        slots: { default: () => <MenuContextProbe /> },
      });

      await wrapper.get('[data-testid="remove-missing"]').trigger('click');

      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('one,two');
    });

    it('<logo>', () => {
      const wrapper = mount(Menu, {
        slots: {
          logo: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<default>', () => {
      const wrapper = mount(Menu, {
        slots: {
          default: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('<operations>', () => {
      const wrapper = mount(Menu, {
        slots: {
          operations: '<div></div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
