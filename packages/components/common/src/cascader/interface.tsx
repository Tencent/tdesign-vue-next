import type { CascaderChangeSource, CascaderValue, TdCascaderProps } from '@td/intel/cascader/type';
import type TreeStore from '@td/common/js/tree/tree-store';
import type TreeNode from '@td/common/js/tree/tree-node';
import type { TreeNodeModel, TreeNodeValue } from '@td/common/js/tree/types';
import type { TdSelectInputProps } from '../select-input/type';

export * from '@td/intel/cascader/type';
export interface CascaderContextType
  extends Pick<
    TdCascaderProps,
    | 'size'
    | 'disabled'
    | 'checkStrictly'
    | 'lazy'
    | 'multiple'
    | 'filterable'
    | 'filter'
    | 'clearable'
    | 'checkProps'
    | 'showAllLevels'
    | 'max'
    | 'value'
    | 'minCollapsedNum'
    | 'valueType'
  > {
  treeStore: TreeStore;
  setValue: (val: CascaderValue, source: CascaderChangeSource, node?: TreeNodeModel) => void;
  visible: boolean;
  setVisible: TdSelectInputProps['onPopupVisibleChange'];
  treeNodes: TreeNode[];
  setTreeNodes: (val: CascaderValue) => void;
  inputVal: TdSelectInputProps['inputValue'];
  setInputVal: (val: TdSelectInputProps['inputValue']) => void;
  setExpend: (val: TreeNodeValue[]) => void;
}

export { TreeNode } from '@td/common/js/tree/tree-node';
export type { TreeNodeValue } from '@td/common/js/tree/types';
export type { TreeOptionData } from '@td/common/js/common';
export type { TreeNodeModel } from '../tree';
export type { TdSelectInputProps } from '../select-input/type';

export const EVENT_NAME_WITH_KEBAB = ['remove', 'blur', 'focus'];
