import { mount } from '@vue/test-utils';
import { defineComponent, inject } from 'vue';
import { HeadMenu } from '@tdesign/components/menu';
import { TdMenuInterface } from '../types';

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
    it('keeps expanded values when removing a missing popup value', async () => {
      const MenuContextProbe = defineComponent({
        setup() {
          const menu = inject<TdMenuInterface>('TdMenu');
          return () => (
            <div>
              <span data-testid="expanded-values">{menu?.expandValues?.value.join(',')}</span>
              <button onClick={() => menu?.open?.('missing', 'remove')} />
            </div>
          );
        },
      });
      const wrapper = mount(HeadMenu, {
        props: { expandType: 'popup', defaultExpanded: ['one', 'two'] },
        slots: { default: () => <MenuContextProbe /> },
      });

      await wrapper.get('button').trigger('click');

      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('one,two');
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
