import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import ChatThinking from '../chat-thinking';

// 此处验证 Vue 到自定义元素的插槽及事件转发，底层渲染由 Web Components 测试覆盖。
vi.mock('@tdesign/web-components-chat/chat-message', () => ({}));

describe('ChatThinking', () => {
  describe('slots', () => {
    it('forwards a custom icon without replacing the content slot', () => {
      const wrapper = mount(ChatThinking, {
        slots: {
          icon: () => h('span', { 'data-test': 'icon' }, 'Custom icon'),
          content: () => h('p', 'Custom content'),
        },
      });

      expect(wrapper.get('[slot="icon"]').text()).toBe('Custom icon');
      expect(wrapper.get('[slot="content"]').text()).toBe('Custom content');
      wrapper.unmount();
    });

    it.each(['pending', 'complete', 'error', 'stop'] as const)(
      'does not create an empty icon slot for status %s',
      (status) => {
        const wrapper = mount(ChatThinking, { props: { status } });

        expect(wrapper.find('[slot="icon"]').exists()).toBe(false);
        wrapper.unmount();
      },
    );

    it('keeps default content when a custom icon is provided', () => {
      const wrapper = mount(ChatThinking, {
        slots: {
          icon: () => h('span', 'Custom icon'),
          default: () => h('p', 'Default content'),
        },
      });

      expect(wrapper.get('[slot="content"]').text()).toBe('Default content');
      wrapper.unmount();
    });
  });

  describe('scenarios', () => {
    it('updates the custom icon with reactive state', async () => {
      const state = ref('pending');
      const wrapper = mount(ChatThinking, { slots: { icon: () => h('span', state.value) } });

      state.value = 'complete';
      await nextTick();

      expect(wrapper.get('[slot="icon"]').text()).toBe('complete');
      expect(wrapper.findAll('[slot="icon"]')).toHaveLength(1);
      wrapper.unmount();
    });

    it('preserves icon clicks, collapsed events and controlled updates', async () => {
      const onClick = vi.fn();
      const onCollapsedChange = vi.fn();
      const wrapper = mount(ChatThinking, {
        props: { collapsed: false },
        attrs: { onCollapsedChange },
        slots: { icon: () => h('span', { onClick }, 'Custom icon') },
      });
      const element = wrapper.get('t-chat-thinking-content').element;

      await wrapper.get('[slot="icon"]').trigger('click');
      expect(onClick).toHaveBeenCalledOnce();
      const event = new CustomEvent('collapsedChange', { detail: true });
      element.dispatchEvent(event);
      expect(onCollapsedChange).toHaveBeenCalledOnce();
      expect(onCollapsedChange).toHaveBeenCalledWith(event);

      await wrapper.setProps({ collapsed: true });
      expect(element.getAttribute('collapsed')).toBe('true');
      expect(wrapper.get('[slot="icon"]').text()).toBe('Custom icon');
      wrapper.unmount();
    });
  });
});
