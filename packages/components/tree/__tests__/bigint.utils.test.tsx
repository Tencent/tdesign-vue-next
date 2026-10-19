import { describe, expect, it } from 'vitest';
import { TreeStore } from '@tdesign/common-js/tree/tree-store';

describe('Tree bigint node operations', () => {
  // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
  it.each([0n, 0, ''])('removes only the requested child with value %s', (value) => {
    const store = new TreeStore({});
    store.append([{ value: 'parent', children: [{ value }, { value: 'sibling' }] }]);
    store.refreshNodes();
    store.getNode('parent').getModel().remove(value);
    expect(store.getNode(value)).toBeNull();
    expect(store.getNode('parent')).toBeTruthy();
    expect(store.getNode('sibling')).toBeTruthy();
  });

  // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
  it('still removes the model itself when the target is omitted', () => {
    const store = new TreeStore({});
    store.append([{ value: 0n }, { value: 1n }]);
    store.refreshNodes();
    store.getNode(0n).getModel().remove();
    expect(store.getNode(0n)).toBeNull();
    expect(store.getNode(1n)).toBeTruthy();
  });

  // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
  it('limits getNodes(0n) to that subtree and appends to the zero node', () => {
    const store = new TreeStore({});
    store.append([{ value: 0n, children: [{ value: 2n }] }, { value: 1n }]);
    store.refreshNodes();
    expect(store.getNodes(0n).map((node) => node.value)).toEqual([0n, 2n]);
    store.appendNodes(0n, { value: 3n });
    store.refreshNodes();
    expect(store.getNode(3n).getParent().value).toBe(0n);
    expect(store.getNodes().map((node) => node.value)).toEqual([0n, 2n, 3n, 1n]);
  });

  // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
  it('keeps string, number and bigint identities distinct without losing large integer precision', () => {
    const values = [1, '1', 1n, 9007199254740992n, 9007199254740993n];
    const store = new TreeStore({ activable: true });
    store.append(values.map((value) => ({ value })));
    store.refreshNodes();
    values.forEach((value) => expect(store.getNode(value).value).toBe(value));
    store.replaceActived([1n]);
    expect(store.getNode(1n).actived).toBe(true);
    expect(store.getNode(1).actived).toBe(false);
    expect(store.getNode('1').actived).toBe(false);
  });
});
