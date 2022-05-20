import { TdCascaderProps, CascaderValue, CascaderChangeSource } from './type';
import { TdSelectInputProps } from '../select-input/type';
import TreeStore from '../_common/js/tree/tree-store';
import TreeNode from '../_common/js/tree/tree-node';
import { TreeNodeModel, TreeNodeValue } from '../_common/js/tree/types';

export type CascaderProps = TdCascaderProps;

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

export interface CascaderPanelProps extends Pick<TdCascaderProps, 'trigger' | 'empty' | 'onChange'> {
  cascaderContext: CascaderContextType;
}

export interface ListenersType {
  onRemove?: TdCascaderProps['onRemove'];
  onBlur?: TdCascaderProps['onBlur'];
  onFocus?: TdCascaderProps['onFocus'];
  onChange?: TdCascaderProps['onChange'];
}
// InputContent component interfaces
export interface InputContentProps {
  cascaderContext: CascaderContextType;
  placeholder: TdCascaderProps['placeholder'];
  listeners: ListenersType;
  collapsedItems: TdCascaderProps['collapsedItems'];
}

export interface ContentProps {
  cascaderContext: CascaderContextType;
  placeholder: TdCascaderProps['placeholder'];
  listeners: InputContentProps['listeners'];
  isHover: boolean;
}
export interface CascaderItemPropsType {
  node: TreeNode;
  cascaderContext: CascaderContextType;
  onClick: (ctx: ContextType) => void;
  onChange: (ctx: ContextType | { e: boolean; node: TreeNode }) => void;
  onMouseEnter: (ctx: ContextType) => void;
}

export type ContextType = { e?: Event; node?: TreeNode };
export { TreeNode } from '../_common/js/tree/tree-node';
export type { TreeNodeValue } from '../_common/js/tree/types';
export type { TreeOptionData } from '../_common/js/common';
export type { TreeNodeModel } from '../tree';
export type { TdSelectInputProps } from '../select-input/type';

export const EVENT_NAME_WITH_KEBAB = ['remove', 'blur', 'focus'];
