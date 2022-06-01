import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Tree from '@/src/tree/index.ts';
import { delay } from './kit';

describe('Tree:checkable', () => {
  vi.useRealTimers();
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
      wrapper.setProps({
        value: ['t1.2'],
      });
      await delay(10);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1"] .t-checkbox').classes('t-is-indeterminate')).toBe(true);
      expect(wrapper.find('[data-value="t1.1"] .t-checkbox').classes('t-is-checked')).toBe(false);
      expect(wrapper.find('[data-value="t1.2"] .t-checkbox').classes('t-is-checked')).toBe(true);
    });
  });
});
