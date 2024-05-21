/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils';
import Tree from 'tdesign-vue-next'
import { defineComponent } from './adapt';
import { delay } from './kit';

describe('Tree:init', () => {
  vi.useRealTimers();
  describe(':props.data', () => {
    it('传递空数据时，展示兜底界面', async () => {
      const wrapper = mount(
        defineComponent({
          components: {
            Tree,
          },
          // 使用 template 写法是为了 vue2, vue3 统一测试用例
          template: [
            '<Tree',
            'ref="tree"',
            ':transition="false"',
            ':data="null"',
            '><template #empty><div class="tree-empty">暂无数据</div></template></Tree>',
          ].join(' '),
        }),
      );
      await delay(1);
      expect(wrapper.find('.tree-empty').exists()).toBe(true);
    });

    it('空数据初始化后，允许插入根节点', () =>
      new Promise((resolve) => {
        const wrapper = mount(
          defineComponent({
            components: {
              Tree,
            },
            mounted() {
              const { tree } = this.$refs;
              tree.appendTo('', {
                value: 'insert1',
              });
              setTimeout(() => {
                expect(wrapper.find('.tree-empty').exists()).toBe(false);
                expect(wrapper.find('[data-value="insert1"]').exists()).toBe(true);
                resolve();
              });
            },
            template: [
              '<Tree',
              'ref="tree"',
              ':transition="false"',
              ':data="null"',
              '><template #empty><div class="tree-empty">暂无数据</div></template></Tree>',
            ].join(' '),
          }),
        );
      }));

    it('可以传递一个树结构的数据来完成初始化', () => {
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
      const wrapper = mount(
        defineComponent({
          components: {
            Tree,
          },
          data() {
            return {
              items: data,
            };
          },
          template: [
            '<Tree',
            'ref="tree"',
            ':transition="false"',
            ':data="items"',
            '><template #empty><div class="tree-empty">暂无数据</div></template></Tree>',
          ].join(' '),
        }),
      );
      expect(wrapper.find('.tree-empty').exists()).toBe(false);
      expect(wrapper.find('[data-value="t1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t2"]').exists()).toBe(true);
    });
  });
});
