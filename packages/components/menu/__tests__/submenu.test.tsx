import { mount } from '@vue/test-utils';
import { defineComponent, inject, nextTick, provide, ref } from 'vue';

import MenuItem from '../menu-item';
import Submenu from '../submenu';
import type { TdSubMenuInterface } from '../types';

import { createMenuContext as createMenu, mountSubmenu, SubmenuPopupStub } from './mount';

describe('Submenu', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('props', () => {
    it(':title[function] + :icon[function] + :default[slot]', () => {
      const { wrapper } = mountSubmenu(
        {
          icon: () => <i class="menu-icon" />,
          title: () => <strong>Settings</strong>,
          value: 'settings',
        },
        { slots: { default: () => <span class="child">Child</span> } },
      );

      expect(wrapper.get('li.t-submenu').classes()).not.toContain('t-is-opened');
      expect(wrapper.find('.menu-icon').exists()).toBe(true);
      expect(wrapper.get('.t-menu__content').text()).toBe('Settings');
      expect(wrapper.get('.t-menu__sub').attributes('style')).toContain('--padding-left: 44px');
      expect(wrapper.get('.t-menu__sub').isVisible()).toBe(false);
      expect(wrapper.find('.t-fake-arrow').exists()).toBe(true);
      expect(wrapper.get('.child').text()).toBe('Child');
    });

    it(':content[string/function]', () => {
      const text = mountSubmenu(
        { content: 'Text content', title: 'Text' },
        { slots: { icon: () => <i data-testid="text-icon" /> } },
      ).wrapper;
      const tNode = mountSubmenu(
        { content: () => <strong data-testid="content-function">TNode content</strong>, title: 'TNode' },
        { slots: { icon: () => <i data-testid="function-icon" /> } },
      ).wrapper;

      expect(text.get('.t-menu__sub').text()).toBe('Text content');
      expect(tNode.get('[data-testid="content-function"]').text()).toBe('TNode content');
    });

    it(':default[string/function]', () => {
      const text = mountSubmenu(
        { default: 'Default text', title: 'Text' },
        { slots: { icon: () => <i data-testid="text-icon" /> } },
      ).wrapper;
      const tNode = mountSubmenu(
        { default: () => <strong data-testid="default-function">Default TNode</strong>, title: 'TNode' },
        { slots: { icon: () => <i data-testid="function-icon" /> } },
      ).wrapper;

      expect(text.get('.t-menu__sub').text()).toBe('Default text');
      expect(tNode.get('[data-testid="default-function"]').text()).toBe('Default TNode');
    });

    it(':icon[slot]', () => {
      const { wrapper } = mountSubmenu(
        { title: 'Settings' },
        {
          slots: {
            default: () => <span>Child</span>,
            icon: () => <i data-testid="icon-slot" />,
          },
        },
      );

      expect(wrapper.find('[data-testid="icon-slot"]').exists()).toBe(true);
    });

    it(':title[string] + :value[string] + :disabled[boolean] + :theme[string]', async () => {
      const { menu } = createMenu({
        activeValues: ref(['settings']),
        expandValues: ref(['settings']),
        theme: ref('dark'),
      });
      const { setProps, wrapper } = mountSubmenu(
        { disabled: true, title: 'Settings', value: 'settings' },
        { menu, slots: { default: () => 'Child' } },
      );

      expect(wrapper.get('li').classes()).toEqual(expect.arrayContaining(['t-is-disabled', 't-is-opened']));
      expect(wrapper.get('.t-menu__item').classes()).toEqual(
        expect.arrayContaining(['t-is-active', 't-is-disabled', 't-is-opened']),
      );
      expect(wrapper.get('.t-menu__sub').isVisible()).toBe(true);
      expect(wrapper.get('.t-fake-arrow').classes()).toContain('t-fake-arrow--active');

      await setProps({ disabled: false });
      menu.activeValues.value = [];
      menu.expandValues.value = [];
      await nextTick();
      expect(wrapper.get('.t-menu__item').classes()).not.toContain('t-is-active');
      expect(wrapper.get('li').classes()).not.toContain('t-is-opened');
    });

    it(':value[number]', () => {
      const { menu } = createMenu({ activeValues: ref([0]), expandValues: ref([0]) });
      const { wrapper } = mountSubmenu(
        { title: 'Zero', value: 0 },
        { menu, slots: { default: () => <span>Child</span> } },
      );

      expect(wrapper.get('.t-menu__item').classes()).toEqual(expect.arrayContaining(['t-is-active', 't-is-opened']));
    });

    it('title click', async () => {
      const { menu } = createMenu();
      const enabled = mountSubmenu({ title: 'Enabled', value: 'enabled' }, { menu, slots: { default: () => 'Child' } });
      const disabled = mountSubmenu(
        { disabled: true, title: 'Disabled', value: 'disabled' },
        { menu, slots: { default: () => 'Child' } },
      );

      await enabled.wrapper.get('.t-menu__item').trigger('click');
      await disabled.wrapper.get('.t-menu__item').trigger('click');

      expect(menu.open).toHaveBeenCalledTimes(1);
      expect(menu.open).toHaveBeenCalledWith('enabled');
    });

    it(':title[undefined] + :default[undefined]', () => {
      const { wrapper } = mountSubmenu({ title: 'Ignored' });

      expect(wrapper.get('li').element.children).toHaveLength(0);
    });

    it(':value[string] (without expanded context)', () => {
      const { menu } = createMenu({ expandValues: undefined });
      const { wrapper } = mountSubmenu(
        { title: 'No expanded model', value: 'parent' },
        { menu, slots: { default: () => 'Child' } },
      );

      expect(wrapper.get('li').classes()).not.toContain('t-is-opened');
    });

    it(':expandType[normal] (head menu)', () => {
      const { menu } = createMenu({ isHead: true });
      const { wrapper } = mountSubmenu(
        { icon: () => <i class="head-icon" />, title: 'Products', value: 'products' },
        { menu, parentName: 'THeadMenu', slots: { default: () => <span class="product">One</span> } },
      );

      expect(wrapper.get('.t-menu__item').text()).toContain('Products');
      expect(wrapper.get('ul').attributes('style')).toContain('opacity: 0');
      expect(wrapper.get('.product').element).toBeInstanceOf(HTMLElement);
    });

    it(':value[string] (nested indentation)', () => {
      const { menu } = createMenu();
      // eslint-disable-next-line vue/one-component-per-file -- Local host verifies nested indentation through real injections.
      const Host = defineComponent({
        name: 'TMenu',
        setup() {
          provide('TdMenu', menu);
          return () => (
            <Submenu title="Parent" value="parent">
              <Submenu title="Child" value="child">
                <span>Leaf</span>
              </Submenu>
            </Submenu>
          );
        },
      });
      const wrapper = mount(Host);
      const lists = wrapper.findAll('.t-menu__sub');

      expect(lists[0].attributes('style')).toContain('--padding-left: 44px');
      expect(lists[1].attributes('style')).toContain('--padding-left: 60px');
    });

    it('mount/unmount', () => {
      const { add, menu, remove } = createMenu();
      const parentSubmenu = { addMenuItem: vi.fn(), value: 'parent' };
      const { wrapper } = mountSubmenu(
        { title: 'Child', value: 'child' },
        { menu, parentSubmenu, slots: { default: () => 'Leaf' } },
      );

      expect(add).toHaveBeenCalledWith(expect.objectContaining({ parent: 'parent', value: 'child' }));
      wrapper.unmount();
      expect(remove).toHaveBeenCalledWith('child');
    });

    it('mount (nested items)', () => {
      let childContext: TdSubMenuInterface | undefined;
      // eslint-disable-next-line vue/one-component-per-file -- Local probe captures the nested submenu context.
      const ContextProbe = defineComponent({
        setup() {
          childContext = inject<TdSubMenuInterface>('TdSubmenu');
          return () => <span>Probe</span>;
        },
      });
      const parentSubmenu = { addMenuItem: vi.fn(), value: 'parent' };
      mountSubmenu({ title: 'Child', value: 'child' }, { parentSubmenu, slots: { default: () => <ContextProbe /> } });

      childContext?.addMenuItem?.({ label: 'Leaf', value: 'leaf' });

      expect(parentSubmenu.addMenuItem).toHaveBeenCalledWith({ label: 'Leaf', value: 'leaf' });
    });
  });

  describe('events', () => {
    it(':popupProps[object] + popup (side menu)', () => {
      const customModifier = { name: 'custom' };
      const { submenu, wrapper } = mountSubmenu(
        {
          expandType: 'popup',
          popupProps: {
            overlayClassName: 'custom-overlay',
            overlayInnerClassName: 'custom-inner',
            popperOptions: { modifiers: [customModifier] },
          },
          title: 'Products',
          value: 'products',
        },
        { slots: { default: () => <span>Product</span> } },
      );
      const popup = submenu.findComponent(SubmenuPopupStub);
      const props = popup.props();

      expect(popup.attributes('data-placement')).toBe('right-top');
      expect(props.overlayInnerClassName).toEqual(
        expect.arrayContaining(['t-menu__popup', 't-is-vertical', 'custom-inner']),
      );
      expect(props.overlayClassName).toEqual(expect.arrayContaining(['t-menu--light', 'custom-overlay']));
      expect(wrapper.get('.t-menu__spacer').classes()).toContain('t-menu__spacer--left');
      expect((props.popperOptions as { modifiers: object[] }).modifiers[1]).toBe(customModifier);
    });

    it('popup (head menu)', () => {
      const { menu } = createMenu({ isHead: true });
      const { submenu, wrapper } = mountSubmenu(
        { expandType: 'popup', title: 'Products', value: 'products' },
        { menu, parentName: 'THeadMenu', slots: { default: () => 'Product' } },
      );
      const popup = submenu.findComponent(SubmenuPopupStub);

      expect(popup.attributes('data-placement')).toBe('bottom-left');
      expect(popup.props('overlayClassName')).toEqual(expect.arrayContaining(['t-is-head-menu']));
      expect(wrapper.get('.t-menu__popup-wrapper').classes()).toContain('t-menu__popup-overflow');
      expect(wrapper.get('.t-menu__spacer').classes()).not.toContain('t-menu__spacer--left');
    });

    it('mouseenter/mouseleave', async () => {
      const { menu } = createMenu({ mode: ref('popup') });
      const { submenu, wrapper } = mountSubmenu(
        { title: 'Products', value: 'products' },
        { menu, slots: { default: () => 'Product' } },
      );

      await wrapper.get('li').trigger('mouseenter');
      await vi.runOnlyPendingTimersAsync();
      await nextTick();

      expect(submenu.findComponent(SubmenuPopupStub).props('visible')).toBe(true);
      expect(menu.open).toHaveBeenCalledWith('products');
      expect(menu.open).toHaveBeenCalledWith('products', 'add');

      await wrapper.get('li').trigger('mouseleave', { relatedTarget: null });
      await vi.advanceTimersByTimeAsync(100);
      await nextTick();
      expect(submenu.findComponent(SubmenuPopupStub).props('visible')).toBe(false);
      expect(menu.open).toHaveBeenCalledWith('products', 'remove');
    });

    it('mouseenter (overlay)', async () => {
      const { menu } = createMenu({ mode: ref('popup') });
      const parentSubmenu = { cancelHideTimer: vi.fn() };
      const { submenu, wrapper } = mountSubmenu(
        { title: 'Products', value: 'products' },
        { menu, parentSubmenu, slots: { default: () => 'Product' } },
      );
      await wrapper.get('li').trigger('mouseenter');
      await vi.runOnlyPendingTimersAsync();
      await nextTick();

      const overlay = wrapper.get('.t-menu__spacer');
      const popupTarget = document.createElement('div');
      popupTarget.className = 't-menu__popup';

      await wrapper.get('li').trigger('mouseleave', { relatedTarget: null });
      await wrapper.get('li').trigger('mouseenter');
      await vi.advanceTimersByTimeAsync(0);

      await wrapper.get('li').trigger('mouseleave', { relatedTarget: null });
      await overlay.trigger('mouseenter');
      await wrapper.get('li').trigger('mouseleave', { relatedTarget: popupTarget });
      await vi.advanceTimersByTimeAsync(100);

      expect(submenu.findComponent(SubmenuPopupStub).props('visible')).toBe(true);
      expect(parentSubmenu.cancelHideTimer).toHaveBeenCalled();
    });

    it('mouseenter (disabled)', async () => {
      const { menu } = createMenu({ mode: ref('popup') });
      const { submenu, wrapper } = mountSubmenu(
        { disabled: true, title: 'Products', value: 'products' },
        { menu, slots: { default: () => 'Product' } },
      );

      await wrapper.get('li').trigger('mouseenter');
      await vi.runOnlyPendingTimersAsync();

      expect(submenu.findComponent(SubmenuPopupStub).props('visible')).toBe(false);
      expect(menu.open).not.toHaveBeenCalled();
    });

    it('popup placement', () => {
      const { submenu, wrapper } = mountSubmenu(
        { expandType: 'popup', title: 'Products', value: 'products' },
        { slots: { default: () => 'Product' } },
      );
      const options = submenu.findComponent(SubmenuPopupStub).props('popperOptions') as {
        modifiers: Array<{ fn?: (input: { state: { placement: string } }) => void }>;
      };
      const updatePlacement = options.modifiers[0].fn;
      const spacer = wrapper.get('.t-menu__spacer');

      updatePlacement?.({ state: { placement: 'bottom-right' } });
      expect(spacer.classes()).toContain('t-menu__spacer--bottom');
      expect(spacer.classes()).not.toContain('t-menu__spacer--top');

      updatePlacement?.({ state: { placement: 'top-left' } });
      expect(spacer.classes()).toContain('t-menu__spacer--top');
      expect(spacer.classes()).not.toContain('t-menu__spacer--bottom');

      updatePlacement?.({ state: { placement: 'right-top' } });
      expect(spacer.classes()).not.toContain('t-menu__spacer--top');
    });

    it('popup placement (before mount)', () => {
      const { submenu } = mountSubmenu(
        { expandType: 'popup', title: 'Products', value: 'products' },
        { renderPopupContent: false, slots: { default: () => 'Product' } },
      );
      const options = submenu.findComponent({ name: 'TPopup' }).props('popperOptions') as {
        modifiers: Array<{ fn?: (input: { state: { placement: string } }) => void }>;
      };

      expect(() => options.modifiers[0].fn?.({ state: { placement: 'top' } })).not.toThrow();
    });

    it('popup context', async () => {
      let childContext: TdSubMenuInterface | undefined;
      // eslint-disable-next-line vue/one-component-per-file -- Local probe exercises popup context callbacks.
      const ContextProbe = defineComponent({
        setup() {
          childContext = inject<TdSubMenuInterface>('TdSubmenu');
          return () => <span>Probe</span>;
        },
      });
      const parentSubmenu: TdSubMenuInterface = {
        cancelHideTimer: vi.fn(),
        closeParentPopup: vi.fn(),
        setSubPopup: vi.fn(),
        value: 'parent',
      };
      const { menu } = createMenu({ mode: ref('popup') });
      const { submenu, wrapper } = mountSubmenu(
        { title: 'Child', value: 'child' },
        { menu, parentSubmenu, slots: { default: () => <ContextProbe /> } },
      );

      await nextTick();
      expect(parentSubmenu.setSubPopup).toHaveBeenCalledWith(expect.any(HTMLElement));

      await wrapper.get('li').trigger('mouseenter');
      await vi.runOnlyPendingTimersAsync();
      await nextTick();
      expect(parentSubmenu.cancelHideTimer).toHaveBeenCalled();

      childContext?.closeParentPopup?.(new MouseEvent('mouseleave'));
      expect(parentSubmenu.closeParentPopup).toHaveBeenCalled();
      await vi.advanceTimersByTimeAsync(100);
      await nextTick();
      expect(submenu.findComponent(SubmenuPopupStub).props('visible')).toBe(false);

      await wrapper.get('li').trigger('mouseenter');
      await vi.advanceTimersByTimeAsync(0);
      await nextTick();
      childContext?.closeParentPopup?.(new MouseEvent('mouseleave'));
      childContext?.cancelHideTimer?.();
      await vi.advanceTimersByTimeAsync(100);
      expect(submenu.findComponent(SubmenuPopupStub).props('visible')).toBe(true);
    });

    it('mouseleave (outside)', async () => {
      const parentSubmenu = { closeParentPopup: vi.fn() };
      const { menu } = createMenu({ mode: ref('popup') });
      const { submenu, wrapper } = mountSubmenu(
        { title: 'Products', value: 'products' },
        { menu, parentSubmenu, slots: { default: () => 'Product' } },
      );
      await wrapper.get('li').trigger('mouseenter');
      await vi.runOnlyPendingTimersAsync();
      await nextTick();

      await wrapper.get('.t-menu__spacer').trigger('mouseleave', { relatedTarget: document.body });
      expect(parentSubmenu.closeParentPopup).toHaveBeenCalled();
      await vi.advanceTimersByTimeAsync(100);
      await nextTick();
      expect(submenu.findComponent(SubmenuPopupStub).props('visible')).toBe(false);
    });

    it('unmount', async () => {
      const { menu, remove, wrapper } = mountSubmenu(
        { expandType: 'popup', title: 'Products', value: 'products' },
        { slots: { default: () => <MenuItem value="child">Child</MenuItem> } },
      );
      await wrapper.get('li').trigger('mouseenter');
      wrapper.unmount();
      await vi.runOnlyPendingTimersAsync();

      expect(menu.open).not.toHaveBeenCalled();
      expect(remove).toHaveBeenCalledWith('products');
    });

    it('popup (nested head menu)', async () => {
      const { menu } = createMenu({ isHead: true, mode: ref('popup') });
      // eslint-disable-next-line vue/one-component-per-file -- Local host reproduces nested head-menu placement.
      const Host = defineComponent({
        name: 'THeadMenu',
        setup() {
          provide('TdMenu', menu);
          return () => (
            <Submenu expandType="popup" title="Parent" value="parent">
              <Submenu expandType="popup" title="Child" value="child">
                <MenuItem value="leaf">Leaf</MenuItem>
              </Submenu>
            </Submenu>
          );
        },
      });
      const wrapper = mount(Host, { global: { stubs: { TPopup: SubmenuPopupStub } } });
      await nextTick();
      const popups = wrapper.findAllComponents(SubmenuPopupStub);

      expect(popups[1].props('placement')).toBe('right-top');
      expect(popups[1].props('overlayClassName')).toEqual(
        expect.arrayContaining([expect.objectContaining({ 't-menu-is-nested': true })]),
      );
      expect(popups[1].find('.t-fake-arrow').attributes('style')).toContain('rotate(-90deg)');
    });

    it('popup (nested side menu)', async () => {
      const closeParentPopup = vi.fn();
      const { menu } = createMenu({ mode: ref('popup') });
      // eslint-disable-next-line vue/one-component-per-file -- Local host reproduces nested side-menu behavior.
      const Host = defineComponent({
        name: 'TMenu',
        setup() {
          provide('TdMenu', menu);
          provide('TdSubmenu', { closeParentPopup, value: 'outside' });
          return () => (
            <Submenu title="Parent" value="parent">
              <Submenu title="Child" value="child">
                <MenuItem value="leaf">Leaf</MenuItem>
              </Submenu>
            </Submenu>
          );
        },
      });
      const wrapper = mount(Host, { global: { stubs: { TPopup: SubmenuPopupStub } } });
      await nextTick();
      const popups = wrapper.findAllComponents(SubmenuPopupStub);
      const spacers = wrapper.findAll('.t-menu__spacer');

      expect(popups.some((popup) => popup.find('.t-fake-arrow').attributes('style')?.includes('rotate(-90deg)'))).toBe(
        true,
      );

      await spacers[0].trigger('mouseleave', { relatedTarget: spacers.at(-1)?.element });
      expect(closeParentPopup).not.toHaveBeenCalled();
    });
  });
});
