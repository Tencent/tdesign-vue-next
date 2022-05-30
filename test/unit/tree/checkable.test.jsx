import { mount } from '@vue/test-utils';
import { useRealTimers } from 'vitest';
import Tree from '@/src/tree/index.ts';
import { delay } from './kit';

describe('Tree:checkable', () => {
  useRealTimers();
  describe('props.checkable', () => {
    it('默认不显示复选框', () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree data={data} expandAll></Tree>;
        },
      });
      expect(wrapper.find('[data-value="t1"] input[type=checkbox]').exists()).toBe(false);
    });

    it('props.checkable 设置为 true, 节点显示复选框', () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree data={data} checkable expandAll></Tree>;
        },
      });
      expect(wrapper.find('[data-value="t1"] input[type=checkbox]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] input[type=checkbox]').exists()).toBe(true);
    });
  });

  describe('props.defaultValue', () => {
    it('设置 defaultValue 可初始化节点选中状态', async () => {
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
            value: ['t1.1'],
          };
        },
        render() {
          return <Tree data={data} checkable expandAll defaultValue={this.value}></Tree>;
        },
      });
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(false);
    });
  });

  describe('props.value', () => {
    it('设置 value 可控制节点选中状态', async () => {
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
            value: ['t1.1'],
          };
        },
        render() {
          return <Tree data={data} checkable expandAll value={this.value}></Tree>;
        },
      });
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(false);
    });

    it('value 受控，重设 value 会触发视图更新', async () => {
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
            value: [],
          };
        },
        render() {
          return <Tree data={data} checkable expandAll value={this.value}></Tree>;
        },
      });
      wrapper.setData({
        value: ['t1.2'],
      });
      await delay(10);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(true);
    });
  });

  describe('props.checkStrictly', () => {
    it('checkStrictly 设为 true，选中节点不会影响父节点状态', async () => {
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
        mounted() {
          const { tree } = this.$refs;
          tree.setItem('t1.2', {
            checked: true,
          });
        },
        render() {
          return <Tree ref="tree" data={data} checkable expandAll checkStrictly></Tree>;
        },
      });

      await delay(10);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(true);
    });
  });

  describe('props.valueMode', () => {
    it('valueMode="onlyLeaf"', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
              children: [
                {
                  value: 't1.1.1',
                },
              ],
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} checkable valueMode="onlyLeaf"></Tree>;
        },
      });

      await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked();
      const treeWrapper = wrapper.findComponent(Tree);
      const changeParams = treeWrapper.emitted().change[0];
      expect(changeParams[0]).toEqual(['t1.1.1']);
      expect(changeParams[1].node.value).toEqual('t1');
    });

    it('valueMode="all"', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
              children: [
                {
                  value: 't1.1.1',
                },
              ],
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} checkable valueMode="all"></Tree>;
        },
      });
      const treeWrapper = wrapper.findComponent(Tree);
      await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked();
      const changeParams = treeWrapper.emitted().change[0];
      expect(changeParams[0]).toEqual(['t1', 't1.1', 't1.1.1']);
      expect(changeParams[1].node.value).toEqual('t1');
    });

    it('valueMode="parentFirst"', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
              children: [
                {
                  value: 't1.1.1',
                },
              ],
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} checkable valueMode="parentFirst"></Tree>;
        },
      });
      const treeWrapper = wrapper.findComponent(Tree);
      await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked();
      const changeParams = treeWrapper.emitted().change[0];
      expect(changeParams[0]).toEqual(['t1']);
      expect(changeParams[1].node.value).toEqual('t1');
    });
  });
});
