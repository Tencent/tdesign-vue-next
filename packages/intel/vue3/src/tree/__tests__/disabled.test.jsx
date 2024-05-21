import { mount } from '@vue/test-utils';
import { Tree } from 'tdesign-vue-next';
import { delay } from './kit';

describe('tree:disabled', () => {
  vi.useRealTimers();
  describe('props.disabled', () => {
    it('树被禁用时，呈现禁用状态，无法选中', async () => {
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
          return <Tree transition={false} data={data} expandAll disabled checkable></Tree>;
        },
      });
      await delay(1);
      const t1 = wrapper.find('[data-value="t1"]');
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      expect(t1.classes('t-is-disabled')).toBe(true);
      expect(t1d1.classes('t-is-disabled')).toBe(true);
      await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked();
      await delay(1);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
    });
  });

  describe('props.disableCheck', () => {
    it('可以用 disableCheck 属性传递过滤函数，禁用指定节点', async () => {
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
      const disableCheck = (node) => {
        if (node.value === 't1.1' || node.value === 't1.3') {
          return true;
        }
      };
      const wrapper = mount({
        render() {
          return <Tree transition={false} data={data} expandAll disableCheck={disableCheck}></Tree>;
        },
      });
      const t1 = wrapper.find('[data-value="t1"]');
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      const t1d2 = wrapper.find('[data-value="t1.2"]');
      const t1d3 = wrapper.find('[data-value="t1.3"]');
      expect(t1.classes('t-is-disabled')).toBe(false);
      expect(t1d1.classes('t-is-disabled')).toBe(true);
      expect(t1d2.classes('t-is-disabled')).toBe(false);
      expect(t1d3.classes('t-is-disabled')).toBe(true);
    });

    it('可以结合 refresh 方法，切换禁用节点', async () => {
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
      const disableMap = {
        't1.1': true,
        't1.3': true,
      };
      const disableCheck = (node) => {
        if (disableMap[node.value]) {
          return true;
        }
      };
      const wrapper = mount({
        render() {
          return <Tree ref="tree" transition={false} data={data} expandAll disableCheck={disableCheck}></Tree>;
        },
      });
      const t1 = wrapper.find('[data-value="t1"]');
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      const t1d2 = wrapper.find('[data-value="t1.2"]');
      const t1d3 = wrapper.find('[data-value="t1.3"]');
      expect(t1.classes('t-is-disabled')).toBe(false);
      expect(t1d1.classes('t-is-disabled')).toBe(true);
      expect(t1d2.classes('t-is-disabled')).toBe(false);
      expect(t1d3.classes('t-is-disabled')).toBe(true);

      disableMap['t1.1'] = false;
      const { tree } = wrapper.vm.$refs;
      tree.refresh();
      await delay(1);
      expect(t1d1.classes('t-is-disabled')).toBe(false);
    });
  });

  describe('treeNode.disabled', () => {
    it('节点数据可初始化禁用状态', async () => {
      const data = [
        {
          value: 't1',
          children: [
            {
              value: 't1.1',
              disabled: true,
            },
            {
              value: 't1.2',
            },
          ],
        },
      ];
      const wrapper = mount({
        render() {
          return <Tree transition={false} data={data} expandAll></Tree>;
        },
      });
      await delay(1);
      const t1 = wrapper.find('[data-value="t1"]');
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      const t1d2 = wrapper.find('[data-value="t1.2"]');
      expect(t1.classes('t-is-disabled')).toBe(false);
      expect(t1d1.classes('t-is-disabled')).toBe(true);
      expect(t1d2.classes('t-is-disabled')).toBe(false);
    });

    it('可以通过 api 设置节点禁用状态', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll></Tree>;
        },
      });
      await delay(1);
      const { tree } = wrapper.vm.$refs;
      const t1 = wrapper.find('[data-value="t1"]');
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      const t1d2 = wrapper.find('[data-value="t1.2"]');
      tree.setItem('t1.1', { disabled: true });
      await delay(1);
      expect(t1.classes('t-is-disabled')).toBe(false);
      expect(t1d1.classes('t-is-disabled')).toBe(true);
      expect(t1d2.classes('t-is-disabled')).toBe(false);
    });

    it('默认父节点禁用，子节点也会禁用', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll></Tree>;
        },
      });
      await delay(1);
      const { tree } = wrapper.vm.$refs;
      const t1 = wrapper.find('[data-value="t1"]');
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      const t1d2 = wrapper.find('[data-value="t1.2"]');
      expect(t1.classes('t-is-disabled')).toBe(false);
      expect(t1d1.classes('t-is-disabled')).toBe(false);
      expect(t1d2.classes('t-is-disabled')).toBe(false);
      tree.setItem('t1', { disabled: true });
      await delay(1);
      expect(t1.classes('t-is-disabled')).toBe(true);
      expect(t1d1.classes('t-is-disabled')).toBe(true);
      expect(t1d2.classes('t-is-disabled')).toBe(true);
    });

    it('checkStrictly 为 true 时，父节点禁用，子节点不会禁用', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll checkable check-strictly={true}></Tree>;
        },
      });
      await delay(1);
      const { tree } = wrapper.vm.$refs;
      const t1 = wrapper.find('[data-value="t1"]');
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      const t1d2 = wrapper.find('[data-value="t1.2"]');
      expect(t1.classes('t-is-disabled')).toBe(false);
      expect(t1d1.classes('t-is-disabled')).toBe(false);
      expect(t1d2.classes('t-is-disabled')).toBe(false);
      tree.setItem('t1', { disabled: true });
      await delay(1);
      expect(t1.classes('t-is-disabled')).toBe(true);
      expect(t1d1.classes('t-is-disabled')).toBe(false);
      expect(t1d2.classes('t-is-disabled')).toBe(false);
    });
  });

  describe('选中态与禁用态的关联', () => {
    it('禁用的子节点未选中时，父节点选中，子节点不会被选中', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll checkable></Tree>;
        },
      });
      await delay(1);
      const { tree } = wrapper.vm.$refs;
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      tree.setItem('t1.1', { disabled: true });
      await delay(1);
      expect(t1d1.classes('t-is-disabled')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked();
      await delay(1);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(true);
      await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked(false);
      await delay(1);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(false);
    });

    it('禁用的子节点被选中时，父节点取消选中，子节点不会取消选中', async () => {
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
          return <Tree ref="tree" transition={false} data={data} expandAll checkable></Tree>;
        },
      });
      await delay(1);
      const { tree } = wrapper.vm.$refs;
      const t1d1 = wrapper.find('[data-value="t1.1"]');
      tree.setItem('t1.1', {
        checked: true,
        disabled: true,
      });
      await delay(1);
      expect(t1d1.classes('t-is-disabled')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked();
      await delay(1);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(false);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(true);
      await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked(false);
      await delay(1);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
      expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(false);
    });
  });

  it('禁用的子节点同时存在选中与未选中状态的，父节点状态切换时，可用子节点可切换选中态', async () => {
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
        return <Tree ref="tree" transition={false} data={data} expandAll checkable></Tree>;
      },
    });
    await delay(1);
    const { tree } = wrapper.vm.$refs;
    const t1d1 = wrapper.find('[data-value="t1.1"]');
    const t1d2 = wrapper.find('[data-value="t1.2"]');
    tree.setItem('t1.1', {
      checked: true,
      disabled: true,
    });
    tree.setItem('t1.2', {
      checked: false,
      disabled: true,
    });
    await delay(1);
    expect(t1d1.classes('t-is-disabled')).toBe(true);
    expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
    expect(t1d2.classes('t-is-disabled')).toBe(true);
    expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(false);
    await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked();
    await delay(1);
    expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
    expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
    expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
    expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(false);
    expect(wrapper.find('[data-value="t1.3"] .t-checkbox').classes('t-is-checked')).toBe(true);
    await wrapper.find('[data-value="t1"] input[type="checkbox"]').setChecked(false);
    await delay(1);
    expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
    expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
    expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(true);
    expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(false);
    expect(wrapper.find('[data-value="t1.3"] .t-checkbox').classes('t-is-checked')).toBe(false);
  });
});
