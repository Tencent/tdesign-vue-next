import { TdCascaderProps, CascaderValue } from './type';
import TreeStore from '../_common/js/tree/tree-store';
import TreeNode from '../_common/js/tree/tree-node';

export type CascaderProps = TdCascaderProps;

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
  > {
  treeStore: TreeStore;
  model: CascaderValue;
  setModel: (val: CascaderValue) => void;
  visible: boolean;
  setVisible: (val: boolean) => void;
  treeNodes: TreeNode[];
  setTreeNodes: (val: CascaderValue) => void;
  filterActive: boolean;
  setFilterActive: (val: boolean) => void;
}

export interface CascaderPanelProps extends Pick<TdCascaderProps, 'trigger' | 'empty' | 'onChange'> {
  cascaderContext: CascaderContextType;
}

// InputContent component interfaces
export interface InputContentProps {
  cascaderContext: CascaderContextType;
  placeholder: TdCascaderProps['placeholder'];
  listeners: {
    onRemove: TdCascaderProps['onRemove'];
    onBlur: TdCascaderProps['onBlur'];
    onFocus: TdCascaderProps['onFocus'];
    onChange: TdCascaderProps['onChange'];
  };
}

export interface ContentProps {
  cascaderContext: CascaderContextType;
  placeholder: TdCascaderProps['placeholder'];
  listeners: InputContentProps['listeners'];
  isHover: boolean;
}

export interface InnerContentProps {
  cascaderContext: CascaderContextType;
  isHover: boolean;
  listeners: InputContentProps['listeners'];
  placeholder: TdCascaderProps['placeholder'];
}

export interface SuffixIconProps {
  cascaderContext: CascaderContextType;
  isHover: boolean;
  listeners: InputContentProps['listeners'];
}

export interface CascaderItemProps {
  node: TreeNode;
  cascaderContext: CascaderContextType;
  onClick: any;
  onChange: any;
  onMouseEnter: any;
}

export type ContextType = { e?: Event; node?: TreeNode };
export { TreeNode } from '../_common/js/tree/tree-node';
export type { TreeNodeValue } from '../_common/js/tree/types';
export type { TreeOptionData } from '../_common/js/common';

export const EVENT_NAME_WITH_KEBAB = [
  'mouse-enter',
  'click',
  'change',
  'remove',
  'blur',
  'focus',
];
