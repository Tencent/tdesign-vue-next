import { mount, type VueWrapper } from '@vue/test-utils';
import { defineComponent, Fragment, h, nextTick, ref } from 'vue';

import log from '@tdesign/common-js/log/log';
import { sleep } from '@tdesign/internal-utils';
import { TabPanel } from '../../tabs';
import HeadMenu from '../head-menu';
import headMenuProps from '../head-menu-props';
import MenuItem from '../menu-item';
import Submenu from '../submenu';
import { HeadMenuContextProbe } from './mount';

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

    // eslint-disable-next-line vue/one-component-per-file -- Fixture covers wrapped slot traversal only in this suite.
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
    let resizeObservers: ResizeObserverMock[] = [];
    let frameId = 0;
    let frameCallbacks = new Map<number, FrameRequestCallback>();
    const mountedWrappers: VueWrapper[] = [];

    class ResizeObserverMock implements ResizeObserver {
      readonly callback: ResizeObserverCallback;

      readonly elements = new Set<Element>();

      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
        resizeObservers.push(this);
      }

      disconnect = vi.fn(() => this.elements.clear());

      observe = vi.fn((element: Element) => {
        this.elements.add(element);
      });

      unobserve = vi.fn((element: Element) => {
        this.elements.delete(element);
      });
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
      const observer = resizeObservers.find((item) =>
        [...item.elements].some((element) => (element as HTMLElement).classList.contains('t-head-menu__inner')),
      );
      observer?.callback([], observer);
      await nextTick();
      await nextTick();
    };

    const mountHeadMenu = (options: Parameters<typeof mount<typeof HeadMenu>>[1] = {}) => {
      const wrapper = mount(HeadMenu, options);
      mountedWrappers.push(wrapper);
      return wrapper;
    };

    const topMenuChildren = (wrapper: VueWrapper) =>
      Array.from(wrapper.get('.t-head-menu__inner > ul.t-menu').element.children) as HTMLElement[];

    const getMoreSubmenu = (wrapper: VueWrapper) => wrapper.get('.t-head-menu__submenu--more');

    const getMoreItems = (wrapper: VueWrapper) =>
      wrapper.findAll('.t-head-menu__submenu--more > div[style*="display: none"] .t-menu__item');

    describe('overflow', () => {
      beforeEach(() => {
        innerWidth = 150;
        itemWidth = 60;
        moreWidth = 20;
        auxiliaryWidth = 0;
        auxiliaryMargin = 0;
        menuSpacing = 0;
        hideMoreBeforeWidthRead = false;
        resizeObservers = [];
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
        expect(getMoreSubmenu(wrapper).get('.t-menu__item').classes()).toContain('t-is-active');
        await getMoreSubmenu(wrapper).trigger('mouseenter');
        await sleep(0);
        await nextTick();
        expect(
          [...document.body.querySelectorAll<HTMLElement>('.t-menu__popup .t-menu__item')].map(
            (item) => item.textContent,
          ),
        ).toEqual(['Three']);

        await wrapper.findAll('.t-head-menu__inner > ul.t-menu > .t-menu__item')[0].trigger('click');
        expect(getMoreSubmenu(wrapper).get('.t-menu__item').classes()).not.toContain('t-is-active');
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
        expect(getMoreItems(wrapper)).toHaveLength(0);

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
        const overflowItems = getMoreItems(wrapper);
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
        const more = getMoreSubmenu(wrapper);

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
        // eslint-disable-next-line vue/one-component-per-file -- Local fixture exercises slot-function wrapper flattening.
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
        // eslint-disable-next-line vue/one-component-per-file -- Local fixture reproduces the single-VNode wrapper edge case.
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

        expect(getMoreSubmenu(wrapper).get('.t-menu__item').classes()).toContain('t-is-active');
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

        expect(getMoreItems(wrapper).map((item) => item.text())).toEqual(['Three']);
      });

      it('coalesces pending animation frames and cancels one on unmount', async () => {
        const values = ref(['one']);
        const wrapper = mountHeadMenu({
          props: { expandType: 'popup' },
          slots: { default: () => values.value.map((value) => <MenuItem value={value}>{value}</MenuItem>) },
        });
        const scheduledFrameCount = vi.mocked(requestAnimationFrame).mock.calls.length;
        expect(scheduledFrameCount).toBeGreaterThan(0);

        values.value = ['one', 'two'];
        await nextTick();
        expect(requestAnimationFrame).toHaveBeenCalledTimes(scheduledFrameCount);

        wrapper.unmount();
        expect(cancelAnimationFrame).toHaveBeenCalled();
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
        });
        await nextTick();

        expect(wrapper.get('.t-head-menu__submenu').element).toBeInstanceOf(HTMLElement);
        expect(wrapper.findAllComponents(TabPanel).map((panel) => panel.props('value'))).toEqual([
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
        });
        await nextTick();
        const navItems = wrapper.findAll('.t-tabs__nav-item');

        await navItems[0].trigger('click');
        expect(onChange).toHaveBeenCalledWith('push-child');
        expect(pushClick).toHaveBeenCalledWith({ value: 'push-child' });
        expect(push).toHaveBeenCalledWith('/push');

        await navItems[1].trigger('click');
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
          },
        });
        await nextTick();
        const navItems = wrapper.findAll('.t-tabs__nav-item');

        await navItems[0].trigger('click');
        expect(router.push).toHaveBeenCalledWith('/push');

        await navItems[1].trigger('click');
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
