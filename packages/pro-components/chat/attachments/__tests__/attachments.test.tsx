import { describe, expect, it, vi } from 'vitest';
import Attachments from '..';
import { chatText, findInChat, flush, mountChat } from '../../test/helpers';

describe('Attachments', () => {
  describe('props', () => {
    it('renders file names and responds to items updates', async () => {
      const wrapper = mountChat(Attachments, { props: { items: [{ key: 'report', name: 'report.pdf', size: 1024 }] } });
      await flush();
      expect(chatText(wrapper.element)).toContain('report.pdf');
      await wrapper.setProps({ items: [] });
      await flush();
      expect(chatText(wrapper.element)).not.toContain('report.pdf');
    });
  });

  describe('events', () => {
    it('reports the removed file through onRemove', async () => {
      const item = { key: 'report', name: 'report.pdf', size: 1024 };
      const onRemove = vi.fn();
      const wrapper = mountChat(Attachments, { props: { items: [item], removable: true, onRemove } });
      await flush();
      const remove = findInChat(wrapper.element, '.t-filecard-remove')[0];
      expect(remove).toBeDefined();
      remove.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      expect(onRemove).toHaveBeenCalledTimes(1);
      expect(onRemove.mock.calls[0][0].detail).toMatchObject(item);
    });
  });
});
