import { describe, expect, it, vi } from 'vitest';
import Attachments from '..';
import { chatText, findInChat, flush, mountChat } from '../../test/helpers';

describe('Attachments', () => {
  describe('scenarios', () => {
    it('渲染文件名并传回删除事件', async () => {
      const onRemove = vi.fn();
      const item = { key: 'report', name: '迁移报告.pdf', size: 1024 };
      const wrapper = mountChat(Attachments, { props: { items: [item], removable: true, onRemove } });
      await flush();
      expect(chatText(wrapper.element)).toContain('迁移报告.pdf');
      const remove = findInChat(wrapper.element, '.t-filecard-remove')[0];
      expect(remove).toBeDefined();
      remove.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
      await flush();
      expect(onRemove).toHaveBeenCalledTimes(1);
      expect(onRemove.mock.calls[0][0].detail).toMatchObject(item);
      await wrapper.setProps({ items: [] });
      await flush();
      expect(chatText(wrapper.element)).not.toContain('迁移报告.pdf');
    });
  });
});
