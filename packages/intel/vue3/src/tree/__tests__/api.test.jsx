import { mount } from '@vue/test-utils';
import Tree from 'tdesign-vue-next'
import { delay, step } from './kit';

describe('Tree:api', () => {
  vi.useRealTimers();

  // tree.remove
  // 删除 tree 的指定节点
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
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
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

  // tree.getItem
  // 获取 tree 的目标节点
  describe('getItem', () => {
    it('可以获取目标节点，得到 treeNodeModel', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;
      const t1d1 = tree.getItem('t1.1');
      expect(t1d1.value).toBe('t1.1');
    });
  });

  // tree.getItems
  // 获取符合条件的所有节点
  describe('getItems', () => {
    it('可以获取目标节点，得到 treeNodeModel', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;
      const items = tree.getItems('t1.1');
      expect(Array.isArray(items)).toBe(true);
      expect(items[0].value).toBe('t1.1');
    });
  });

  // tree.setItem
  // 设置节点属性
  describe('setItem', () => {
    it('可以设置节点属性 label，触发视图更新', async () => {
      const data = [
        {
          label: 't1',
          value: 't1',
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      expect(wrapper.find('[data-value="t1"]').text()).toBe('t1');

      const { tree } = wrapper.vm.$refs;
      tree.setItem('t1', {
        label: '节点1',
      });
      const t1 = tree.getItem('t1');
      expect(t1.label).toBe('节点1');
      await delay(10);
      expect(wrapper.find('[data-value="t1"]').text()).toBe('节点1');
    });

    it('mounted 生命周期初始化数据, 在 nextTick 触发视图更新', async () => {
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
          children: [
            {
              value: 't2.1',
            },
          ],
        },
      ];

      const step1 = step();
      let count = 0;
      const wrapper = mount({
        data() {
          return {
            items: [],
            checked: [],
          };
        },
        mounted() {
          this.items = data;
          this.onInit();
        },
        methods: {
          onInit() {
            const { tree } = this.$refs;
            this.$nextTick(() => {
              tree.setItem('t1', {
                checked: true,
              });
              const items = tree.getItems();
              count = items.length;
              step1.ready();
            });
          },
        },
        render() {
          return <Tree ref="tree" expandAll checkable transition={false} data={this.items} v-model={this.checked} />;
        },
      });

      await step1;
      await delay(1);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t2"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t2.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(count).toBe(4);
    });

    it('可以设置节点属性 checked, 触发视图更新', async () => {
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
          children: [
            {
              value: 't2.1',
            },
          ],
        },
      ];
      let changeParams = null;
      let changeCount = 0;
      const onChange = (checked, context) => {
        changeCount += 1;
        changeParams = {
          checked,
          context,
        };
      };
      const wrapper = mount({
        data() {
          return {
            checked: [],
          };
        },
        render() {
          return (
            <Tree
              ref="tree"
              expandAll
              checkable
              transition={false}
              data={data}
              v-model={this.checked}
              onChange={onChange}
            />
          );
        },
      });

      await delay(1);
      const { tree } = wrapper.vm.$refs;
      tree.setItem('t1', {
        checked: true,
      });
      tree.setItem('t2', {
        checked: true,
      });

      expect(wrapper.vm.checked.length).toBe(2);
      expect(wrapper.vm.checked[0]).toBe('t1.1');
      expect(wrapper.vm.checked[1]).toBe('t2.1');
      await delay(1);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t2"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t2.1"] .t-checkbox').classes('t-is-checked')).toBe(true);

      expect(changeCount).toBe(2);
      expect(changeParams.checked.length).toBe(2);
      expect(changeParams.checked[0]).toBe('t1.1');
      expect(changeParams.checked[1]).toBe('t2.1');
      expect(changeParams.context.node.value).toEqual('t2');
    });

    it('可以设置节点属性 expanded, 触发视图更新', async () => {
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
          children: [
            {
              value: 't2.1',
            },
          ],
        },
      ];

      let expandParams = null;
      let expandCount = 0;
      const onExpand = (expanded, context) => {
        expandCount += 1;
        expandParams = {
          expanded,
          context,
        };
      };
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} onExpand={onExpand} />;
        },
      });

      await delay(1);
      const { tree } = wrapper.vm.$refs;
      tree.setItem('t1', {
        expanded: true,
      });
      tree.setItem('t2', {
        expanded: true,
      });
      await delay(1);
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      expect(t1d1.exists()).toBe(true);
      expect(t1d1.classes('t-tree__item--visible')).toBe(true);
      const t2d1 = wrapper.find('[data-value="t2.1"]');
      expect(t2d1.exists()).toBe(true);
      expect(t2d1.classes('t-tree__item--visible')).toBe(true);

      expect(expandCount).toBe(2);
      expect(expandParams.expanded.length).toBe(2);
      expect(expandParams.expanded[0]).toBe('t1');
      expect(expandParams.expanded[1]).toBe('t2');
      expect(expandParams.context.node.value).toEqual('t2');
    });

    it('可以设置节点属性 actived, 触发视图更新', async () => {
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
          children: [
            {
              value: 't2.1',
            },
          ],
        },
      ];

      let activeParams = null;
      let activeCount = 0;
      const onActive = (actived, context) => {
        activeCount += 1;
        activeParams = {
          actived,
          context,
        };
      };
      const wrapper = mount({
        render() {
          return <Tree ref="tree" activable expandAll transition={false} data={data} onActive={onActive} />;
        },
      });

      await delay(1);
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      const t2d1 = wrapper.find('[data-value="t2.1"]');

      const { tree } = wrapper.vm.$refs;
      tree.setItem('t1.1', {
        actived: true,
      });
      expect(activeCount).toBe(1);
      expect(activeParams.actived.length).toBe(1);
      expect(activeParams.actived[0]).toBe('t1.1');
      expect(activeParams.context.node.value).toEqual('t1.1');
      await delay(1);
      expect(t1d1.classes('t-is-active')).toBe(true);

      tree.setItem('t2.1', {
        actived: true,
      });
      expect(activeCount).toBe(2);
      expect(activeParams.actived.length).toBe(1);
      expect(activeParams.actived[0]).toBe('t2.1');
      expect(activeParams.context.node.value).toEqual('t2.1');
      await delay(1);
      expect(t2d1.classes('t-is-active')).toBe(true);
    });
  });

  // tree.appendTo
  // 为一个节点追加子节点
  describe('appendTo', () => {
    it('为根节点追加子节点', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;
      tree.appendTo('t1', {
        value: 't1.2',
      });

      await delay(10);
      expect(wrapper.find('[data-value="t1.2"]').exists()).toBe(true);

      // 可批量追加节点
      tree.appendTo('t1', [
        {
          value: 't1.3',
        },
        {
          value: 't1.4',
        },
      ]);
      await delay(10);

      expect(wrapper.find('[data-value="t1.3"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.4"]').exists()).toBe(true);
    });

    it('为子节点追加子节点', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      // 可批量追加节点
      tree.appendTo('t1.1', [
        {
          value: 't1.1.1',
        },
        {
          value: 't1.1.2',
        },
      ]);
      await delay(10);

      expect(wrapper.find('[data-value="t1.1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1.2"]').exists()).toBe(true);
    });
  });

  // tree.insertBefore
  // 将节点插入到一个节点之前
  describe('insertBefore', () => {
    it('新节点插入到之前', async () => {
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
              value: 't1.3',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      tree.insertBefore('t1.2', {
        value: 't1.i',
      });

      const t1 = tree.getItem('t1');
      const t1d1 = tree.getItem('t1.1');
      const t1d2 = tree.getItem('t1.2');
      const t1d3 = tree.getItem('t1.3');
      const t1di = tree.getItem('t1.i');

      expect(t1.getChildren().length).toBe(4);
      expect(t1d1.getIndex()).toBe(0);
      expect(t1d2.getIndex()).toBe(2);
      expect(t1d3.getIndex()).toBe(3);
      expect(t1di.getIndex()).toBe(1);

      await delay(10);

      expect(wrapper.find('[data-value="t1.i"]').exists()).toBe(true);
    });

    it('已存后置节点插入到之前', async () => {
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
              value: 't1.3',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const t1 = tree.getItem('t1');
      const t1d1 = tree.getItem('t1.1');
      const t1d2 = tree.getItem('t1.2');
      const t1d3 = tree.getItem('t1.3');

      tree.insertBefore('t1.2', t1d3);

      expect(t1.getChildren().length).toBe(3);
      expect(t1d1.getIndex()).toBe(0);
      expect(t1d2.getIndex()).toBe(2);
      expect(t1d3.getIndex()).toBe(1);
    });

    it('已存后置节点插入到最前', async () => {
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
              value: 't1.3',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const t1 = tree.getItem('t1');
      const t1d1 = tree.getItem('t1.1');
      const t1d2 = tree.getItem('t1.2');
      const t1d3 = tree.getItem('t1.3');

      tree.insertBefore('t1.1', t1d2);

      expect(t1.getChildren().length).toBe(3);
      expect(t1d1.getIndex()).toBe(1);
      expect(t1d2.getIndex()).toBe(0);
      expect(t1d3.getIndex()).toBe(2);
    });

    it('已存前置节点插入到之前', async () => {
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
              value: 't1.3',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const t1 = tree.getItem('t1');
      const t1d1 = tree.getItem('t1.1');
      const t1d2 = tree.getItem('t1.2');
      const t1d3 = tree.getItem('t1.3');

      tree.insertBefore('t1.3', t1d1);

      expect(t1.getChildren().length).toBe(3);
      expect(t1d1.getIndex()).toBe(1);
      expect(t1d2.getIndex()).toBe(0);
      expect(t1d3.getIndex()).toBe(2);
    });
  });

  // tree.insertAfter
  // 将节点插入到一个节点之后
  describe('insertAfter', () => {
    it('新节点插入到之后', async () => {
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
              value: 't1.3',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      tree.insertAfter('t1.2', {
        value: 't1.i',
      });

      const t1 = tree.getItem('t1');
      const t1d1 = tree.getItem('t1.1');
      const t1d2 = tree.getItem('t1.2');
      const t1d3 = tree.getItem('t1.3');
      const t1di = tree.getItem('t1.i');

      expect(t1.getChildren().length).toBe(4);
      expect(t1d1.getIndex()).toBe(0);
      expect(t1d2.getIndex()).toBe(1);
      expect(t1d3.getIndex()).toBe(3);
      expect(t1di.getIndex()).toBe(2);

      await delay(10);

      expect(wrapper.find('[data-value="t1.i"]').exists()).toBe(true);
    });

    it('已存前置节点插入到之后', async () => {
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
              value: 't1.3',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const t1 = tree.getItem('t1');
      const t1d1 = tree.getItem('t1.1');
      const t1d2 = tree.getItem('t1.2');
      const t1d3 = tree.getItem('t1.3');

      tree.insertAfter('t1.2', t1d1);

      expect(t1.getChildren().length).toBe(3);
      expect(t1d1.getIndex()).toBe(1);
      expect(t1d2.getIndex()).toBe(0);
      expect(t1d3.getIndex()).toBe(2);
    });

    it('已存后置节点插入到之后', async () => {
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
              value: 't1.3',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const t1 = tree.getItem('t1');
      const t1d1 = tree.getItem('t1.1');
      const t1d2 = tree.getItem('t1.2');
      const t1d3 = tree.getItem('t1.3');

      tree.insertAfter('t1.1', t1d3);

      expect(t1.getChildren().length).toBe(3);
      expect(t1d1.getIndex()).toBe(0);
      expect(t1d2.getIndex()).toBe(2);
      expect(t1d3.getIndex()).toBe(1);
    });

    it('已存前置节点插入到末尾', async () => {
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
              value: 't1.3',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const t1 = tree.getItem('t1');
      const t1d1 = tree.getItem('t1.1');
      const t1d2 = tree.getItem('t1.2');
      const t1d3 = tree.getItem('t1.3');

      tree.insertAfter('t1.3', t1d1);

      expect(t1.getChildren().length).toBe(3);
      expect(t1d1.getIndex()).toBe(2);
      expect(t1d2.getIndex()).toBe(0);
      expect(t1d3.getIndex()).toBe(1);
    });
  });

  // tree.getIndex
  // 获取一个节点在子节点数组中的序号
  describe('getIndex', () => {
    it('获取节点在数组中的序号', async () => {
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
              value: 't1.3',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const index = tree.getIndex('t1.2');
      expect(index).toBe(1);
    });
  });

  // tree.getParent
  // 获取节点的父节点
  describe('getParent', () => {
    it('获取节点的父节点', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const pnode = tree.getParent('t1.1.1');
      expect(pnode.value).toBe('t1.1');

      // 顶层节点没有父节点
      const ptop = tree.getParent('t1');
      expect(ptop).toBeUndefined();
    });

    it('获取不存在的节点点的父节点', async () => {
      const data = [
        {
          value: 't1',
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const pnode = tree.getParent('t1.1.1');
      expect(pnode).toBeUndefined();
    });
  });

  // tree.getParents
  // 获取节点的所有父节点
  describe('getParents', () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const pnodes = tree.getParents('t1.1.1');
      expect(Array.isArray(pnodes)).toBe(true);
      expect(pnodes.length).toBe(2);
      expect(pnodes[0].value).toBe('t1.1');
      expect(pnodes[1].value).toBe('t1');

      // 顶层节点没有父节点
      const ptops = tree.getParents('t1');
      expect(Array.isArray(ptops)).toBe(true);
      expect(ptops.length).toBe(0);
    });
  });

  // tree.getPath
  // 获取节点路径
  describe('getPath', () => {
    it('获取所有路径节点', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const pnodes = tree.getPath('t1.1.1');
      expect(Array.isArray(pnodes)).toBe(true);
      expect(pnodes.length).toBe(3);
      expect(pnodes[0].value).toBe('t1');
      expect(pnodes[1].value).toBe('t1.1');
      expect(pnodes[2].value).toBe('t1.1.1');
    });
  });

  // tree.getTreeData
  // 获取树结构数据
  describe('getTreeData', () => {
    it('获取树结构数据', async () => {
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
        {
          value: 't2',
          children: [
            {
              value: 't2.1',
              children: [
                {
                  value: 't2.1.1',
                },
              ],
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll={true} />;
        },
      });

      const { tree } = wrapper.vm.$refs;

      const pnodes = tree.getTreeData();
      expect(Array.isArray(pnodes)).toBe(true);
      expect(pnodes.length).toBe(2);
      expect(Array.isArray(pnodes[0].children)).toBe(true);
      expect(pnodes[0].children.length).toBe(1);
      expect(Array.isArray(pnodes[0].children[0].children)).toBe(true);
      expect(pnodes[0].children[0].children[0].value).toBe('t1.1.1');
      expect(pnodes[0].value).toBe('t1');
      expect(pnodes[1].value).toBe('t2');

      const tnodes = tree.getTreeData('t2.1');
      expect(Array.isArray(tnodes)).toBe(true);
      expect(tnodes.length).toBe(1);
      expect(Array.isArray(tnodes[0].children)).toBe(true);
      expect(tnodes[0].children.length).toBe(1);
      expect(tnodes[0].value).toBe('t2.1');
      expect(tnodes[0].children[0].value).toBe('t2.1.1');

      const nnodes = tree.getTreeData('t2.2');
      expect(Array.isArray(nnodes)).toBe(true);
      expect(nnodes.length).toBe(0);
    });
  });
});
