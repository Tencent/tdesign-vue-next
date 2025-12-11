import { TdCascaderProps, CascaderValue, CascaderChangeSource } from './type';
import { TdSelectInputProps } from '../select-input/type';
import TreeStore from '@tdesign/common-js/tree/tree-store';
import TreeNode from '@tdesign/common-js/tree/tree-node';
import { TreeNodeModel, TreeNodeValue } from '@tdesign/common-js/tree/types';

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

export { TreeNode } from '@tdesign/common-js/tree/tree-node';
export type { TreeNodeValue } from '@tdesign/common-js/tree/types';
export type { TreeOptionData } from '@tdesign/common-js/common';
export type { TreeNodeModel } from '../tree';
export type { TdSelectInputProps } from '../select-input/type';

export const EVENT_NAME_WITH_KEBAB = ['remove', 'blur', 'focus'];

export interface CascaderOptionSlotContext {
  item: TreeOptionData;
  index: number;
  onChange: () => void;
  onExpand: () => void;
}

export interface CascaderSubPanelSlots {
  option?: TdCascaderProps['option'];
  empty?: TdCascaderProps['empty'];
  loadingText?: TdCascaderProps['loadingText'];
  panelHeader?: TdCascaderProps['panelHeader'];
}

export interface CascaderSlots extends CascaderSubPanelSlots {
  label?: TdCascaderProps['label'];
  suffix?: TdCascaderProps['suffix'];
  prefixIcon?: TdCascaderProps['prefixIcon'];
  suffixIcon?: TdCascaderProps['suffixIcon'];
  panelTopContent?: TdCascaderProps['panelTopContent'];
  panelBottomContent?: TdCascaderProps['panelBottomContent'];
  tips?: TdCascaderProps['tips'];
  valueDisplay?: TdCascaderProps['valueDisplay'];
  collapsedItems?: TdCascaderProps['collapsedItems'];
}
