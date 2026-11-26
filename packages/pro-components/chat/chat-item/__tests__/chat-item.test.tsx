/* eslint-disable vue/one-component-per-file */
import { describe, expect, it, vi } from 'vitest';
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

    it('renders string reasoning and hides it when reasoning becomes false', async () => {
      const wrapper = mountChat(ChatItem, { props: { role: 'assistant', reasoning: '推理步骤' } });
      await flush();
      expect(chatText(wrapper.element)).toContain('推理步骤');
      await wrapper.setProps({ reasoning: false });
      await flush();
      expect(chatText(wrapper.element)).not.toContain('推理步骤');
    });

    it('renders object reasoning and invokes its onExpandChange callback', async () => {
      const onExpandChange = vi.fn();
      const wrapper = mountChat(ChatItem, {
        props: {
          role: 'assistant',
          reasoning: {
            expandIconPlacement: 'right',
            onExpandChange,
            collapsePanelProps: {
              header: <span>推理标题</span>,
              content: <span>自定义推理内容</span>,
            },
          },
        },
      });
      expect(wrapper.text()).toContain('推理标题');
      expect(wrapper.text()).toContain('自定义推理内容');
      expect(onExpandChange).not.toHaveBeenCalled();
      await wrapper.find('.t-collapse-panel__header').trigger('click');
      await flush();
      expect(onExpandChange).toHaveBeenCalledTimes(1);
      expect(onExpandChange).toHaveBeenCalledWith(true);
    });

    it('updates the reasoning header when reasoningLoading finishes', async () => {
      // reasoningLoading applies to the header of string reasoning for an assistant message.
      const wrapper = mountChat(ChatItem, {
        props: { role: 'assistant', reasoning: '推理步骤', reasoningLoading: true },
      });
      await flush();
      expect(chatText(wrapper.element)).toContain('思考中...');
      expect(chatText(wrapper.element)).not.toContain('已深度思考');
      await wrapper.setProps({ reasoningLoading: false });
      await flush();
      expect(chatText(wrapper.element)).toContain('已深度思考');
      expect(chatText(wrapper.element)).not.toContain('思考中...');
      expect(chatText(wrapper.element)).toContain('推理步骤');
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
    describe('message structure', () => {
      // Use public render/slot inputs to keep these baselines focused on ChatItem's own structure.
      it('preserves the user metadata and content structure', () => {
        const wrapper = mountChat(ChatItem, {
          props: {
            role: 'user',
            name: 'User',
            datetime: '2024-01-01 10:00',
            avatar: 'https://example.com/avatar.png',
            content: () => <span>User message</span>,
          },
        });
        expect(wrapper.text()).toContain('User message');
        expect(wrapper.element).toMatchSnapshot();
      });

      it('preserves the assistant content and actionbar slot structure', () => {
        const wrapper = mountChat(ChatItem, {
          props: { role: 'assistant' },
          slots: {
            content: '<span>Assistant message</span>',
            actionbar: '<button type="button">Custom action</button>',
          },
        });
        expect(wrapper.text()).toContain('Assistant message');
        expect(wrapper.find('button').text()).toBe('Custom action');
        expect(wrapper.element).toMatchSnapshot();
      });
    });

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
