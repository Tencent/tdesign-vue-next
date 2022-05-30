import { mount } from '@vue/test-utils';
import { useRealTimers } from 'vitest';
import Tree from '@/src/tree/index.ts';
import { delay } from './kit';

describe('Tree:api', () => {
  useRealTimers();
  describe('remove', () => {
    it('删除指定节点后，应当移除 dom 节点', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
          ],
        },
        {
          value: 't2',
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} expandAll />;
        },
      });
      expect(wrapper.find('[data-value="t1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t2"]').exists()).toBe(true);

      wrapper.vm.$refs.tree.remove('t2');
      await delay(10);

      expect(wrapper.find('[data-value="t2"]').exists()).toBe(false);
    });
  });
});
