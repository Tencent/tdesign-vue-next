import { vi } from 'vitest';
import TreeStore from '@tdesign/common-js/tree/tree-store';
import type { CascaderContextType, CascaderOption } from '@tdesign/components/cascader/types';

export const createCascaderStore = (data: CascaderOption[]) => {
  const store = new TreeStore({
    checkable: true,
    expandMutex: true,
    expandParent: true,
    keys: {},
  });
  store.append(data);
  store.refreshNodes();
  return store;
};

export const createCascaderContext = (store: TreeStore, overrides: Partial<CascaderContextType> = {}) =>
  ({
    checkProps: undefined,
    checkStrictly: false,
    clearable: false,
    disabled: false,
    filterable: false,
    inputVal: '',
    isParentFilterable: false,
    lazy: true,
    max: 0,
    minCollapsedNum: 0,
    multiple: false,
    reserveKeyword: true,
    setExpand: vi.fn(),
    setInputVal: vi.fn(),
    setTreeNodes: vi.fn(),
    setValue: vi.fn(),
    setVisible: vi.fn(),
    showAllLevels: true,
    size: 'medium',
    treeNodes: store.getNodes(),
    treeStore: store,
    value: '',
    valueMode: 'onlyLeaf',
    valueType: 'single',
    visible: true,
    ...overrides,
  } as CascaderContextType);
