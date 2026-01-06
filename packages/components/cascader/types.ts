import { TdCascaderProps, CascaderValue, CascaderChangeSource } from './type';
import { TdSelectInputProps } from '../select-input/type';
import TreeStore from '@tdesign/utils/tree/tree-store';
import TreeNode from '@tdesign/utils/tree/tree-node';
import { TreeNodeModel, TreeNodeValue } from '@tdesign/utils/tree/types';

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
    | 'valueMode'
    | 'reserveKeyword'
  > {
  treeStore: TreeStore;
  setValue: (val: CascaderValue, source: CascaderChangeSource, node?: TreeNodeModel) => void;
  visible: boolean;
  setVisible: TdSelectInputProps['onPopupVisibleChange'];
  treeNodes: TreeNode[];
  setTreeNodes: (val: CascaderValue) => void;
  inputVal: TdSelectInputProps['inputValue'];
  setInputVal: (val: TdSelectInputProps['inputValue']) => void;
  setExpand: (val: TreeNodeValue[]) => void;
  isParentFilterable: boolean;
}

export { TreeNode } from '@tdesign/utils/tree';
export type { TreeNodeValue } from '@tdesign/utils/tree/types';
export type { TreeOptionData } from '@tdesign/utils/common';
export type { TreeNodeModel } from '../tree';
export type { TdSelectInputProps } from '../select-input/type';

export const EVENT_NAME_WITH_KEBAB = ['remove', 'blur', 'focus'];
