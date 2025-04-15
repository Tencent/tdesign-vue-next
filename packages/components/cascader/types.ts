import TreeNode from '@tdesign/common-js/tree/tree-node';
import TreeStore from '@tdesign/common-js/tree/tree-store';
import { TreeNodeModel, TreeNodeValue } from '@tdesign/common-js/tree/types';
import { TdSelectInputProps } from '../select-input/type';
import { CascaderChangeSource, CascaderValue, TdCascaderProps } from './type';

export * from './type';
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
  isFiltering: boolean;
  treeStore: TreeStore;
  setValue: (val: CascaderValue, source: CascaderChangeSource, node?: TreeNodeModel) => void;
  visible: boolean;
  setVisible: TdSelectInputProps['onPopupVisibleChange'];
  treeNodes: TreeNode[];
  setTreeNodes: (val: CascaderValue) => void;
  inputVal: TdSelectInputProps['inputValue'];
  setInputVal: (val: TdSelectInputProps['inputValue']) => void;
  setExpend: (val: TreeNodeValue[]) => void;
  setIsFiltering: (val: boolean) => void;
}

export type { TreeOptionData } from '@tdesign/common-js/common';
export { TreeNode } from '@tdesign/common-js/tree/tree-node';
export type { TreeNodeValue } from '@tdesign/common-js/tree/types';
export type { TdSelectInputProps } from '../select-input/type';
export type { TreeNodeModel } from '../tree';

export const EVENT_NAME_WITH_KEBAB = ['remove', 'blur', 'focus'];
