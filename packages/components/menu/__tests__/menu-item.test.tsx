/* eslint-disable vue/one-component-per-file */
import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent, h, nextTick, provide, ref } from 'vue';

import MenuItem from '../menu-item';
import menuItemProps from '../menu-item-props';
import type { TdMenuItemProps } from '../type';
import type { TdMenuInterface, TdSubMenuInterface } from '../types';
import type { VMenu } from '../utils';

const createContext = (overrides: Partial<TdMenuInterface> = {}) => {
  const add = vi.fn();
  const remove = vi.fn();
  const menu: TdMenuInterface = {
    activeValue: ref(),
    activeValues: ref([]),
    collapsed: ref(false),
    expandValues: ref([]),
    isHead: false,
    mode: ref('normal'),
    open: vi.fn(),
    select: vi.fn(),
    theme: ref('light'),
    vMenu: { add, remove } as unknown as VMenu,
    ...overrides,
  };
  return { add, menu, remove };
};

const mountItem = (
  props: TdMenuItemProps = {},
  options: {
    menu?: TdMenuInterface;
    router?: object;
    slots?: Record<string, () => ReturnType<typeof h> | string>;
    submenu?: TdSubMenuInterface | null;
    tooltipStub?: boolean;
  } = {},
) => {
  const context = options.menu ? { menu: options.menu } : createContext();
  const global = {
    mocks: options.router ? { $router: options.router } : {},
    provide: {
      TdMenu: context.menu,
      ...(options.submenu === null ? {} : { TdSubmenu: options.submenu }),
    },
    stubs: options.tooltipStub
      ? {
          TTooltip: defineComponent({
            props: {
              content: Function,
              placement: String,
            },
            setup(stubProps, { slots }) {
              return () =>
                h('div', { class: 'tooltip-stub', 'data-placement': stubProps.placement }, [
                  slots.default?.(),
                  h('span', { class: 'tooltip-content' }, stubProps.content?.()),
                ]);
            },
          }),
        }
      : {},
  };
  const wrapper = mount(MenuItem, { props, slots: options.slots, global });
  return { ...context, wrapper };
};

describe('MenuItem', () => {
  describe('props', () => {
    it(':content[string]', () => {
      const { wrapper } = mountItem({ content: 'Dashboard', value: 'dashboard' });

      expect(wrapper.element.tagName).toBe('LI');
      expect(wrapper.classes()).toEqual(expect.arrayContaining(['t-menu__item', 't-menu__item--plain']));
      expect(wrapper.get('.t-menu__content').text()).toBe('Dashboard');
      expect(wrapper.find('a').exists()).toBe(false);
    });

    it(':content[function]', () => {
      const { wrapper } = mountItem({
        content: () => <strong data-testid="content-function">Dashboard</strong>,
        value: 'dashboard',
      });

      expect(wrapper.get('[data-testid="content-function"]').text()).toBe('Dashboard');
    });

    it(':default[string/function]', () => {
      const text = mountItem({ default: 'Default text' }).wrapper;
      const tNode = mountItem({ default: () => <strong data-testid="default-function">Default TNode</strong> }).wrapper;

      expect(text.get('.t-menu__content').text()).toBe('Default text');
      expect(tNode.get('[data-testid="default-function"]').text()).toBe('Default TNode');
    });

    it(':icon[function] + :default[slot]', () => {
      const { wrapper } = mountItem(
        {
          content: 'prop content',
          icon: () => <i class="prop-icon" />,
        },
        {
          slots: {
            default: () => <strong>slot content</strong>,
            icon: () => <i class="slot-icon" />,
          },
        },
      );

      expect(wrapper.find('.prop-icon').exists()).toBe(true);
      expect(wrapper.find('.slot-icon').exists()).toBe(false);
      expect(wrapper.get('.t-menu__content').text()).toBe('slot content');
      expect(wrapper.classes()).not.toContain('t-menu__item--plain');
    });

    it(':icon[slot]', () => {
      const { wrapper } = mountItem({ content: 'Dashboard' }, { slots: { icon: () => <i data-testid="icon-slot" /> } });

      expect(wrapper.find('[data-testid="icon-slot"]').exists()).toBe(true);
      expect(wrapper.classes()).not.toContain('t-menu__item--plain');
    });

    it(':value[string] + :disabled[boolean]', async () => {
      const { menu } = createContext();
      const { wrapper } = mountItem({ value: 0 }, { menu });

      expect(wrapper.classes()).not.toContain('t-is-active');
      await wrapper.setProps({ disabled: true });
      menu.activeValue.value = 0;
      await nextTick();

      expect(wrapper.classes()).toEqual(expect.arrayContaining(['t-is-active', 't-is-disabled']));
    });

    it(':value[string] (side submenu)', () => {
      const { wrapper } = mountItem({}, { submenu: { value: 'parent' } });

      expect(wrapper.classes()).toContain('t-submenu__item');
    });

    it(':value[string] (head submenu)', () => {
      const { menu } = createContext({ isHead: true });
      const { wrapper } = mountItem({}, { menu, submenu: { value: 'parent' } });

      expect(wrapper.classes()).not.toContain('t-submenu__item');
    });

    it(':collapsed[boolean]', () => {
      const topMenu = createContext({ collapsed: ref(true) }).menu;
      const nestedMenu = createContext({ collapsed: ref(true) }).menu;
      const top = mountItem({ content: 'Top' }, { menu: topMenu, submenu: null, tooltipStub: true }).wrapper;
      const nested = mountItem(
        { content: 'Nested' },
        { menu: nestedMenu, submenu: { value: 'parent' }, tooltipStub: true },
      ).wrapper;

      expect(top.get('.tooltip-stub').attributes('data-placement')).toBe('right');
      expect(top.get('.tooltip-content').text()).toBe('Top');
      expect(nested.find('.tooltip-stub').exists()).toBe(false);
    });

    it(':target[string]', () => {
      const validator = menuItemProps.target.validator;

      expect(validator('_blank')).toBe(true);
      expect(validator('' as '_self')).toBe(true);
      expect(validator('_invalid' as '_self')).toBe(false);
    });

    it(':href[string] + :disabled[boolean]', async () => {
      const enabled = mountItem({ content: 'Docs', href: '/docs', target: '_blank' }).wrapper;
      const disabled = mountItem({ content: 'Docs', disabled: true, href: '/docs' }).wrapper;

      expect(enabled.get('a').attributes()).toMatchObject({ href: '/docs', target: '_blank' });
      const enabledEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      enabled.get('a').element.dispatchEvent(enabledEvent);
      expect(enabledEvent.defaultPrevented).toBe(false);

      const disabledEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
      disabled.get('a').element.dispatchEvent(disabledEvent);
      expect(disabledEvent.defaultPrevented).toBe(true);
    });

    it(':routerLink[boolean] + :href[string]', () => {
      const router = { push: vi.fn(() => Promise.resolve()), resolve: vi.fn() };
      const { wrapper } = mountItem({ href: '/docs', router, routerLink: true, target: '_top' });
      const event = new MouseEvent('click', { bubbles: false, cancelable: true });

      wrapper.get('a').element.dispatchEvent(event);

      expect(wrapper.get('a').attributes()).toMatchObject({ href: '/docs', target: '_top' });
      expect(event.defaultPrevented).toBe(true);
      expect(router.resolve).not.toHaveBeenCalled();
    });

    it(':to[string/object]', async () => {
      const router = {
        push: vi.fn(() => Promise.resolve()),
        resolve: vi.fn(() => ({ href: '/resolved' })),
      };
      const to = { name: 'details' };
      const { wrapper } = mountItem({ content: 'Details', router, routerLink: true, to });

      expect(router.resolve).toHaveBeenCalledWith(to);
      expect(wrapper.get('a').attributes('href')).toBe('/resolved');

      await wrapper.trigger('click');
      await flushPromises();
      expect(router.push).toHaveBeenCalledWith(to);
    });

    it(':replace[boolean] + :router[object]', async () => {
      const router = { replace: vi.fn(() => Promise.resolve()) };
      const { wrapper } = mountItem({ replace: true, to: '/replaced' }, { router });

      await wrapper.trigger('click');
      await flushPromises();

      expect(router.replace).toHaveBeenCalledWith('/replaced');
    });

    it(':routerLink[boolean]', async () => {
      const router = { push: vi.fn(() => Promise.resolve()) };
      const { wrapper } = mountItem({ href: '/router-docs', router, routerLink: true });

      await wrapper.trigger('click');
      await flushPromises();

      expect(router.push).toHaveBeenCalledWith('/router-docs');
    });

    it(':router[object]', async () => {
      let rejectHandler: ((error: Error) => void) | undefined;
      const router = {
        push: vi.fn(() => ({
          catch(handler: (error: Error) => void) {
            rejectHandler = handler;
          },
        })),
      };
      const { wrapper } = mountItem({ router, to: '/same' });
      await wrapper.trigger('click');

      expect(() =>
        rejectHandler?.(Object.assign(new Error('duplicate'), { name: 'NavigationDuplicated' })),
      ).not.toThrow();
      expect(() => rejectHandler?.(new Error('Avoided redundant navigation to current location'))).not.toThrow();
      expect(() => rejectHandler?.(new Error('network failure'))).toThrow('network failure');
    });

    it(':routerLink[boolean] (empty target)', () => {
      const { wrapper } = mountItem({ routerLink: true });

      expect(wrapper.get('a').attributes('href')).toBe('');
    });
  });

  describe('events', () => {
    it('click', async () => {
      const parentClick = vi.fn();
      const onClick = vi.fn();
      const closeParentPopup = vi.fn();
      const { menu } = createContext();
      const Host = defineComponent({
        name: 'TMenu',
        setup() {
          provide('TdMenu', menu);
          provide('TdSubmenu', { value: 'parent', closeParentPopup });
          return () => (
            <div onClick={parentClick}>
              <MenuItem value="child" onClick={onClick} />
            </div>
          );
        },
      });
      const wrapper = mount(Host);

      await wrapper.get('li').trigger('click');

      expect(menu.select).toHaveBeenCalledWith('child');
      expect(onClick).toHaveBeenCalledWith({ e: expect.any(MouseEvent), value: 'child' });
      expect(closeParentPopup).toHaveBeenCalledWith(expect.any(MouseEvent));
      expect(parentClick).not.toHaveBeenCalled();
    });

    it('click (disabled)', async () => {
      const router = { push: vi.fn(() => Promise.resolve()) };
      const onClick = vi.fn();
      const closeParentPopup = vi.fn();
      const { menu } = createContext();
      const { wrapper } = mountItem(
        { disabled: true, onClick, to: '/next', value: 'disabled' },
        { menu, submenu: { value: 'parent', closeParentPopup }, router },
      );

      await wrapper.trigger('click');

      expect(menu.select).not.toHaveBeenCalled();
      expect(onClick).not.toHaveBeenCalled();
      expect(router.push).not.toHaveBeenCalled();
      expect(closeParentPopup).not.toHaveBeenCalled();
    });

    it('mount/unmount', () => {
      const { add, menu, remove } = createContext({ activeValues: ref(['child']) });
      const { wrapper } = mountItem(
        { content: 'Child', disabled: true, value: 'child' },
        { menu, submenu: { value: 'parent' } },
      );

      expect(add).toHaveBeenCalledWith(
        expect.objectContaining({ content: 'Child', disabled: true, parent: 'parent', value: 'child' }),
      );
      expect(menu.activeValues.value).toEqual(['child', 'parent']);

      wrapper.unmount();
      expect(remove).toHaveBeenCalledWith('child');
    });

    it('mount (active parent)', () => {
      const { menu } = createContext({ activeValues: ref(['child', 'parent']) });
      mountItem({ value: 'child' }, { menu, submenu: { value: 'parent' } });

      expect(menu.activeValues.value).toEqual(['child', 'parent']);
    });
  });
});
