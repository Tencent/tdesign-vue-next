import { describe, expect, it } from 'vitest';
import ChatThinking from '..';
import { chatText, flush, mountChat } from '../../test/helpers';

describe('ChatThinking', () => {
  describe('slots', () => {
    it('renders custom thinking content', async () => {
      const wrapper = mountChat(ChatThinking, {
        props: { status: 'complete', collapsed: false },
        slots: { content: '<span>thinking details</span>' },
      });
      await flush();
      expect(chatText(wrapper.element)).toContain('thinking details');
    });
  });
});
