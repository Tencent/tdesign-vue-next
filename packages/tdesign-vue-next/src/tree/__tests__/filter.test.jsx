import { mount } from '@vue/test-utils';
import { Tree } from 'tdesign-vue-next';
import { defineComponent } from './adapt';
import { delay } from './kit';

describe('tree:filter', () => {
  vi.useRealTimers();
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

      const wrapper = mount(
        defineComponent({
          components: {
            Tree,
          },
          data() {
            return {
              items: data,
              filter: null,
            };
          },
          created() {
            this.filter = node => node.value.includes('2');
          },
          // 使用 template 写法是为了 vue2, vue3 统一测试用例
          template: [
            '<Tree',
            'ref="tree"',
            'expandAll',
            ':transition="false"',
            ':data="items"',
            ':filter="this.filter"',
            '><template #empty><div class="tree-empty">暂无数据</div></template></Tree>',
          ].join(' '),
        }),
      );

      await delay(10);

      const t1 = wrapper.find('[data-value="t1"]');
      let t1d1 = wrapper.find('[data-value="t1.1"]');
      let t1d2 = wrapper.find('[data-value="t1.2"]');

      // t1.2 被命中, t1 被锁定, t1.1 隐藏
      expect(t1.exists()).toBe(true);
      expect(t1.classes('t-tree__item--visible')).toBe(true);
      expect(t1.classes('t-is-disabled')).toBe(true);
      expect(t1d1.exists()).toBe(false);
      expect(t1d2.classes('t-tree__item--visible')).toBe(true);

      await wrapper.setData({
        filter: node => node.value.includes('1.1'),
      });

      await delay(10);

      // t1.1 被命中, t1 被锁定, t1.2 隐藏
      t1d1 = wrapper.find('[data-value="t1.1"]');
      expect(t1d1.exists()).toBe(true);
      expect(t1d1.classes('t-tree__item--visible')).toBe(true);
      expect(t1d2.classes('t-tree__item--visible')).toBe(false);

      await wrapper.setData({
        filter: node => node.value.includes('1.3'),
      });
      await delay(10);

      // 无命中，则显示空元素
      expect(wrapper.find('.tree-empty').exists()).toBe(true);

      await wrapper.setData({
        filter: null,
      });
      await delay(20);

      // 清除过滤器，全部显示、空元素不显示
      t1d1 = wrapper.find('[data-value="t1.1"]');
      t1d2 = wrapper.find('[data-value="t1.2"]');
      expect(wrapper.find('.tree-empty').exists()).toBe(false);
      expect(t1.classes('t-tree__item--visible')).toBe(true);
      expect(t1d1.classes('t-tree__item--visible')).toBe(true);
      expect(t1d2.classes('t-tree__item--visible')).toBe(true);
    });
  });
});
