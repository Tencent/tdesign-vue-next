/* eslint-disable vue/one-component-per-file */
import { mount, type VueWrapper } from '@vue/test-utils';
import { computed, defineComponent, Fragment, h, inject, nextTick, ref } from 'vue';

import log from '@tdesign/common-js/log/log';
import HeadMenu from '../head-menu';
import headMenuProps from '../head-menu-props';
import MenuItem from '../menu-item';
import Submenu from '../submenu';
import type { TdMenuInterface } from '../types';

const HeadMenuContextProbe = defineComponent({
  name: 'HeadMenuContextProbe',
  setup() {
    const menu = inject<TdMenuInterface>('TdMenu');
    return () => (
      <div class="context-probe">
        <span data-testid="active">{String(menu.activeValue.value ?? '')}</span>
        <span data-testid="expanded">{menu.expandValues?.value.join(',')}</span>
        <span data-testid="mode">{menu.mode.value}</span>
        <button data-testid="select" onClick={() => menu.select('selected')} />
        <button data-testid="open-one" onClick={() => menu.open?.('one', 'add')} />
        <button data-testid="open-two" onClick={() => menu.open?.('two', 'add')} />
        <button data-testid="remove-one" onClick={() => menu.open?.('one', 'remove')} />
        <button data-testid="remove-missing" onClick={() => menu.open?.('missing', 'remove')} />
      </div>
    );
  },
});

const TabsStub = defineComponent({
  name: 'TTabs',
  props: { value: [String, Number] },
  emits: ['change'],
  setup(props, { emit, slots }) {
    return () => (
      <div class="tabs-stub" data-value={String(props.value ?? '')}>
        {slots.default?.()}
        <button data-testid="choose-push" onClick={() => emit('change', 'push-child')} />
        <button data-testid="choose-replace" onClick={() => emit('change', 'replace-child')} />
        <button data-testid="choose-href" onClick={() => emit('change', 'href-child')} />
      </div>
    );
  },
});

const TabPanelStub = defineComponent({
  name: 'TTabPanel',
  props: { label: null, value: [String, Number] },
  setup(props) {
    return () => (
      <span class="panel-stub" data-value={String(props.value)}>
        {props.label}
      </span>
    );
  },
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('HeadMenu', () => {
  describe('props', () => {
    describe('rendering', () => {
      it(':default[slot]', () => {
        const wrapper = mount(HeadMenu);
        const root = wrapper.get('.t-head-menu');

        expect(root.classes()).toEqual(expect.arrayContaining(['t-menu', 't-head-menu', 't-menu--light']));
        expect(root.get('.t-head-menu__inner').element).toBeInstanceOf(HTMLElement);
        expect(root.get('ul.t-menu').element.children).toHaveLength(0);
        expect(root.find('.t-menu__logo').exists()).toBe(false);
        expect(root.find('.t-menu__operations').exists()).toBe(false);
        expect(root.find('.t-head-menu__submenu').exists()).toBe(false);
      });

      it(':theme[string] + :expandType[string]', async () => {
        const wrapper = mount(HeadMenu);
        await wrapper.setProps({ theme: 'dark' });

        expect(wrapper.get('.t-head-menu').classes()).toContain('t-menu--dark');
        expect(headMenuProps.theme.validator('' as 'light')).toBe(true);
        expect(headMenuProps.theme.validator('light')).toBe(true);
        expect(headMenuProps.theme.validator('contrast' as 'light')).toBe(false);
        expect(headMenuProps.expandType.validator('' as 'normal')).toBe(true);
        expect(headMenuProps.expandType.validator('popup')).toBe(true);
        expect(headMenuProps.expandType.validator('accordion' as 'normal')).toBe(false);
      });

      it(':logo[slot] + :operations[slot] + :content[slot]', () => {
        const wrapper = mount(HeadMenu, {
          slots: {
            content: () => <MenuItem value="content">Content slot</MenuItem>,
            logo: () => <span data-testid="logo-slot">Logo</span>,
            operations: () => <button data-testid="operations-slot">Operate</button>,
          },
        });

        expect(wrapper.get('.t-menu__logo').text()).toBe('Logo');
        expect(wrapper.get('.t-menu__operations').text()).toBe('Operate');
        expect(wrapper.get('.t-menu__item').text()).toBe('Content slot');
      });

      it(':logo[function] + :operations[function]', () => {
        const wrapper = mount(HeadMenu, {
          props: {
            logo: () => <span>Logo prop</span>,
            operations: () => <span>Operations prop</span>,
          },
          slots: {
            logo: () => <span>Logo slot</span>,
            operations: () => <span>Operations slot</span>,
          },
        });

        expect(wrapper.get('.t-menu__logo').text()).toBe('Logo prop');
        expect(wrapper.get('.t-menu__operations').text()).toBe('Operations prop');
      });

      it(':options[slot]', () => {
        const warnOnce = vi.spyOn(log, 'warnOnce').mockImplementation(() => undefined);
        const wrapper = mount(HeadMenu, { slots: { options: () => <span>Legacy operations</span> } });

        expect(warnOnce).toHaveBeenCalledWith(
          'TMenu',
          '`options` slot is going to be deprecated, please use `operations` for slot instead.',
        );
        expect(wrapper.get('.t-menu__operations').text()).toBe('Legacy operations');
      });

      it(':operations[slot]', () => {
        vi.spyOn(log, 'warnOnce').mockImplementation(() => undefined);
        const wrapper = mount(HeadMenu, {
          slots: {
            operations: () => <span>Current</span>,
            options: () => <span>Legacy</span>,
          },
        });

        expect(wrapper.get('.t-menu__operations').text()).toBe('Current');
      });
    });

    const MORE_VALUE = '__t_head_menu_more__';

    const SubmenuStub = defineComponent({
      name: 'TSubmenu',
      inheritAttrs: false,
      props: {
        expandType: String,
        title: [String, Function],
        value: [String, Number],
      },
      setup(props, { attrs, slots }) {
        const menu = inject<TdMenuInterface>('TdMenu');
        const active = computed(() => menu.activeValues.value.includes(props.value));
        return () => (
          <li
            {...attrs}
            class={[attrs.class, 't-submenu', { 't-is-active': active.value }]}
            data-menu-value={String(props.value)}
          >
            <span class="submenu-title">{typeof props.title === 'function' ? props.title() : props.title}</span>
            <div class="submenu-content">{slots.default?.()}</div>
          </li>
        );
      },
    });

    const WrappedItems = defineComponent({
      name: 'WrappedItems',
      setup() {
        return () => (
          <div class="wrapped-items" style="display: block">
            <MenuItem value="one">One</MenuItem>
            <MenuItem value="two">Two</MenuItem>
            <MenuItem value="three">Three</MenuItem>
          </div>
        );
      },
    });

    let innerWidth = 150;
    let itemWidth = 60;
    let moreWidth = 20;
    let auxiliaryWidth = 0;
    let auxiliaryMargin = 0;
    let menuSpacing = 0;
    let hideMoreBeforeWidthRead = false;
    let resizeCallback: ResizeObserverCallback | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let frameId = 0;
    let frameCallbacks = new Map<number, FrameRequestCallback>();
    const mountedWrappers: VueWrapper[] = [];

    class ResizeObserverMock implements ResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback;
        resizeObserver = this;
      }

      disconnect = vi.fn();

      observe = vi.fn();

      unobserve = vi.fn();
    }

    const rect = (width: number): DOMRect => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: width,
      toJSON: () => ({}),
      top: 0,
      width,
      x: 0,
      y: 0,
    });

    const flushFrames = async () => {
      const callbacks = [...frameCallbacks.values()];
      frameCallbacks.clear();
      callbacks.forEach((callback) => callback(0));
      await nextTick();
    };

    const settleLayout = async () => {
      await nextTick();
      await nextTick();
      await flushFrames();
      await nextTick();
    };

    const triggerResize = async () => {
      resizeCallback?.([], resizeObserver as ResizeObserver);
      await nextTick();
      await nextTick();
    };

    const mountHeadMenu = (options: Parameters<typeof mount<typeof HeadMenu>>[1] = {}) => {
      const wrapper = mount(HeadMenu, {
        ...options,
        global: {
          ...options.global,
          stubs: { ...options.global?.stubs, TSubmenu: SubmenuStub },
        },
      });
      mountedWrappers.push(wrapper);
      return wrapper;
    };

    const topMenuChildren = (wrapper: VueWrapper) =>
      Array.from(wrapper.get('.t-head-menu__inner > ul.t-menu').element.children) as HTMLElement[];

    describe('overflow', () => {
      beforeEach(() => {
        innerWidth = 150;
        itemWidth = 60;
        moreWidth = 20;
        auxiliaryWidth = 0;
        auxiliaryMargin = 0;
        menuSpacing = 0;
        hideMoreBeforeWidthRead = false;
        resizeCallback = undefined;
        resizeObserver = undefined;
        frameId = 0;
        frameCallbacks = new Map();

        vi.stubGlobal('ResizeObserver', ResizeObserverMock);
        vi.stubGlobal(
          'requestAnimationFrame',
          vi.fn((callback: FrameRequestCallback) => {
            frameId += 1;
            frameCallbacks.set(frameId, callback);
            return frameId;
          }),
        );
        vi.stubGlobal(
          'cancelAnimationFrame',
          vi.fn((id: number) => {
            frameCallbacks.delete(id);
          }),
        );

        vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function getClientWidth(
          this: HTMLElement,
        ) {
          return this.classList.contains('t-head-menu__inner') ? innerWidth : 0;
        });
        vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function getOffsetWidth(
          this: HTMLElement,
        ) {
          return this.classList.contains('t-menu__logo') || this.classList.contains('t-menu__operations')
            ? auxiliaryWidth
            : 0;
        });
        vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function getRect(
          this: HTMLElement,
        ) {
          if (this.classList.contains('t-head-menu__submenu--more')) return rect(moreWidth);
          if (this.classList.contains('t-menu__item') || this.classList.contains('t-submenu')) return rect(itemWidth);
          return rect(0);
        });

        const nativeGetComputedStyle = window.getComputedStyle.bind(window);
        vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudoElement) => {
          const style = nativeGetComputedStyle(element, pseudoElement);
          const htmlElement = element as HTMLElement;
          if (hideMoreBeforeWidthRead && htmlElement.matches('ul.t-menu')) {
            const more = htmlElement.closest('.t-head-menu')?.querySelector<HTMLElement>('.t-head-menu__submenu--more');
            if (more) more.style.display = 'none';
          }
          const values: Partial<Record<keyof CSSStyleDeclaration, string>> = {
            marginLeft:
              htmlElement.classList.contains('t-menu__logo') || htmlElement.classList.contains('t-menu__operations')
                ? `${auxiliaryMargin}px`
                : '0px',
            marginRight:
              htmlElement.classList.contains('t-menu__logo') || htmlElement.classList.contains('t-menu__operations')
                ? `${auxiliaryMargin}px`
                : '0px',
            paddingLeft: htmlElement.matches('ul.t-menu') ? `${menuSpacing}px` : '0px',
            paddingRight: htmlElement.matches('ul.t-menu') ? `${menuSpacing}px` : '0px',
          };
          return new Proxy(style, {
            get(target, property, receiver) {
              if (property in values) return values[property as keyof CSSStyleDeclaration];
              const value = Reflect.get(target, property, receiver);
              return typeof value === 'function' ? value.bind(target) : value;
            },
          });
        });
      });

      afterEach(() => {
        mountedWrappers.splice(0).forEach((wrapper) => wrapper.unmount());
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
      });

      it('folds direct items, renders only overflow items, and highlights More for an active folded item', async () => {
        const wrapper = mountHeadMenu({
          props: { defaultValue: 'three', expandType: 'popup' },
          slots: {
            default: () => [
              <MenuItem value="one">One</MenuItem>,
              <MenuItem value="two">Two</MenuItem>,
              <MenuItem value="three">Three</MenuItem>,
            ],
          },
        });
        await settleLayout();
        const children = topMenuChildren(wrapper);

        expect(children.slice(0, 3).map((element) => element.style.display)).toEqual(['', '', 'none']);
        expect(children[3].style.display).toBe('');
        expect(children[3].classList).toContain('t-is-active');
        expect(wrapper.get('[data-menu-value="__t_head_menu_more__"] .submenu-content').text()).toBe('Three');

        await wrapper.findAll('.t-head-menu__inner > ul.t-menu > .t-menu__item')[0].trigger('click');
        expect(children[3].classList).not.toContain('t-is-active');
      });

      it('responds to ResizeObserver changes by folding and unfolding', async () => {
        innerWidth = 500;
        const wrapper = mountHeadMenu({
          props: { expandType: 'popup' },
          slots: {
            default: () => [
              <MenuItem value="one">One</MenuItem>,
              <MenuItem value="two">Two</MenuItem>,
              <MenuItem value="three">Three</MenuItem>,
            ],
          },
        });
        await settleLayout();
        let children = topMenuChildren(wrapper);
        expect(children.slice(0, 3).every((element) => element.style.display === '')).toBe(true);
        expect(children[3].style.display).toBe('none');
        expect(wrapper.get('[data-menu-value="__t_head_menu_more__"] .submenu-content').text()).toBe('');

        innerWidth = 100;
        await triggerResize();
        children = topMenuChildren(wrapper);
        expect(children[1].style.display).toBe('none');
        expect(children[3].style.display).toBe('');

        innerWidth = 500;
        await triggerResize();
        children = topMenuChildren(wrapper);
        expect(children.slice(0, 3).every((element) => element.style.display === '')).toBe(true);
        expect(children[3].style.display).toBe('none');
      });

      it('uses PopupOverflowContent when menu items come from a wrapper component', async () => {
        const wrapper = mountHeadMenu({
          props: { expandType: 'popup' },
          slots: { default: () => <WrappedItems /> },
        });
        await settleLayout();

        expect(wrapper.get('.wrapped-items').attributes('style')).toContain('display: contents');
        const overflowItems = wrapper.findAll(
          '[data-menu-value="__t_head_menu_more__"] .submenu-content .t-menu__item',
        );
        expect(overflowItems.map((item) => item.text())).toEqual(['One', 'Two', 'Three']);
        expect(overflowItems.map((item) => item.attributes('style'))).toEqual([
          'display: none;',
          'display: none;',
          undefined,
        ]);
      });

      it('restores an empty wrapper path without showing More', async () => {
        const wrapper = mountHeadMenu({
          props: { expandType: 'popup' },
          slots: {
            default: () => (
              <div class="empty-wrapper" style="display: inline-block">
                <div>
                  <div>
                    <div>
                      <div>
                        <div class="t-menu__item">Too deep</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
        });
        await settleLayout();
        const children = topMenuChildren(wrapper);

        expect(wrapper.get('.empty-wrapper').attributes('style')).toContain('display: contents');
        expect(children.at(-1)?.style.display).toBe('none');
      });

      it('temporarily reveals a hidden More button while measuring it', async () => {
        hideMoreBeforeWidthRead = true;
        const wrapper = mountHeadMenu({
          props: { expandType: 'popup' },
          slots: {
            default: () => [
              <MenuItem value="one">One</MenuItem>,
              <MenuItem value="two">Two</MenuItem>,
              <MenuItem value="three">Three</MenuItem>,
            ],
          },
        });
        await settleLayout();
        const more = wrapper.get(`[data-menu-value="${MORE_VALUE}"]`);

        expect((more.element as HTMLElement).style.visibility).toBe('');
        expect((more.element as HTMLElement).style.display).toBe('');
      });

      it('accounts for logo, operations, margins, menu spacing, and image load resizing', async () => {
        innerWidth = 240;
        auxiliaryWidth = 40;
        auxiliaryMargin = 5;
        menuSpacing = 5;
        itemWidth = 70;
        const wrapper = mountHeadMenu({
          props: { expandType: 'popup' },
          slots: {
            default: () => [<MenuItem value="one">One</MenuItem>, <MenuItem value="two">Two</MenuItem>],
            logo: () => <img data-testid="logo-image" src="logo.png" />,
            operations: () => <button>Operate</button>,
          },
        });
        await settleLayout();
        const image = wrapper.get('[data-testid="logo-image"]').element as HTMLImageElement;
        const children = topMenuChildren(wrapper);

        expect(children[1].style.display).toBe('none');
        expect(typeof image.onload).toBe('function');

        innerWidth = 400;
        image.onload?.(new Event('load'));
        await nextTick();
        expect(children[1].style.display).toBe('');
      });

      it('flattens fragments, array children, and slot-function wrappers', async () => {
        const SlotWrapper = defineComponent({
          name: 'SlotWrapper',
          setup(_, { slots }) {
            return () => <div class="slot-wrapper">{slots.default?.()}</div>;
          },
        });
        innerWidth = 130;
        const wrapper = mountHeadMenu({
          props: { expandType: 'popup' },
          slots: {
            default: () => [
              h(Fragment, null, [<MenuItem value="fragment">Fragment</MenuItem>]),
              h('div', { class: 'array-wrapper' }, [<MenuItem value="array">Array</MenuItem>]),
              h(SlotWrapper, null, { default: () => [<MenuItem value="slot">Slot</MenuItem>] }),
            ],
          },
        });
        await settleLayout();

        expect(wrapper.findAll('.t-head-menu__inner > ul.t-menu .t-menu__item').length).toBeGreaterThanOrEqual(3);
        expect(topMenuChildren(wrapper).at(-1)?.style.display).toBe('');
      });

      it('currently throws when an unmounted wrapper slot returns one VNode', () => {
        // See issue #6857.
        const SlotWrapper = defineComponent({
          name: 'SingleSlotWrapper',
          setup(_, { slots }) {
            return () => <div>{slots.default?.()}</div>;
          },
        });
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

        expect(() =>
          mountHeadMenu({
            props: { expandType: 'popup' },
            slots: {
              default: () => h(SlotWrapper, null, { default: () => <MenuItem value="single">Single</MenuItem> }),
            },
          }),
        ).toThrow('nodes is not iterable');
        expect(consoleError).not.toHaveBeenCalled();
      });

      it('marks More active when a folded submenu contains the active leaf', async () => {
        innerWidth = 100;
        const wrapper = mountHeadMenu({
          props: { defaultValue: 'leaf', expandType: 'popup' },
          slots: {
            default: () => [
              <MenuItem value="visible">Visible</MenuItem>,
              <Submenu title="Folded" value="parent">
                <MenuItem value="leaf">Leaf</MenuItem>
              </Submenu>,
            ],
          },
        });
        await settleLayout();

        expect(wrapper.get(`[data-menu-value="${MORE_VALUE}"]`).classes()).toContain('t-is-active');
      });

      it('uses the content slot when rebuilding folded popup items', async () => {
        const wrapper = mountHeadMenu({
          props: { expandType: 'popup' },
          slots: {
            content: () => [
              <MenuItem value="one">One</MenuItem>,
              <MenuItem value="two">Two</MenuItem>,
              <MenuItem value="three">Three</MenuItem>,
            ],
          },
        });
        await settleLayout();

        expect(wrapper.get(`[data-menu-value="${MORE_VALUE}"] .submenu-content`).text()).toBe('Three');
      });

      it('coalesces pending animation frames and cancels one on unmount', async () => {
        const values = ref(['one']);
        const wrapper = mountHeadMenu({
          props: { expandType: 'popup' },
          slots: { default: () => values.value.map((value) => <MenuItem value={value}>{value}</MenuItem>) },
        });
        expect(requestAnimationFrame).toHaveBeenCalledTimes(1);

        values.value = ['one', 'two'];
        await nextTick();
        expect(requestAnimationFrame).toHaveBeenCalledTimes(1);

        wrapper.unmount();
        expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('events', () => {
    describe('value', () => {
      it(':defaultValue[string]', async () => {
        const onChange = vi.fn();
        const wrapper = mount(HeadMenu, {
          props: { defaultValue: 'one', onChange },
          slots: {
            default: () => [<MenuItem value="one">One</MenuItem>, <MenuItem value="two">Two</MenuItem>],
          },
        });

        expect(wrapper.findAll('.t-menu__item')[0].classes()).toContain('t-is-active');
        await wrapper.findAll('.t-menu__item')[1].trigger('click');

        expect(onChange).toHaveBeenCalledWith('two');
        expect(wrapper.findAll('.t-menu__item')[1].classes()).toContain('t-is-active');
      });

      it(':defaultValue[number]', async () => {
        const onChange = vi.fn();
        const wrapper = mount(HeadMenu, {
          props: { defaultValue: 0, onChange },
          slots: {
            default: () => [<MenuItem value={0}>Zero</MenuItem>, <MenuItem value={1}>One</MenuItem>],
          },
        });

        expect(wrapper.findAll('.t-menu__item')[0].classes()).toContain('t-is-active');

        await wrapper.findAll('.t-menu__item')[1].trigger('click');

        expect(onChange).toHaveBeenCalledWith(1);
        expect(wrapper.findAll('.t-menu__item')[1].classes()).toContain('t-is-active');
      });

      it(':value[string]', async () => {
        const wrapper = mount(HeadMenu, {
          props: { value: 'one' },
          slots: {
            default: () => [<MenuItem value="one">One</MenuItem>, <MenuItem value="two">Two</MenuItem>],
          },
        });

        await wrapper.findAll('.t-menu__item')[1].trigger('click');
        expect(wrapper.emitted('update:value')).toEqual([['two']]);
        expect(wrapper.findAll('.t-menu__item')[0].classes()).toContain('t-is-active');

        await wrapper.setProps({ value: 'two' });
        expect(wrapper.findAll('.t-menu__item')[1].classes()).toContain('t-is-active');
      });

      it(':modelValue[string]', async () => {
        const wrapper = mount(HeadMenu, {
          props: { modelValue: 'two', value: 'one' },
          slots: {
            default: () => [<MenuItem value="one">One</MenuItem>, <MenuItem value="two">Two</MenuItem>],
          },
        });

        expect(wrapper.findAll('.t-menu__item')[1].classes()).toContain('t-is-active');
        await wrapper.findAll('.t-menu__item')[0].trigger('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([['one']]);
        expect(wrapper.emitted('update:value')).toBeUndefined();
      });

      it('change', async () => {
        const wrapper = mount(HeadMenu, {
          slots: { default: () => <HeadMenuContextProbe /> },
        });

        await wrapper.get('[data-testid="select"]').trigger('click');

        expect(wrapper.get('[data-testid="active"]').text()).toBe('selected');
      });
    });

    describe('expanded', () => {
      it(':defaultExpanded[array]', async () => {
        const wrapper = mount(HeadMenu, {
          props: { defaultExpanded: ['parent'] },
          slots: {
            default: () => (
              <Submenu title="Parent" value="parent">
                <MenuItem value="push-child">Push child</MenuItem>
                <MenuItem value="replace-child">Replace child</MenuItem>
                {h(MenuItem, { value: 'empty-child' }, { default: (): ReturnType<typeof h>[] => [] })}
              </Submenu>
            ),
          },
          global: { stubs: { TTabPanel: TabPanelStub, TTabs: TabsStub } },
        });
        await nextTick();

        expect(wrapper.get('.t-head-menu__submenu').element).toBeInstanceOf(HTMLElement);
        expect(wrapper.findAll('.panel-stub').map((panel) => panel.attributes('data-value'))).toEqual([
          'push-child',
          'replace-child',
          'empty-child',
        ]);
      });

      it('change (submenu tabs)', async () => {
        const push = vi.fn();
        const replace = vi.fn();
        const pushClick = vi.fn();
        const replaceClick = vi.fn();
        const router = { push, replace };
        const onChange = vi.fn();
        const wrapper = mount(HeadMenu, {
          props: { defaultExpanded: ['parent'], onChange },
          slots: {
            default: () => (
              <Submenu title="Parent" value="parent">
                <MenuItem onClick={pushClick} router={router} to="/push" value="push-child">
                  Push
                </MenuItem>
                <MenuItem onClick={replaceClick} replace router={router} to="/replace" value="replace-child">
                  Replace
                </MenuItem>
              </Submenu>
            ),
          },
          global: { stubs: { TTabPanel: TabPanelStub, TTabs: TabsStub } },
        });
        await nextTick();

        await wrapper.get('[data-testid="choose-push"]').trigger('click');
        expect(onChange).toHaveBeenCalledWith('push-child');
        expect(pushClick).toHaveBeenCalledWith({ value: 'push-child' });
        expect(push).toHaveBeenCalledWith('/push');

        await wrapper.get('[data-testid="choose-replace"]').trigger('click');
        expect(replaceClick).toHaveBeenCalledWith({ value: 'replace-child' });
        expect(replace).toHaveBeenCalledWith('/replace');
      });

      it(':router[string/object]', async () => {
        const router = { push: vi.fn() };
        const currentHref = window.location.href;
        const wrapper = mount(HeadMenu, {
          props: { defaultExpanded: ['parent'] },
          slots: {
            default: () => (
              <Submenu title="Parent" value="parent">
                <MenuItem to="/push" value="push-child">
                  Push
                </MenuItem>
                <MenuItem href={currentHref} value="href-child">
                  Href
                </MenuItem>
              </Submenu>
            ),
          },
          global: {
            mocks: { $router: router },
            stubs: { TTabPanel: TabPanelStub, TTabs: TabsStub },
          },
        });
        await nextTick();

        await wrapper.get('[data-testid="choose-push"]').trigger('click');
        expect(router.push).toHaveBeenCalledWith('/push');

        await wrapper.get('[data-testid="choose-href"]').trigger('click');
        expect(window.location.href).toBe(currentHref);
      });

      it(':defaultExpanded[array]', async () => {
        const onExpand = vi.fn();
        const wrapper = mount(HeadMenu, {
          props: { defaultExpanded: ['one'], onExpand },
          slots: { default: () => <HeadMenuContextProbe /> },
        });

        await wrapper.get('[data-testid="open-two"]').trigger('click');
        expect(wrapper.get('[data-testid="expanded"]').text()).toBe('two');
        expect(onExpand).toHaveBeenLastCalledWith(['two']);

        await wrapper.get('[data-testid="open-two"]').trigger('click');
        expect(wrapper.get('[data-testid="expanded"]').text()).toBe('');
      });

      it(':expanded[array]', async () => {
        const wrapper = mount(HeadMenu, {
          props: { expanded: ['one'] },
          slots: { default: () => <HeadMenuContextProbe /> },
        });

        await wrapper.get('[data-testid="open-two"]').trigger('click');

        expect(wrapper.emitted('update:expanded')).toEqual([[['two']]]);
        expect(wrapper.get('[data-testid="expanded"]').text()).toBe('one');
      });
    });

    describe('expandType', () => {
      it(':expandType[popup]', async () => {
        const onExpand = vi.fn();
        const wrapper = mount(HeadMenu, {
          props: { defaultExpanded: ['one'], expandType: 'popup', onExpand },
          slots: { default: () => <HeadMenuContextProbe /> },
        });

        await wrapper.get('[data-testid="open-one"]').trigger('click');
        expect(wrapper.get('[data-testid="expanded"]').text()).toBe('one');

        await wrapper.get('[data-testid="open-two"]').trigger('click');
        expect(wrapper.get('[data-testid="expanded"]').text()).toBe('one,two');

        await wrapper.get('[data-testid="remove-one"]').trigger('click');
        expect(wrapper.get('[data-testid="expanded"]').text()).toBe('two');
        expect(onExpand).toHaveBeenLastCalledWith(['two']);
      });

      it(':expandType[popup] (missing value current behavior)', async () => {
        const wrapper = mount(HeadMenu, {
          props: { defaultExpanded: ['one', 'two'], expandType: 'popup' },
          slots: { default: () => <HeadMenuContextProbe /> },
        });

        await wrapper.get('[data-testid="remove-missing"]').trigger('click');

        // indexOf returns -1 and splice(-1, 1) removes the final value. See issue #6856.
        expect(wrapper.get('[data-testid="expanded"]').text()).toBe('one');
      });

      it(':expandType[string]', async () => {
        const wrapper = mount(HeadMenu, {
          slots: { default: () => <HeadMenuContextProbe /> },
        });
        expect(wrapper.get('[data-testid="mode"]').text()).toBe('normal');

        await wrapper.setProps({ expandType: 'popup' });

        expect(wrapper.get('[data-testid="mode"]').text()).toBe('popup');
        expect(wrapper.find('.t-head-menu__submenu--more').exists()).toBe(true);
      });
    });
  });
});
