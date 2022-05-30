import { mount } from '@vue/test-utils';
import { useRealTimers } from 'vitest';
import Tree from '@/src/tree/index.ts';
import { delay } from './kit';

describe('Tree:filter', () => {
  useRealTimers();
  describe(':props.filter', () => {
    it('数据可过滤展示', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
            {
              value: 't1.2',
            },
          ],
        },
      ];

      const wrapper = mount({
        data() {
          return {
            filter: null,
          };
        },
        created() {
          this.filter = (node) => node.value.indexOf('2') >= 0;
        },
        render() {
          return <Tree data={data} expandAll filter={this.filter}></Tree>;
        },
      });

      await delay(10);

      const t1 = wrapper.find('[data-value="t1"]');
      let t1d1 = wrapper.find('[data-value="t1.1"]');
      const t1d2 = wrapper.find('[data-value="t1.2"]');

      // t1.2 被命中, t1 被锁定, t1.1 隐藏
      expect(t1.exists()).toBe(true);
      expect(t1.classes('t-tree__item--visible')).toBe(true);
      expect(t1.classes('t-is-disabled')).toBe(true);
      expect(t1d1.exists()).toBe(false);
      expect(t1d2.classes('t-tree__item--visible')).toBe(true);

      await wrapper.setData({
        filter: (node) => node.value.indexOf('1.1') >= 0,
      });

      await delay(10);

      // t1.1 被命中, t1 被锁定, t1.2 隐藏
      t1d1 = wrapper.find('[data-value="t1.1"]');
      expect(t1d1.exists()).toBe(true);
      expect(t1d1.classes('t-tree__item--visible')).toBe(true);
      expect(t1d2.classes('t-tree__item--visible')).toBe(false);

      await wrapper.setData({
        filter: (node) => node.value.indexOf('1.3') >= 0,
      });
      await delay(10);

      // 无命中，全部隐藏
      expect(t1.classes('t-tree__item--visible')).toBe(false);
      expect(t1d1.classes('t-tree__item--visible')).toBe(false);
      expect(t1d2.classes('t-tree__item--visible')).toBe(false);

      await wrapper.setData({
        filter: null,
      });
      await delay(10);

      // 清除过滤器，全部显示
      expect(t1.classes('t-tree__item--visible')).toBe(true);
      expect(t1d1.classes('t-tree__item--visible')).toBe(true);
      expect(t1d2.classes('t-tree__item--visible')).toBe(true);
    });
  });
});
