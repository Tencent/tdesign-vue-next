import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getSelectInput, getTree, getTreeHandler, createTreeSelectTestHarness } from './mount';

const { cleanup, renderOpenTreeSelect, renderTreeSelect } = createTreeSelectTestHarness();

const bigintData = [
  { label: 'node 1', value: 1n },
  { label: 'node 2', value: 2n, children: [{ label: 'node 2-1', value: 21n }] },
];

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('TreeSelect', () => {
  describe('scenarios', () => {
    describe('bigint selection', () => {
      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('single mode: a bigint value resolves to its node', async () => {
        const wrapper = await renderOpenTreeSelect({ data: bigintData, value: 2n });
        await nextTick();

        // 单选模式下选中值通过内嵌 Tree 的 actived 传入
        expect(getTree(wrapper).props('actived')).toEqual([2n]);
        expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'node 2', value: 2n });
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('single mode: selecting a bigint node emits the bigint value', async () => {
        const onChange = vi.fn();
        const wrapper = await renderOpenTreeSelect({ data: bigintData, onChange });
        await nextTick();

        getTreeHandler(wrapper, 'onActive')([2n], {
          node: { data: { label: 'node 2', value: 2n }, actived: true, getIndex: () => 1 } as any,
        });
        await nextTick();

        expect(onChange).toHaveBeenCalledWith(2n, expect.objectContaining({ trigger: 'check' }));
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('multiple mode: bigint values round-trip through the Tree', async () => {
        const wrapper = await renderOpenTreeSelect({ data: bigintData, multiple: true, value: [1n, 2n] });
        await nextTick();

        expect(getTree(wrapper).props('value')).toEqual([1n, 2n]);
        expect(getSelectInput(wrapper).props('value')).toEqual([
          expect.objectContaining({ label: 'node 1', value: 1n }),
          expect.objectContaining({ label: 'node 2', value: 2n }),
        ]);
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('expands the parents of a bigint selected node on mount', async () => {
        const wrapper = await renderOpenTreeSelect({ data: bigintData, value: 21n });
        await nextTick();

        expect(getTree(wrapper).props('expanded')).toEqual([2n]);
      });
    });
  });

  describe('props', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('supports standard bigint object values in single and multiple mode', async () => {
      const single = await renderOpenTreeSelect({ data: bigintData, valueType: 'object', value: { value: 2n } });
      expect(getSelectInput(single).props('value')).toMatchObject({ label: 'node 2', value: 2n });
      expect(getTree(single).props('actived')).toEqual([2n]);
      const multiple = await renderOpenTreeSelect({
        data: bigintData,
        valueType: 'object',
        multiple: true,
        value: [{ value: 1n }, { value: 2n }],
      });
      expect(getTree(multiple).props('value')).toEqual([1n, 2n]);
      expect(getSelectInput(multiple).props('value')).toEqual([
        expect.objectContaining({ label: 'node 1', value: 1n }),
        expect.objectContaining({ label: 'node 2', value: 2n }),
      ]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each(['value', 'modelValue', 'defaultValue'] as const)(
      'resolves a 0n %s and expands its parents',
      async (prop) => {
        const wrapper = await renderOpenTreeSelect({
          data: [{ label: 'parent', value: 1n, children: [{ label: 'zero', value: 0n }] }],
          [prop]: 0n,
        });
        expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0n });
        expect(getTree(wrapper).props('actived')).toEqual([0n]);
        expect(getTree(wrapper).props('expanded')).toEqual([1n]);
      },
    );

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('initializes an explicitly empty controlled value from a 0n defaultValue', async () => {
      const onChange = vi.fn();
      renderTreeSelect({ data: [{ label: 'zero', value: 0n }], value: '', defaultValue: 0n, onChange });
      await nextTick();
      expect(onChange).toHaveBeenCalledWith(0n, expect.objectContaining({ trigger: 'uncheck' }));
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each(['value', 'modelValue'] as const)(
      'preserves controlled 0n %s over a different defaultValue',
      async (prop) => {
        const onChange = vi.fn();
        const wrapper = await renderOpenTreeSelect({
          data: [
            { label: 'zero', value: 0n },
            { label: 'one', value: 1n },
          ],
          [prop]: 0n,
          defaultValue: 1n,
          onChange,
        });
        expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0n });
        expect(onChange).not.toHaveBeenCalled();
      },
    );
  });

  describe('scenarios', () => {
    describe('zero bigint interaction', () => {
      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('selects 0n by clicking and clears it through SelectInput', async () => {
        const onChange = vi.fn();
        const wrapper = await renderOpenTreeSelect({ data: [{ label: 'zero', value: 0n }], clearable: true, onChange });
        await getTree(wrapper).find('[data-value="0"] .t-tree__label').trigger('click');
        await nextTick();
        expect(onChange).toHaveBeenCalledWith(0n, expect.objectContaining({ trigger: 'check' }));
        expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0n });
        getSelectInput(wrapper).vm.$emit('clear', { e: new MouseEvent('click') });
        await nextTick();
        expect(onChange).toHaveBeenLastCalledWith('', expect.objectContaining({ trigger: 'clear' }));
        expect(getSelectInput(wrapper).props('value')).toBe('');
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('updates a controlled selection to 0n and then clears it', async () => {
        const wrapper = renderTreeSelect({
          data: [
            { label: 'zero', value: 0n },
            { label: 'one', value: 1n },
          ],
          value: 1n,
        });
        await wrapper.setProps({ value: 0n });
        await nextTick();
        expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0n });
        await wrapper.setProps({ value: '' });
        await nextTick();
        expect(getSelectInput(wrapper).props('value')).toBe('');
      });
    });
  });
});
