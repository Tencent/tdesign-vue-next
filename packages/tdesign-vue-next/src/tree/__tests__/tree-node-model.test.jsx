import { mount } from '@vue/test-utils';
import Tree from 'tdesign-vue-next'
import { delay } from './kit';

describe('Tree:treeNodeModel', () => {
  vi.useRealTimers();
  describe('#getLevel', () => {
    it('返回节点深度', async () => {
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
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1');
      const node2 = tree.getItem('t1.1');
      expect(node1.getLevel()).toBe(0);
      expect(node2.getLevel()).toBe(1);
    });
  });

  describe('#getIndex', () => {
    it('获取子节点序号', async () => {
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
        render() {
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      expect(tree.getItem('t1').getIndex()).toBe(0);
      expect(tree.getItem('t1.1').getIndex()).toBe(0);
      expect(tree.getItem('t1.2').getIndex()).toBe(1);
    });
  });

  describe('#isFirst', () => {
    it('是否为首节点', async () => {
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
        render() {
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      expect(tree.getItem('t1').isFirst()).toBeTruthy();
      expect(tree.getItem('t1.1').isFirst()).toBeTruthy();
      expect(tree.getItem('t1.2').isFirst()).toBeFalsy();
    });
  });

  describe('#isLast', () => {
    it('是否为末尾节点', async () => {
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
        render() {
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      expect(tree.getItem('t1').isLast()).toBeTruthy();
      expect(tree.getItem('t1.1').isLast()).toBeFalsy();
      expect(tree.getItem('t1.2').isLast()).toBeTruthy();
    });
  });

  describe('#isLeaf', () => {
    it('是否为叶节点', async () => {
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
        render() {
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      expect(tree.getItem('t1').isLeaf()).toBeFalsy();
      expect(tree.getItem('t1.2').isLeaf()).toBeTruthy();
    });
  });

  describe('#insertBefore', () => {
    it('向前插入数据', async () => {
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
        render() {
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1.2');
      node1.insertBefore({
        value: 't1.3',
      });
      await delay(1);
      const el = wrapper.find('[data-value="t1.3"]');
      expect(el.exists()).toBe(true);

      const root = tree.getItem('t1');
      const children = root.getChildren();
      expect(children.length).toBe(3);
      expect(children[1].value).toBe('t1.3');
    });
  });

  describe('#insertAfter', () => {
    it('向后插入数据', async () => {
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
            {
              value: 't1.4',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1.2');
      node1.insertAfter({
        value: 't1.3',
      });
      await delay(1);
      const el = wrapper.find('[data-value="t1.3"]');
      expect(el.exists()).toBe(true);

      const root = tree.getItem('t1');
      const children = root.getChildren();
      expect(children.length).toBe(4);
      expect(children[2].value).toBe('t1.3');
    });
  });

  describe('#appendData', () => {
    it('添加数据', async () => {
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
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1');
      const node2 = tree.getItem('t1.1');
      node1.appendData([
        {
          value: 't1.2',
          children: [
            {
              value: 't1.2.1',
            },
          ],
        },
        {
          value: 't1.3',
        },
      ]);
      node2.appendData({
        value: 't1.1.1',
      });
      await delay(1);
      const el1 = wrapper.find('[data-value="t1.2"]');
      const el2 = wrapper.find('[data-value="t1.3"]');
      const el3 = wrapper.find('[data-value="t1.1.1"]');
      const el4 = wrapper.find('[data-value="t1.2.1"]');
      expect(el1.exists()).toBe(true);
      expect(el2.exists()).toBe(true);
      expect(el3.exists()).toBe(true);
      expect(el4.exists()).toBe(true);
    });
  });

  describe('#getPath', () => {
    it('获取路径节点', async () => {
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
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1.1.1');
      const nodes = node1.getPath();
      expect(nodes.length).toBe(3);
      expect(nodes[0].value).toBe('t1');
      expect(nodes[1].value).toBe('t1.1');
      expect(nodes[2].value).toBe('t1.1.1');
    });
  });

  describe('#getParent', () => {
    it('获取指定节点的父节点', async () => {
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
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1.1.1');
      const parent1 = node1.getParent();
      const parent2 = parent1.getParent();
      const parent3 = parent2.getParent();

      expect(parent1.value).toBe('t1.1');
      expect(parent2.value).toBe('t1');
      expect(parent3).toBeUndefined();
    });
  });

  describe('#getParents', () => {
    it('获取所有父节点', async () => {
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
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1.1.1');
      const parents = node1.getParents();
      expect(parents.length).toBe(2);
      expect(parents[0].value).toBe('t1.1');
      expect(parents[1].value).toBe('t1');
    });
  });

  describe('#getRoot', () => {
    it('获取根节点', async () => {
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
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1.1.1');
      const root = node1.getRoot();
      expect(root.value).toBe('t1');
    });
  });

  describe('#getSiblings', () => {
    it('获取兄弟节点', async () => {
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
        {
          value: 't2',
        },
        {
          value: 't3',
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1');
      const node2 = tree.getItem('t1.1');
      const n1siblings = node1.getSiblings();
      const n2siblings = node2.getSiblings();
      expect(n1siblings.length).toBe(3);
      expect(n1siblings[2].value).toBe('t3');
      expect(n2siblings.length).toBe(2);
      expect(n2siblings[1].value).toBe('t1.2');
    });
  });

  describe('#getChildren', () => {
    it('返回基本子节点', async () => {
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
            {
              value: 't1.2',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1');
      const children = node1.getChildren();
      expect(children.length).toBe(2);
      expect(children[1].value).toBe('t1.2');
    });

    it('返回所有子节点', async () => {
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
            {
              value: 't1.2',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      const node1 = tree.getItem('t1');
      const children = node1.getChildren(true);
      expect(children.length).toBe(3);
      expect(children[1].value).toBe('t1.1.1');
    });
  });

  describe('#remove', () => {
    it('不传参删除节点', async () => {
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
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
      const node = wrapper.vm.$refs.tree.getItem('t1.1');
      node.remove();
      await delay(1);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
    });

    it('传参删除节点', async () => {
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
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
      const node = wrapper.vm.$refs.tree.getItem('t1');
      node.remove('t1.1');
      await delay(1);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
    });

    it('删除不存在的节点', async () => {
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
          return <Tree transition={false} ref="tree" data={data} expandAll={true}></Tree>;
        },
      });
      const node = wrapper.vm.$refs.tree.getItem('t1');
      // 这会产生一个警告信息
      node.remove('t1.2');
      await delay(1);
      // 应确保不影响正常节点
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
    });
  });

  describe('#setData', () => {
    it('设置节点数据', async () => {
      const data = [
        {
          value: 't1',
          info: 'a',
          children: [
            {
              value: 't1.1',
              info: 'b',
            },
          ],
        },
      ];
      const wrapper = mount({
        methods: {
          label(createElement, node) {
            return `${node.value}-${node.data.info}`;
          },
        },
        render() {
          return <Tree transition={false} ref="tree" label={this.label} data={data} expandAll={true}></Tree>;
        },
      });
      const el = wrapper.find('[data-value="t1.1"]');
      expect(el.text()).toBe('t1.1-b');
      const node = wrapper.vm.$refs.tree.getItem('t1.1');
      node.setData({
        info: 'c',
      });
      await delay(1);
      expect(el.text()).toBe('t1.1-c');
    });
  });
});
