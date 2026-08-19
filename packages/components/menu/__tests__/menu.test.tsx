import { mount } from '@vue/test-utils';
import { defineComponent, inject, nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import log from '@tdesign/common-js/log/log';
import { Menu, MenuItem, Submenu } from '..';
import menuProps from '../props';
import type { TdMenuInterface } from '../types';

const MenuContextProbe = defineComponent({
  name: 'MenuContextProbe',
  setup() {
    const menu = inject<TdMenuInterface>('TdMenu');
    menu.vMenu.add({ value: 'one', parent: undefined });
    menu.vMenu.add({ value: 'one-child', parent: 'one' });
    menu.vMenu.add({ value: 'two', parent: undefined });
    menu.vMenu.add({ value: 'two-child', parent: 'two' });

    return () => (
      <div class="menu-context-probe">
        <span data-testid="active-value">{String(menu.activeValue.value ?? '')}</span>
        <span data-testid="expanded-values">{(menu.expandValues?.value ?? []).join(',')}</span>
        <span data-testid="mode">{menu.mode.value}</span>
        <button data-testid="select-one" onClick={() => menu.select('one')} />
        <button data-testid="open-one" onClick={() => menu.open('one', 'add')} />
        <button data-testid="open-two" onClick={() => menu.open('two', 'add')} />
        <button data-testid="add-existing" onClick={() => menu.open('one', 'add')} />
        <button data-testid="remove-one" onClick={() => menu.open('one', 'remove')} />
        <button data-testid="remove-missing" onClick={() => menu.open('missing', 'remove')} />
      </div>
    );
  },
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Menu', () => {
  describe('props', () => {
    it(':default[slot]', () => {
      const wrapper = mount(Menu);
      const root = wrapper.get('.t-default-menu');

      expect(root.classes()).toEqual(expect.arrayContaining(['t-default-menu', 't-menu--light']));
      expect(root.classes()).not.toContain('t-is-collapsed');
      expect((root.element as HTMLElement).style.height).toBe('100%');
      expect((root.element as HTMLElement).style.width).toBe('232px');
      expect(root.get('.t-default-menu__inner').element).toBeInstanceOf(HTMLElement);
      expect(root.get('ul').classes()).toEqual(['t-menu', 't-menu--scroll']);
      expect(root.find('.t-menu__logo').exists()).toBe(false);
      expect(root.find('.t-menu__operations').exists()).toBe(false);
    });

    it(':theme[string] + :collapsed[boolean]', () => {
      const wrapper = mount(Menu, { props: { theme: 'dark', collapsed: true } });
      const root = wrapper.get('.t-default-menu');

      expect(root.classes()).toEqual(expect.arrayContaining(['t-menu--dark', 't-is-collapsed']));
      expect((root.element as HTMLElement).style.width).toBe('64px');
    });

    it(':width[string/number] + :collapsed[boolean]', async () => {
      const wrapper = mount(Menu, { props: { width: '20rem' } });
      const root = wrapper.get('.t-default-menu');

      expect((root.element as HTMLElement).style.width).toBe('20rem');

      await wrapper.setProps({ width: 280 });
      expect((root.element as HTMLElement).style.width).toBe('280px');

      await wrapper.setProps({ collapsed: true });

      expect((root.element as HTMLElement).style.width).toBe('64px');
    });

    it(':width[array]', async () => {
      const wrapper = mount(Menu, { props: { width: [300, '72px'] } });
      const root = wrapper.get('.t-default-menu');

      expect((root.element as HTMLElement).style.width).toBe('300px');

      await wrapper.setProps({ collapsed: true });

      expect((root.element as HTMLElement).style.width).toBe('72px');
    });

    it(':logo[slot] + :default[slot] + :operations[slot]', () => {
      const wrapper = mount(Menu, {
        slots: {
          logo: () => <div data-testid="logo">Logo</div>,
          default: () => <li data-testid="content">Content</li>,
          operations: () => <button data-testid="operations">Operate</button>,
        },
      });

      expect(wrapper.get('.t-menu__logo').text()).toBe('Logo');
      expect(wrapper.get('[data-testid="content"]').text()).toBe('Content');
      expect(wrapper.get('.t-menu__operations').text()).toBe('Operate');
    });

    it(':logo[function] + :operations[function]', () => {
      const wrapper = mount(Menu, {
        props: {
          logo: () => <div data-testid="logo-prop">Logo prop</div>,
          operations: () => <button data-testid="operations-prop">Operations prop</button>,
        },
      });

      expect(wrapper.get('[data-testid="logo-prop"]').text()).toBe('Logo prop');
      expect(wrapper.get('[data-testid="operations-prop"]').text()).toBe('Operations prop');
    });

    it(':options[slot]', () => {
      const warnOnce = vi.spyOn(log, 'warnOnce').mockImplementation(() => undefined);
      const wrapper = mount(Menu, {
        slots: { options: () => <button data-testid="options">Legacy operations</button> },
      });

      expect(warnOnce).toHaveBeenCalledWith(
        'TMenu',
        '`options` slot is going to be deprecated, please use `operations` for slot instead.',
      );
      expect(wrapper.get('.t-menu__operations').text()).toBe('Legacy operations');
    });

    it(':operations[slot]', () => {
      vi.spyOn(log, 'warnOnce').mockImplementation(() => undefined);
      const wrapper = mount(Menu, {
        props: { operations: () => <span>Operations prop</span> },
        slots: {
          operations: () => <span>Operations slot</span>,
          options: () => <span>Options slot</span>,
        },
      });

      expect(wrapper.get('.t-menu__operations').text()).toBe('Operations prop');
    });

    it(':collapsed[boolean]', async () => {
      const onCollapsed = vi.fn();
      const wrapper = mount(Menu, { props: { onCollapsed } });

      expect(onCollapsed).toHaveBeenLastCalledWith({ collapsed: false });

      await wrapper.setProps({ collapsed: true });

      expect(onCollapsed).toHaveBeenLastCalledWith({ collapsed: true });
    });

    it(':theme[string] + :expandType[string]', () => {
      const validateTheme = menuProps.theme.validator;
      const validateExpandType = menuProps.expandType.validator;

      expect(validateTheme(undefined)).toBe(true);
      expect(validateTheme('' as 'light')).toBe(true);
      expect(validateTheme('light')).toBe(true);
      expect(validateTheme('contrast' as 'light')).toBe(false);
      expect(validateExpandType(undefined)).toBe(true);
      expect(validateExpandType('' as 'normal')).toBe(true);
      expect(validateExpandType('popup')).toBe(true);
      expect(validateExpandType('accordion' as 'normal')).toBe(false);
    });
  });

  describe('events', () => {
    it('change (uncontrolled)', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Menu, {
        props: { defaultValue: 'alpha', onChange },
        slots: {
          default: () => [<MenuItem value="alpha">Alpha</MenuItem>, <MenuItem value="beta">Beta</MenuItem>],
        },
      });

      expect(wrapper.findAll('.t-menu__item')[0].classes()).toContain('t-is-active');

      await wrapper.findAll('.t-menu__item')[1].trigger('click');

      expect(wrapper.findAll('.t-menu__item')[1].classes()).toContain('t-is-active');
      expect(onChange).toHaveBeenCalledWith('beta');
    });

    it('change[number]', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Menu, {
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

    it('change (active value)', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Menu, {
        props: { defaultValue: 'alpha', onChange },
        slots: { default: () => <MenuItem value="alpha">Alpha</MenuItem> },
      });

      await wrapper.get('.t-menu__item').trigger('click');

      expect(onChange).not.toHaveBeenCalled();
    });

    it('update:value', async () => {
      const wrapper = mount(Menu, {
        props: { value: 'alpha' },
        slots: {
          default: () => [<MenuItem value="alpha">Alpha</MenuItem>, <MenuItem value="beta">Beta</MenuItem>],
        },
      });

      await wrapper.findAll('.t-menu__item')[1].trigger('click');

      expect(wrapper.emitted('update:value')).toEqual([['beta']]);
      expect(wrapper.findAll('.t-menu__item')[0].classes()).toContain('t-is-active');

      await wrapper.setProps({ value: 'beta' });

      expect(wrapper.findAll('.t-menu__item')[1].classes()).toContain('t-is-active');
    });

    it('update:modelValue', async () => {
      const wrapper = mount(Menu, {
        props: { value: 'alpha', modelValue: 'beta' },
        slots: {
          default: () => [<MenuItem value="alpha">Alpha</MenuItem>, <MenuItem value="beta">Beta</MenuItem>],
        },
      });

      expect(wrapper.findAll('.t-menu__item')[1].classes()).toContain('t-is-active');

      await wrapper.findAll('.t-menu__item')[0].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toEqual([['alpha']]);
      expect(wrapper.emitted('update:value')).toBeUndefined();
    });

    it('change (nested current behavior)', async () => {
      const wrapper = mount(Menu, {
        props: { defaultValue: 'child', defaultExpanded: ['parent'] },
        slots: {
          default: () => (
            <Submenu value="parent" title="Parent">
              <MenuItem value="child">Child</MenuItem>
            </Submenu>
          ),
        },
      });
      await nextTick();
      await nextTick();

      // The leaf reads the default value directly, but the initial VMenu path is
      // not reflected back to the parent submenu. See issue #3208.
      expect(wrapper.get('.t-submenu').classes()).not.toContain('t-is-active');
      expect(wrapper.get('.t-menu__sub .t-menu__item').classes()).toContain('t-is-active');
    });

    it(':expanded[array]', () => {
      const wrapper = mount(Menu, { props: { expanded: null as unknown as [] } });

      expect(wrapper.get('.t-default-menu').element).toBeInstanceOf(HTMLElement);
    });

    it('expand + :expandMutex[boolean]', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Menu, {
        props: { defaultExpanded: ['one'], expandMutex: true, onExpand },
        slots: { default: () => <MenuContextProbe /> },
      });

      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('one');

      await wrapper.get('[data-testid="open-two"]').trigger('click');

      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('two');
      expect(onExpand).toHaveBeenLastCalledWith(['two']);

      await wrapper.get('[data-testid="open-two"]').trigger('click');

      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('');
    });

    it('update:expanded', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Menu, {
        props: { expanded: ['one'], expandMutex: true, onExpand },
        slots: { default: () => <MenuContextProbe /> },
      });

      await wrapper.get('[data-testid="open-two"]').trigger('click');

      expect(wrapper.emitted('update:expanded')).toEqual([[['two']]]);
      expect(onExpand).toHaveBeenCalledWith(['two']);
      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('one');

      await wrapper.setProps({ expanded: ['two'] });

      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('two');

      await wrapper.get('[data-testid="open-one"]').trigger('click');

      expect(wrapper.emitted('update:expanded')?.at(-1)).toEqual([['one']]);
    });

    it('expand (popup)', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Menu, {
        props: { expandType: 'popup', defaultExpanded: ['one'], onExpand },
        slots: { default: () => <MenuContextProbe /> },
      });

      expect(wrapper.get('[data-testid="mode"]').text()).toBe('popup');

      await wrapper.get('[data-testid="add-existing"]').trigger('click');
      expect(onExpand).not.toHaveBeenCalled();

      await wrapper.get('[data-testid="open-two"]').trigger('click');
      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('one,two');

      await wrapper.get('[data-testid="remove-one"]').trigger('click');
      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('two');
    });

    it('expand (missing popup value current behavior)', async () => {
      const wrapper = mount(Menu, {
        props: { expandType: 'popup', defaultExpanded: ['one', 'two'] },
        slots: { default: () => <MenuContextProbe /> },
      });

      await wrapper.get('[data-testid="remove-missing"]').trigger('click');

      // See issue #6856.
      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('one');
    });

    it(':collapsed[boolean]', async () => {
      const wrapper = mount(Menu, {
        props: { defaultExpanded: [], expandType: 'normal' },
        slots: { default: () => <MenuContextProbe /> },
      });

      await wrapper.get('[data-testid="open-one"]').trigger('click');
      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('one');

      await wrapper.setProps({ collapsed: true });
      expect(wrapper.get('[data-testid="mode"]').text()).toBe('popup');

      await wrapper.get('[data-testid="remove-one"]').trigger('click');
      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('');

      await wrapper.setProps({ collapsed: false });

      expect(wrapper.get('[data-testid="mode"]').text()).toBe('normal');
      expect(wrapper.get('[data-testid="expanded-values"]').text()).toBe('one');
    });

    it(':expandType[string]', async () => {
      const wrapper = mount(Menu, {
        props: { expandType: 'normal' },
        slots: { default: () => <MenuContextProbe /> },
      });

      await wrapper.setProps({ expandType: 'popup' });

      expect(wrapper.get('[data-testid="mode"]').text()).toBe('popup');
    });

    it('change (context)', async () => {
      const onChange = vi.fn();
      const wrapper = mount(Menu, {
        props: { onChange },
        slots: { default: () => <MenuContextProbe /> },
      });

      await wrapper.get('[data-testid="select-one"]').trigger('click');

      expect(wrapper.get('[data-testid="active-value"]').text()).toBe('one');
      expect(onChange).toHaveBeenCalledWith('one');
    });
  });
});
