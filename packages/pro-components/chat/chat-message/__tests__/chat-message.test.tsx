import { chatText, expectEmitsContract, expectPropsContract, flush, mountChat, textContent } from '../../test/helpers';

import { describe, expect, it } from 'vitest';
import ChatMessage from '..';

describe('ChatMessage', () => {
  describe('props', () => {
    it('保留公开 props 契约', () => expectPropsContract('ChatMessage', ChatMessage));
  });

  describe('scenarios', () => {
    it('显示消息正文并支持 content 插槽覆盖', async () => {
      const wrapper = mountChat(ChatMessage, {
        props: { role: 'user', content: [textContent('用户消息正文')] },
      });
      await flush();
      expect(chatText(wrapper.element)).toContain('用户消息正文');
      const slotted = mountChat(ChatMessage, {
        props: { role: 'user', content: [textContent('原始正文')] },
        slots: { content: '<span>自定义消息正文</span>' },
      });
      await flush();
      expect(chatText(slotted.element)).toContain('自定义消息正文');
    });
  });
  describe('events', () => {
    it('保留公开 emits 契约', () => expectEmitsContract('ChatMessage', ChatMessage));
  });
});
