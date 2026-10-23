import { describe, expect, it } from 'vitest';
import { TreeStore } from '@tdesign/common-js/tree/tree-store';
import { getSingleContent, getTreeValue, isEmptyValues } from '../utils';

describe('Cascader bigint values', () => {
  // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
  it.each([0n, 11n, 9007199254740993n])('recognizes %s as a nonempty single selection', (value) => {
    expect(isEmptyValues(value)).toBe(false);
    expect(getTreeValue(value)).toEqual([value]);
  });

  // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
  it('preserves multiple bigint selections', () => {
    expect(getTreeValue([0n, 11n])).toEqual([0n, 11n]);
  });

  // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
  it.each([undefined, null, '', []])('keeps empty values empty: %s', (value) => {
    expect(isEmptyValues(value)).toBe(true);
    expect(getTreeValue(value)).toEqual([]);
  });

  // Issue: https://github.com/Tencent/tdesign-vue-next/issues/6798
  it('displays the zero node path and leaf label', () => {
    const store = new TreeStore({});
    store.append([{ label: 'parent', value: 1n, children: [{ label: 'zero', value: 0n }] }]);
    store.refreshNodes();
    const ctx = { value: 0n, multiple: false, treeStore: store, showAllLevels: true } as Parameters<
      typeof getSingleContent
    >[0];
    expect(getSingleContent(ctx)).toBe('parent / zero');
    expect(getSingleContent({ ...ctx, showAllLevels: false })).toBe('zero');
  });
});
