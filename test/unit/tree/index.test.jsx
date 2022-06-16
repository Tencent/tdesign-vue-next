import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Tree from '@/src/tree/index.ts';

describe('Tree:init', () => {
  vi.useRealTimers();
  describe(':props.data', () => {
    it('传递空数据时，展示兜底界面', () => {
      const wrapper = mount({
        render() {
          return (
            <Tree
              data={null}
              v-slots={{
                empty: () => (
                  <div slot="empty" class="tree-empty">
                    暂无数据
                  </div>
                ),
              }}
            ></Tree>
          );
        },
      });
      expect(wrapper.find('.tree-empty').exists()).toBe(true);
    });

    it('空数据初始化后，允许插入根节点', () => {
      const wrapper = mount({
        mounted() {
          const { tree } = this.$refs;
          tree.appendTo('', {
            value: 'insert1',
          });
          setTimeout(() => {
            expect(wrapper.find('.tree-empty').exists()).toBe(false);
            expect(wrapper.find('[data-value="insert1"]').exists()).toBe(true);
          });
        },
        render() {
          return (
            <Tree ref="tree" data={null}>
              <div slot="empty" class="tree-empty">
                暂无数据
              </div>
            </Tree>
          );
        },
      });
    });

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
      const wrapper = mount({
        render() {
          return (
            <Tree data={data}>
              <div slot="empty" class="tree-empty">
                暂无数据
              </div>
            </Tree>
          );
        },
      });
      expect(wrapper.find('.tree-empty').exists()).toBe(false);
      expect(wrapper.find('[data-value="t1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t2"]').exists()).toBe(true);
    });
  });
});
