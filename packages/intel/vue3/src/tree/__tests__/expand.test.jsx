import { mount } from '@vue/test-utils';
import { Tree } from 'tdesign-vue-next';
import { delay } from './kit';
import { ref } from './adapt';

describe('tree:expand', () => {
  vi.useRealTimers();
  describe('props.expandAll', () => {
    it('expandAll 设置为 true, 初始化之后所有节点应当为展开状态', () => {
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
          return <Tree transition={false} data={data} expandAll></Tree>;
        },
      });
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
    });

    it('默认 expandAll 设置为 false, 初始化之后，子节点应当为收起状态', () => {
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
          return <Tree transition={false} data={data}></Tree>;
        },
      });
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
    });
  });

  describe('props.defaultExpanded', () => {
    it('defaultExpanded 可指定展开节点', async () => {
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
      const wrapper = mount({
        render() {
          return <Tree transition={false} data={data} defaultExpanded={['t2']}></Tree>;
        },
      });

      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t2.1"]').exists()).toBe(true);
    });
  });

  describe('props.expanded', () => {
    it('设置 expanded 可指定展开节点', async () => {
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
      const wrapper = mount({
        render() {
          return <Tree transition={false} data={data} expanded={['t2']}></Tree>;
        },
      });

      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t2.1"]').exists()).toBe(true);
    });

    it('设置 expanded 可变更展开节点', async () => {
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
      const wrapper = mount({
        data() {
          return {
            expanded: ['t2'],
          };
        },
        render() {
          return <Tree data={data} expanded={this.expanded} transition={false}></Tree>;
        },
      });

      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t2.1"]').exists()).toBe(true);

      wrapper.setData({
        expanded: ['t1'],
      });
      await delay(10);

      const t1d1 = wrapper.find('[data-value="t1.1"]');
      expect(t1d1.exists()).toBe(true);
      expect(t1d1.classes('t-tree__item--visible')).toBe(true);

      const t2d1 = wrapper.find('[data-value="t2.1"]');
      expect(t2d1.exists()).toBe(true);
      expect(t2d1.classes('t-tree__item--visible')).toBe(false);
      expect(t2d1.classes('t-tree__item--hidden')).toBe(true);
    });

    it('操作 expanded 数组可变更展开节点', async () => {
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
      const refExpanded = ref(['t2']);
      const wrapper = mount({
        render() {
          return <Tree data={data} expanded={refExpanded.value} transition={false}></Tree>;
        },
      });

      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t2.1"]').exists()).toBe(true);

      await delay(1);

      let t1d1 = wrapper.find('[data-value="t1.1"]');
      const t2d1 = wrapper.find('[data-value="t2.1"]');
      expect(t1d1.exists()).toBe(false);
      expect(t2d1.exists()).toBe(true);
      expect(t2d1.classes('t-tree__item--visible')).toBe(true);
      expect(t2d1.classes('t-tree__item--hidden')).toBe(false);

      refExpanded.value.push('t1');
      await delay(1);
      t1d1 = wrapper.find('[data-value="t1.1"]');
      expect(t1d1.exists()).toBe(true);
      expect(t1d1.classes('t-tree__item--visible')).toBe(true);
      expect(t1d1.classes('t-tree__item--hidden')).toBe(false);

      refExpanded.value.shift();
      await delay(1);
      expect(t2d1.exists()).toBe(true);
      expect(t2d1.classes('t-tree__item--visible')).toBe(false);
      expect(t2d1.classes('t-tree__item--hidden')).toBe(true);
    });
  });

  describe('props.expandLevel', () => {
    it('props.expandLevel 设置为 true, 可配置展开级别', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
              children: [
                {
                  value: 't1.1.1',
                  children: [
                    {
                      value: 't1.1.1.1',
                    },
                  ],
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
                  children: [
                    {
                      value: 't2.1.1.1',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree transition={false} data={data} expandLevel={2}></Tree>;
        },
      });

      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1.1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t2.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t2.1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t2.1.1.1"]').exists()).toBe(false);
    });
  });

  describe('props.expandMutex', () => {
    it('设置 expandMutex 为 true，同级节点展开为互斥动作', async () => {
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
              children: [
                {
                  value: 't1.2.1',
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
            },
          ],
        },
      ];

      const wrapper = mount({
        render() {
          return <Tree transition={false} data={data} expandMutex></Tree>;
        },
      });

      await wrapper.find('[data-value="t2"] .t-tree__icon').trigger('click');

      await delay(10);

      let t1d1 = wrapper.find('[data-value="t1.1"]');
      expect(t1d1.exists()).toBe(false);

      const t2d1 = wrapper.find('[data-value="t2.1"]');
      expect(t2d1.exists()).toBe(true);
      expect(t2d1.classes('t-tree__item--visible')).toBe(true);

      await wrapper.find('[data-value="t1"] .t-tree__icon').trigger('click');

      await delay(10);

      t1d1 = wrapper.find('[data-value="t1.1"]');
      expect(t1d1.exists()).toBe(true);
      expect(t1d1.classes('t-tree__item--visible')).toBe(true);
      expect(t1d1.classes('t-tree__item--hidden')).toBe(false);

      expect(t2d1.exists()).toBe(true);
      expect(t2d1.classes('t-tree__item--visible')).toBe(false);
      expect(t2d1.classes('t-tree__item--hidden')).toBe(true);

      let t1d1d1 = wrapper.find('[data-value="t1.1.1"]');
      expect(t1d1d1.exists()).toBe(false);

      let t1d2d1 = wrapper.find('[data-value="t1.2.1"]');
      expect(t1d1d1.exists()).toBe(false);

      await wrapper.find('[data-value="t1.2"] .t-tree__icon').trigger('click');

      await delay(10);

      t1d1d1 = wrapper.find('[data-value="t1.1.1"]');
      expect(t1d1d1.exists()).toBe(false);

      t1d2d1 = wrapper.find('[data-value="t1.2.1"]');
      expect(t1d2d1.exists()).toBe(true);
      expect(t1d2d1.classes('t-tree__item--visible')).toBe(true);

      await wrapper.find('[data-value="t1.1"] .t-tree__icon').trigger('click');

      await delay(10);

      t1d1d1 = wrapper.find('[data-value="t1.1.1"]');
      expect(t1d1d1.exists()).toBe(true);
      expect(t1d1d1.classes('t-tree__item--visible')).toBe(true);
      expect(t1d2d1.classes('t-tree__item--visible')).toBe(false);
    });
  });

  describe('props.expandOnClickNode', () => {
    it('点击父节点图标可触发展开子节点', async () => {
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
          return <Tree transition={false} data={data}></Tree>;
        },
      });
      wrapper.find('[data-value="t1"] .t-tree__icon').trigger('click');
      await delay(10);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
    });

    it('点击已展开的父节点图标，可触发收起子节点', async () => {
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
          return <Tree data={data} expandAll transition={false}></Tree>;
        },
      });
      wrapper.find('[data-value="t1"] .t-tree__icon').trigger('click');
      await delay(10);
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      expect(t1d1.exists()).toBe(true);
      expect(t1d1.classes('t-tree__item--visible')).toBe(false);
      expect(t1d1.classes('t-tree__item--hidden')).toBe(true);
    });

    it('默认点击父节点本身不会触发展开子节点', async () => {
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
          return <Tree transition={false} data={data}></Tree>;
        },
      });
      wrapper.find('[data-value="t1"]').trigger('click');
      await delay(10);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
    });

    it('expandOnClickNode 设置为 true 时，点击父节点本身会触发展开子节点', async () => {
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
          return <Tree transition={false} data={data} expandOnClickNode></Tree>;
        },
      });
      wrapper.find('[data-value="t1"]').trigger('click');
      await delay(10);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
    });
  });

  describe('props.expandParent', () => {
    it('默认展开子节点，不影响父节点展开状态', async () => {
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
          return <Tree transition={false} ref="tree" data={data}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      tree.setItem('t1.1', {
        expanded: true,
      });
      await delay(10);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(false);
      expect(wrapper.find('[data-value="t1.1.1"]').exists()).toBe(false);
      expect(tree.getItem('t1.1').expanded).toBe(true);
      expect(tree.getItem('t1').expanded).toBe(false);
    });

    it('expandParent 设为 true 时，子节点展开会使父节点展开', async () => {
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
          return <Tree transition={false} ref="tree" expandParent data={data}></Tree>;
        },
      });
      const { tree } = wrapper.vm.$refs;
      tree.setItem('t1.1', {
        expanded: true,
      });
      await delay(10);
      expect(wrapper.find('[data-value="t1.1"]').exists()).toBe(true);
      expect(wrapper.find('[data-value="t1.1.1"]').exists()).toBe(true);
      expect(tree.getItem('t1.1').expanded).toBe(true);
      expect(tree.getItem('t1').expanded).toBe(true);
    });
  });
});
