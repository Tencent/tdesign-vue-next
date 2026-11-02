/* eslint-disable vue/one-component-per-file */
import { describe, expect, it } from 'vitest';
import { defineComponent, ref } from 'vue';
import ChatItem from '..';
import { chatText, flush, mountChat } from '../../test/helpers';

describe('ChatItem', () => {
  describe('props', () => {
    it('renders a content render function', () => {
      const wrapper = mountChat(ChatItem, { props: { content: () => <span>rendered body</span> } });
      expect(wrapper.text()).toContain('rendered body');
    });

    it.each(['user', 'assistant', 'error', 'model-change', 'system'])('applies the %s role', (role) => {
      const wrapper = mountChat(ChatItem, { props: { role } });
      expect(wrapper.classes()).toContain(role);
    });

    it.each(['base', 'outline', 'text'])('applies the %s variant', (variant) => {
      const wrapper = mountChat(ChatItem, { props: { variant } });
      expect(wrapper.classes()).toContain('t-chat__text--variant--' + variant);
    });

    it('renders name, datetime and avatar', () => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'user', name: '张三', datetime: '2024-01-01', avatar: 'https://example.com/a.png' },
      });
      expect(wrapper.text()).toContain('张三');
      expect(wrapper.text()).toContain('2024-01-01');
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/a.png');
    });

    it('renders content and responds to updates', async () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'user', content: 'first message' } });
      expect(wrapper.text()).toContain('first message');
      await wrapper.setProps({ content: 'updated message' });
      expect(wrapper.text()).toContain('updated message');
      expect(wrapper.text()).not.toContain('first message');
    });

    it('replaces the message with a loading indicator through textLoading', async () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'user', content: 'message', textLoading: true } });
      await flush();
      expect(chatText(wrapper.element)).not.toContain('message');
      await wrapper.setProps({ textLoading: false });
      await flush();
      expect(chatText(wrapper.element)).toContain('message');
    });
  });

  describe('slots', () => {
    it('renders content, avatar, name and datetime slots', () => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'user' },
        slots: {
          content: '<span>custom body</span>',
          avatar: '<span>custom avatar</span>',
          name: '<span>custom name</span>',
          datetime: '<span>custom time</span>',
        },
      });
      ['custom body', 'custom avatar', 'custom name', 'custom time'].forEach((text) => {
        expect(wrapper.text()).toContain(text);
      });
    });

    it.each(['actionbar', 'actions'])('renders the %s action slot', (slot) => {
      const wrapper = mountChat(ChatItem, {
        props: { role: 'assistant' },
        slots: { [slot]: '<button>custom action</button>' },
      });
      expect(wrapper.find('button').text()).toBe('custom action');
    });
  });

  describe('scenarios', () => {
    describe('content prop and slot', () => {
      it('prefers the slot and falls back to the prop when the slot becomes empty', async () => {
        const showSlot = ref(true);
        const content = ref('prop body');
        const Host = defineComponent({
          setup: () => () =>
            (
              <ChatItem
                role="user"
                content={content.value}
                v-slots={{ content: () => (showSlot.value ? <span>slot body</span> : null) }}
              />
            ),
        });
        const wrapper = mountChat(Host);
        expect(wrapper.text()).toContain('slot body');
        expect(wrapper.text()).not.toContain('prop body');
        showSlot.value = false;
        await flush();
        expect(wrapper.text()).toContain('prop body');
        expect(wrapper.text()).not.toContain('slot body');
        content.value = 'updated prop';
        await flush();
        expect(wrapper.text()).toContain('updated prop');
      });
    });
  });
});
