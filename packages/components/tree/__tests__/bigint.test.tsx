// @ts-nocheck
import { enableAutoUnmount, mount } from '@vue/test-utils';

import Tree from '@tdesign/components/tree';
import { delay } from './kit';

enableAutoUnmount(afterEach);

// Tree 以 bigint 作为节点 value 时，节点查找与状态处理需要正常识别该类型，
// 否则 getNode 会返回 null，点击激活节点会触发 Cannot read properties of null (reading 'isActived')
describe('Tree', () => {
  vi.useRealTimers();

  const bigintData = [
    {
      value: 1n,
      children: [{ value: 2n }, { value: 3n }],
    },
    {
      value: 4n,
      children: [{ value: 5n }],
    },
  ];

  describe('instanceFunctions', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('可以使用 bigint 值查找节点（getItem / getIndex / getParent / getPath）', async () => {
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={bigintData} expandAll transition={false}></Tree>;
        },
      });
      await delay(3);
      const { tree } = wrapper.vm.$refs;

      expect(tree.getItem(2n).value).toBe(2n);
      expect(tree.getIndex(3n)).toBe(1);

      const parent = tree.getParent(2n);
      expect(parent.value).toBe(1n);

      const path = tree.getPath(3n);
      expect(path.map((node) => node.value)).toEqual([1n, 3n]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('getItems 可以获取指定 bigint 节点的全部子孙节点', async () => {
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={bigintData} expandAll transition={false}></Tree>;
        },
      });
      await delay(3);
      const { tree } = wrapper.vm.$refs;

      const items = tree.getItems(1n);
      expect(items.map((node) => node.value)).toEqual([1n, 2n, 3n]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('getTreeData 可以获取 bigint 节点的树形结构', async () => {
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={bigintData} expandAll transition={false}></Tree>;
        },
      });
      await delay(3);
      const { tree } = wrapper.vm.$refs;

      const treeData = tree.getTreeData();
      expect(treeData.map((item) => item.value)).toEqual([1n, 4n]);
      expect(treeData[0].children.map((item) => item.value)).toEqual([2n, 3n]);
    });
  });

  describe('scenarios', () => {
    describe('bigint activation', () => {
      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('setItem 使用 bigint 值激活节点不会报错', async () => {
        const wrapper = mount({
          render() {
            return <Tree ref="tree" data={bigintData} activable expandAll transition={false}></Tree>;
          },
        });
        await delay(3);
        const { tree } = wrapper.vm.$refs;

        tree.setItem(2n, { actived: true });
        await delay(3);
        expect(tree.getItem(2n).actived).toBe(true);
        expect(wrapper.find('[data-value="2"]').classes('t-is-active')).toBe(true);

        tree.setItem(2n, { actived: false });
        await delay(3);
        expect(tree.getItem(2n).actived).toBe(false);
        expect(wrapper.find('[data-value="2"]').classes('t-is-active')).toBe(false);
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('点击 bigint 节点可以正常激活（不会触发 null 读取错误）', async () => {
        const wrapper = mount({
          data() {
            return {
              actived: [],
            };
          },
          render() {
            return (
              <Tree
                ref="tree"
                data={bigintData}
                activable
                actived={this.actived}
                onActive={(value) => {
                  this.actived = value;
                }}
                expandAll
                transition={false}
              ></Tree>
            );
          },
        });
        await delay(3);

        await wrapper.find('[data-value="2"] .t-tree__label').trigger('click');
        await delay(3);

        expect(wrapper.vm.actived).toEqual([2n]);
        expect(wrapper.find('[data-value="2"]').classes('t-is-active')).toBe(true);
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('defaultActived 支持 bigint 值', async () => {
        const wrapper = mount({
          render() {
            return <Tree data={bigintData} activable defaultActived={[2n]} expandAll transition={false}></Tree>;
          },
        });
        await delay(3);
        expect(wrapper.find('[data-value="2"]').classes('t-is-active')).toBe(true);
      });
    });
  });

  describe('instanceFunctions', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('setItem / toggle 使用 bigint 值展开节点', async () => {
      const data = [
        {
          value: 1n,
          children: [{ value: 2n }],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={data} activable transition={false}></Tree>;
        },
      });
      await delay(3);
      const { tree } = wrapper.vm.$refs;

      tree.setItem(1n, { expanded: true });
      await delay(3);
      expect(tree.getItem(1n).expanded).toBe(true);
      expect(wrapper.find('[data-value="2"]').classes('t-tree__item--visible')).toBe(true);
    });
  });

  describe('instanceFunctions', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('setItem / 点击复选框 使用 bigint 值选中节点', async () => {
      const wrapper = mount({
        render() {
          return <Tree ref="tree" data={bigintData} checkable expandAll transition={false}></Tree>;
        },
      });
      await delay(3);
      const { tree } = wrapper.vm.$refs;

      tree.setItem(2n, { checked: true });
      await delay(3);
      expect(tree.getItem(2n).checked).toBe(true);

      await wrapper.find('[data-value="3"] input[type="checkbox"]').setChecked();
      await delay(3);
      expect(tree.getItem(3n).checked).toBe(true);
    });
  });
});
