import { describe, expect, it } from 'vitest';
import ChatMessage from '..';
import { chatText, flush, mountChat, textContent } from '../../test/helpers';

describe('ChatMessage', () => {
  describe('props', () => {
    it('renders content and responds to updates', async () => {
      const wrapper = mountChat(ChatMessage, { props: { role: 'user', content: [textContent('first message')] } });
      await flush();
      expect(chatText(wrapper.element)).toContain('first message');
      await wrapper.setProps({ content: [textContent('updated message')] });
      await flush();
      expect(chatText(wrapper.element)).toContain('updated message');
      expect(chatText(wrapper.element)).not.toContain('first message');
    });
  });

  describe('slots', () => {
    it('renders custom message content', async () => {
      const wrapper = mountChat(ChatMessage, {
        props: { role: 'user' },
        slots: { content: '<span>custom body</span>' },
      });
      await flush();
      expect(chatText(wrapper.element)).toContain('custom body');
    });
  });
});
