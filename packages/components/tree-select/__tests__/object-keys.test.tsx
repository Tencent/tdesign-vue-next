import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createTreeSelectTestHarness, getSelectInput, getSelectInputHandler, getTree, getTreeHandler } from './mount';

const { cleanup, renderOpenTreeSelect, renderTreeSelect } = createTreeSelectTestHarness();
const keys = { label: 'name', value: 'id', children: 'nodes' };
const data = [
  {
    name: 'parent',
    id: 1,
    nodes: [
      { name: 'zero', id: 0 },
      { name: 'large', id: 2 },
    ],
  },
];
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('TreeSelect', () => {
  describe('props', () => {
    it.each(['keys', 'treeProps'] as const)(
      'uses %s to resolve an object value and expand its parents',
      async (source) => {
        const wrapper = await renderOpenTreeSelect({
          data,
          ...(source === 'keys' ? { keys } : { treeProps: { keys } }),
          valueType: 'object',
          value: { name: 'zero', id: 0 },
        });
        expect(getSelectInput(wrapper).props('value')).toMatchObject({
          name: 'zero',
          id: 0,
          label: 'zero',
          value: 0,
        });
        expect(getTree(wrapper).props('actived')).toEqual([0]);
        expect(getTree(wrapper).props('expanded')).toEqual([1]);
      },
    );

    it.each([0, 'zero-key'])('resolves custom object keys for %s', async (id) => {
      const wrapper = await renderOpenTreeSelect({
        data: [{ name: 'zero', id }],
        keys,
        valueType: 'object',
        value: { name: 'zero', id },
      });
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: id });
      expect(getTree(wrapper).props('actived')).toEqual([id]);
    });

    it('prefers the custom value field over a conflicting normalized value', async () => {
      const wrapper = await renderOpenTreeSelect({
        data,
        keys,
        valueType: 'object',
        value: { id: 0, value: 2 },
      });
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0 });
      expect(getTree(wrapper).props('actived')).toEqual([0]);
      expect(getTree(wrapper).props('expanded')).toEqual([1]);
    });

    it('keeps normalized object values working with custom keys', async () => {
      const wrapper = await renderOpenTreeSelect({
        data,
        keys,
        valueType: 'object',
        value: { label: 'zero', value: 0 },
      });
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0 });
      expect(getTree(wrapper).props('actived')).toEqual([0]);
      expect(getTree(wrapper).props('expanded')).toEqual([1]);
    });

    it.each(['modelValue', 'defaultValue'] as const)('resolves custom object fields from %s', async (prop) => {
      const wrapper = await renderOpenTreeSelect({ data, keys, valueType: 'object', [prop]: { id: 0 } });
      expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0 });
      expect(getTree(wrapper).props('actived')).toEqual([0]);
    });
  });

  describe('scenarios', () => {
    describe('object values with custom keys', () => {
      it('updates a controlled object selection and clears it', async () => {
        const wrapper = renderTreeSelect({ data, keys, valueType: 'object', value: { id: 2 } });
        await wrapper.setProps({ value: { id: 0 } });
        await nextTick();
        expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0 });
        await wrapper.setProps({ value: '' });
        await nextTick();
        expect(getSelectInput(wrapper).props('value')).toBe('');
      });

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
        expect(selected).toMatchObject({ name: 'zero', id: 0, label: 'zero', value: 0 });
        expect(getSelectInput(wrapper).props('value')).toMatchObject({ label: 'zero', value: 0 });
        expect(getTree(wrapper).props('actived')).toEqual([0]);
        onChange.mockClear();
        getTreeHandler(wrapper, 'onActive')([0], { node: { actived: true, data: { name: 'zero', id: 0 } } });
        expect(onChange).not.toHaveBeenCalled();
      });

      it.each(['onlyLeaf', 'all'] as const)(
        'checks aliased object values and removes the zero tag in %s mode',
        async (valueMode) => {
          const onChange = vi.fn();
          const wrapper = await renderOpenTreeSelect({
            data,
            keys,
            valueType: 'object',
            multiple: true,
            defaultValue: [
              { name: 'zero', id: 0 },
              { name: 'large', id: 2 },
            ],
            treeProps: { valueMode },
            onChange,
          });
          expect(getTree(wrapper).props('value')).toEqual([0, 2]);
          expect(getSelectInput(wrapper).props('value')).toEqual([
            expect.objectContaining({ label: 'zero', value: 0 }),
            expect.objectContaining({ label: 'large', value: 2 }),
          ]);
          getSelectInputHandler(wrapper, 'onTagChange')(['large'], {
            trigger: 'tag-remove',
            index: 0,
            e: new MouseEvent('click'),
          });
          await nextTick();
          expect(onChange).toHaveBeenCalledWith(
            [{ name: 'large', id: 2 }],
            expect.objectContaining({ trigger: 'tag-remove' }),
          );
          expect(getTree(wrapper).props('value')).toEqual([2]);
        },
      );
    });
  });
});
