import { describe, expect, it, vi } from 'vitest';
import { h } from 'vue';
import ChatReasoning from '..';
import { flush, mountChat } from '../../test/helpers';

describe('ChatReasoning', () => {
  describe('props', () => {
    it.each(['left', 'right'] as const)('places the expand icon on the %s', (expandIconPlacement) => {
      const wrapper = mountChat(ChatReasoning, { props: { expandIconPlacement } });
      const icon = wrapper.find('.t-collapse-panel__icon');
      expect(icon.classes()).toContain('t-collapse-panel__icon--' + expandIconPlacement);
      expect(icon.classes()).not.toContain(
        't-collapse-panel__icon--' + (expandIconPlacement === 'left' ? 'right' : 'left'),
      );
      if (expandIconPlacement === 'right') expect(wrapper.element).toMatchSnapshot();
    });

    it.each(['border', 'block'] as const)('applies the %s layout', (layout) => {
      const wrapper = mountChat(ChatReasoning, { props: { layout } });
      expect(wrapper.find('.t-chat__detail-reasoning-border').exists()).toBe(layout === 'border');
      if (layout === 'border') expect(wrapper.element).toMatchSnapshot();
    });

    it('preserves the collapsed panel structure', () => {
      const wrapper = mountChat(ChatReasoning, { props: { collapsed: true } });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('hides and reveals content when controlled collapsed changes', async () => {
      const wrapper = mountChat(ChatReasoning, {
        props: { collapsed: true, collapsePanelProps: { content: h('span', { class: 'reasoning-body' }, 'details') } },
      });
      expect(wrapper.find('.reasoning-body').isVisible()).toBe(false);
      await wrapper.setProps({ collapsed: false });
      await flush();
      expect(wrapper.find('.reasoning-body').isVisible()).toBe(true);
    });

    it('uses defaultCollapsed as the initial state', () => {
      const wrapper = mountChat(ChatReasoning, {
        props: { defaultCollapsed: true },
        slots: { default: '<span class="reasoning-body">details</span>' },
      });
      expect(wrapper.find('.reasoning-body').isVisible()).toBe(false);
    });

    it('renders custom panel header and content', () => {
      const wrapper = mountChat(ChatReasoning, {
        props: { collapsePanelProps: { header: h('span', 'custom header'), content: h('span', 'custom details') } },
      });
      expect(wrapper.text()).toContain('custom header');
      expect(wrapper.text()).toContain('custom details');
    });
  });

  describe('events', () => {
    it('reports the new collapsed value when the header is clicked', async () => {
      const onExpandChange = vi.fn();
      const wrapper = mountChat(ChatReasoning, { props: { collapsed: false, onExpandChange } });
      await wrapper.find('.t-collapse-panel__header').trigger('click');
      await flush();
      expect(onExpandChange).toHaveBeenCalledWith(true);
      expect(wrapper.emitted('update:collapsed')).toEqual([[true]]);
    });
  });

  describe('slots', () => {
    it('preserves the default content structure', () => {
      const wrapper = mountChat(ChatReasoning, { slots: { default: '<div>custom content</div>' } });
      expect(wrapper.text()).toContain('custom content');
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders header and default content', () => {
      const wrapper = mountChat(ChatReasoning, {
        slots: { header: '<span>thinking header</span>', default: '<span>thinking details</span>' },
      });
      expect(wrapper.text()).toContain('thinking header');
      expect(wrapper.text()).toContain('thinking details');
    });
  });
});
