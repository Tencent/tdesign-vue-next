import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import Tree, { type TreeInstanceFunctions, type TreeScrollToElementParams } from '@tdesign/components/tree';
import type { TreeOptionData } from '@tdesign/components/common';

enableAutoUnmount(afterEach);
afterEach(() => vi.restoreAllMocks());

describe('Tree', () => {
  const renderTree = (data: TreeOptionData[]) =>
    mount(Tree, { props: { data, transition: false, expandAll: true } }).vm as unknown as TreeInstanceFunctions;

  describe('instanceFunctions', () => {
    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each([0n, 1n, 9007199254740993n, 0, 'zero', ''])('scrollTo accepts key %s without coercing its type', (key) => {
      const values = [0n, 1n, 9007199254740993n, 0, 'zero', ''];
      const wrapper = mount(Tree, { props: { data: values.map((value) => ({ value })), transition: false } });
      const scroll = vi.spyOn(wrapper.vm.virtualConfig, 'scrollToElement').mockImplementation(() => {});
      const params = { key } satisfies TreeScrollToElementParams;
      const tree = wrapper.vm as unknown as TreeInstanceFunctions;
      tree.scrollTo(params);
      expect(scroll).toHaveBeenCalledWith({ key, index: values.indexOf(key) - 1 });
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('scrollTo preserves explicit index precedence and rejects a missing bigint key', () => {
      const wrapper = mount(Tree, { props: { data: [{ value: 0n }] } });
      const scroll = vi.spyOn(wrapper.vm.virtualConfig, 'scrollToElement').mockImplementation(() => {});
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      const tree = wrapper.vm as unknown as TreeInstanceFunctions;
      tree.scrollTo({ index: 0, key: 99n });
      expect(scroll).toHaveBeenCalledWith({ index: -1, key: 99n });
      scroll.mockClear();
      tree.scrollTo({ key: 99n });
      expect(scroll).not.toHaveBeenCalled();
      expect(error).toHaveBeenCalled();
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each([0n, 0, ''])('getTreeData(%s) exports only the requested subtree', (value) => {
      const subtree = { value, children: [{ value: 2n }] };
      const tree = renderTree([subtree, { value: 1n }]);
      expect(tree.getTreeData(value)).toEqual([subtree]);
      expect(tree.getTreeData()).toEqual([subtree, { value: 1n }]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each([0n, 0, ''])('getTreeData(%s) returns no nodes when the target is absent', (value) => {
      const tree = renderTree([{ value: 1n }]);
      expect(tree.getTreeData(value)).toEqual([]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it('getTreeData preserves string, number and bigint keys in nested nodes', () => {
      const data = [{ value: 1, children: [{ value: '1', children: [{ value: 1n }] }] }];
      const tree = renderTree(data);
      expect(tree.getTreeData()).toEqual(data);
      expect(tree.getTreeData('1')).toEqual(data[0].children);
      expect(tree.getTreeData(1n)).toEqual([{ value: 1n }]);
    });

    // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
    it.each(['appendTo', 'insertBefore', 'insertAfter'] as const)(
      '%s moves existing zero nodes and preserves their models',
      async (method) => {
        for (const value of [0n, 0]) {
          const warn = vi.spyOn(console, 'warn');
          const tree = renderTree([{ label: 'zero', value, children: [{ value: 'descendant' }] }, { value: 'target' }]);
          const model = tree.getItem(value);
          tree[method]('target', { value });
          await nextTick();
          expect(tree.getItem(value) === model).toBe(true);
          expect(tree.getItem(value).label).toBe('zero');
          expect(tree.getParent('descendant').value).toBe(value);
          expect(tree.getItems().filter((node) => node.value === value)).toHaveLength(1);
          if (method === 'appendTo') {
            expect(tree.getParent(value).value).toBe('target');
            expect(tree.getTreeData().map((node) => node.value)).toEqual(['target']);
          } else {
            expect(tree.getTreeData().map((node) => node.value)).toEqual(
              method === 'insertBefore' ? [value, 'target'] : ['target', value],
            );
          }
          expect(warn.mock.calls.some((args) => String(args[0]).includes('Dulplicate value'))).toBe(false);
          warn.mockRestore();
        }
      },
    );
  });
});
