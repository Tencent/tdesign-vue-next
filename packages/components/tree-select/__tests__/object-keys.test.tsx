import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createTreeSelectTestHarness, getSelectInput, getSelectInputHandler, getTree, getTreeHandler } from './mount';

const { cleanup, renderOpenTreeSelect, renderTreeSelect } = createTreeSelectTestHarness();
const keys = { label: 'name', value: 'id', children: 'nodes' };
const data = [
  {
    name: 'parent',
    id: 1n,
    nodes: [
      { name: 'zero', id: 0n },
      { name: 'large', id: 9007199254740993n },
    ],
  },
];
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('TreeSelect', () => {
  describe('props', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each(['keys', 'treeProps'] as const)(
      'uses %s to resolve an object value and expand its parents',
      async (source) => {
        const wrapper = await renderOpenTreeSelect({
          data,
          ...(source === 'keys' ? { keys } : { treeProps: { keys } }),
          valueType: 'object',
          value: { name: 'zero', id: 0n },
        });
        expect(getSelectInput(wrapper).props('value')).toMatchObject({
          name: 'zero',
          id: 0n,
          label: 'zero',
          value: 0n,
        });
        expect(getTree(wrapper).props('actived')).toEqual([0n]);
        expect(getTree(wrapper).props('expanded')).toEqual([1n]);
      },
    );

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each([0n, 0, 'zero-key'])('resolves custom object keys for %s', async (id) => {
      const wrapper = await renderOpenTreeSelect({
        data: [{ name: 'zero', id }],
        keys,
        valueType: 'object',
        value: { name: 'zero', id },
      });
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: id });
      expect(getTree(wrapper).props('actived')).toEqual([id]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('prefers the custom value field over a conflicting normalized value', async () => {
      const wrapper = await renderOpenTreeSelect({
        data,
        keys,
        valueType: 'object',
        value: { id: 0n, value: 9007199254740993n },
      });
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0n });
      expect(getTree(wrapper).props('actived')).toEqual([0n]);
      expect(getTree(wrapper).props('expanded')).toEqual([1n]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('keeps normalized object values working with custom keys', async () => {
      const wrapper = await renderOpenTreeSelect({
        data,
        keys,
        valueType: 'object',
        value: { label: 'zero', value: 0n },
      });
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0n });
      expect(getTree(wrapper).props('actived')).toEqual([0n]);
      expect(getTree(wrapper).props('expanded')).toEqual([1n]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each(['modelValue', 'defaultValue'] as const)('resolves custom object fields from %s', async (prop) => {
      const wrapper = await renderOpenTreeSelect({ data, keys, valueType: 'object', [prop]: { id: 0n } });
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0n });
      expect(getTree(wrapper).props('actived')).toEqual([0n]);
    });
  });

  describe('scenarios', () => {
    describe('object values with custom keys', () => {
      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('updates a controlled object selection and clears it', async () => {
        const wrapper = renderTreeSelect({ data, keys, valueType: 'object', value: { id: 9007199254740993n } });
        await wrapper.setProps({ value: { id: 0n } });
        await nextTick();
        expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0n });
        await wrapper.setProps({ value: '' });
        await nextTick();
        expect(getSelectInput(wrapper).props('value')).toBe('');
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('emits a reusable object when clicking a custom-key node', async () => {
        const onChange = vi.fn();
        const wrapper = await renderOpenTreeSelect({
          data,
          keys,
          treeProps: { expandAll: true },
          valueType: 'object',
          onChange,
        });
        await getTree(wrapper).find('[data-value="0"] .t-tree__label').trigger('click');
        await nextTick();
        const selected = onChange.mock.calls[0][0];
        expect(selected).toMatchObject({ name: 'zero', id: 0n, label: 'zero', value: 0n });
        expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0n });
        expect(getTree(wrapper).props('actived')).toEqual([0n]);
        onChange.mockClear();
        getTreeHandler(wrapper, 'onActive')([0n], { node: { actived: true, data: { name: 'zero', id: 0n } } });
        expect(onChange).not.toHaveBeenCalled();
      });

      // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
      it('checks aliased object values and removes the zero tag', async () => {
        const onChange = vi.fn();
        const wrapper = await renderOpenTreeSelect({
          data,
          keys,
          valueType: 'object',
          multiple: true,
          defaultValue: [
            { name: 'zero', id: 0n },
            { name: 'large', id: 9007199254740993n },
          ],
          onChange,
        });
        expect(getTree(wrapper).props('value')).toEqual([0n, 9007199254740993n]);
        expect(getSelectInput(wrapper).props('value')).toEqual([
          expect.objectContaining({ label: 'zero', value: 0n }),
          expect.objectContaining({ label: 'large', value: 9007199254740993n }),
        ]);
        getSelectInputHandler(wrapper, 'onTagChange')(['large'], {
          trigger: 'tag-remove',
          index: 0,
          e: new MouseEvent('click'),
        });
        await nextTick();
        expect(onChange).toHaveBeenCalledWith(
          [{ name: 'large', id: 9007199254740993n }],
          expect.objectContaining({ trigger: 'tag-remove' }),
        );
        expect(getTree(wrapper).props('value')).toEqual([9007199254740993n]);
      });
    });
  });
});
