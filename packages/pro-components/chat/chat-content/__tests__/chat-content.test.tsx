import { describe, expect, it } from 'vitest';
import ChatContent from '..';
import { mountChat } from '../../test/helpers';

describe('ChatContent', () => {
  describe('props', () => {
    it('renders user text literally and responds to content changes', async () => {
      const wrapper = mountChat(ChatContent, { props: { role: 'user', content: '<b>plain text</b>' } });
      expect(wrapper.text()).toContain('<b>plain text</b>');
      expect(wrapper.find('b').exists()).toBe(false);
      await wrapper.setProps({ content: 'updated text' });
      expect(wrapper.text()).toContain('updated text');
      expect(wrapper.text()).not.toContain('plain text');
    });

    it('renders structured text content', () => {
      const wrapper = mountChat(ChatContent, { props: { content: { type: 'text', data: 'structured text' } } });
      expect(wrapper.text()).toContain('structured text');
    });

    it('uses the selected Markdown engine for assistant content', () => {
      const wrapper = mountChat(ChatContent, {
        props: { role: 'assistant', content: '**answer**', markdownProps: { engine: 'marked', options: {} } },
      });
      expect(wrapper.find('strong').text()).toBe('answer');
    });
  });
});
