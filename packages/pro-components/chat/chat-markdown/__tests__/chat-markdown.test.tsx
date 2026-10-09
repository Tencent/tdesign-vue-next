import { describe, expect, it, vi } from 'vitest';
import ChatMarkdown from '..';
import { chatText, findInChat, mountChat } from '../../test/helpers';

describe('ChatMarkdown', () => {
  describe('scenarios', () => {
    it('保留 Markdown 格式并响应内容更新', async () => {
      const wrapper = mountChat(ChatMarkdown, { props: { content: '**加粗内容**' } });
      await vi.waitFor(() => {
        expect(findInChat(wrapper.element, 'strong').map((node) => node.textContent)).toContain('加粗内容');
      });
      await wrapper.setProps({ content: '[帮助链接](https://example.com/help)' });
      await vi.waitFor(() => {
        expect(findInChat(wrapper.element, 'a[href="https://example.com/help"]').length).toBeGreaterThan(0);
        expect(chatText(wrapper.element)).not.toContain('加粗内容');
      });
    });
  });
});
