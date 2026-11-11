// @ts-nocheck
import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HeadMenu from '../head-menu';
import MenuItem from '../menu-item';

const flush = async () => {
  await new Promise((r) => setTimeout(r, 20));
};

describe('HeadMenu slot returns a single VNode (issue #6857)', () => {
  it('does not throw when a wrapper component slot returns a single menu item', async () => {
    const MenuContent = defineComponent({
      setup(_, { slots }) {
        return () => h('div', null, slots.default?.());
      },
    });

    expect(() => {
      mount(HeadMenu, {
        props: { expandType: 'popup' },
        slots: {
          default: () => h(MenuContent, null, { default: () => h(MenuItem, { value: 'one' }, () => 'One') }),
        },
        attachTo: document.body,
      });
    }).not.toThrow();

    await flush();
    // eslint-disable-next-line no-console
    console.log('MENU HTML:', document.body.innerHTML.slice(0, 400));
  });
});
