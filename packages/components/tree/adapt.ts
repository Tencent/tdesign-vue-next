// 在这个文件，解决 vue2/vue3 tree 组件依赖的差异问题
// 除此文件之外的其他组件文件，可从 vue2 项目直接复制到 vue3 项目进行维护
import * as Vue from 'vue';
import { Ref, SetupContext, ToRefs, VNode, PropType, ComponentPublicInstance, UnwrapNestedRefs } from 'vue';
import { CheckboxProps } from '../checkbox';
import { ClassName, TScroll, Styles, TNode, TreeOptionData, TNodeReturnValue } from '../common';
import { TypeTreeEventState as TreeEventState } from '@tdesign/common-js/tree/types';
import { TdTreeProps, TreeInstanceFunctions } from './type';
import { VirtualScrollConfig, useVModel as tdUseVModel, useDefaultValue as tdUseDefaultValue } from '@tdesign/hooks';
import tdWithInstall from '../utils/withInstall';

import { TreeStore } from '@tdesign/common-js/tree/tree-store';

export { ref, reactive, computed, watch, onMounted, toRefs, defineComponent, TransitionGroup } from 'vue';
export { CaretRightSmallIcon as TdCaretRightSmallIcon } from 'tdesign-icons-vue-next';
export { Checkbox as TCheckBox } from '../checkbox';
export { Loading as TLoading } from '../loading';
export { useConfig, usePrefixClass } from '@tdesign/hooks';
export { useGlobalIcon } from '@tdesign/hooks';
export { useLazyLoad } from '@tdesign/hooks';
export { useVirtualScrollNew } from '@tdesign/hooks';
export { TreeNode, privateKey } from '@tdesign/common-js/tree/tree-node';
export type TypeVModel = ReturnType<typeof tdUseVModel>;

export type TypeRef<T> = Ref<T>;
export type TypeSetupContext = SetupContext;
export type TypeCreateElement = typeof Vue.h;
export type TypeVNode = VNode;
export type TypePropType<T> = PropType<T>;
export type TypeCheckboxProps = CheckboxProps;
export type TypeClassName = ClassName;
export type TypeScroll = TScroll;
export type TypeStyles = Styles;
export type TypeTNode<T> = TNode<T>;
export type TypeTNodeReturnValue = TNodeReturnValue;
export type TypeTreeOptionData = TreeOptionData;
export type TypeTreeEventState = TreeEventState;
export type TypeVirtualScrollConfig = VirtualScrollConfig;
export type TypeToRefs<T> = ToRefs<T>;
export type TypeUnwrapNestedRefs<T> = UnwrapNestedRefs<T>;
export interface TypeTreeInstance extends ComponentPublicInstance, TreeInstanceFunctions {}

export type TreeProps<T extends TypeTreeOptionData = TypeTreeOptionData> = TdTreeProps<T> & {
  treeStore?: TreeStore;
};

export interface TypeOnDrag {
  default?: unknown;
}

const onDrag: TypeOnDrag = {
  default: undefined,
};

export const isVueNext = true;

export const TreeItemDefinition = {
  name: 'TTreeNode',
  inject: {
    onDrag,
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useRipple(el: unknown) {}

export function withInstall<T>(construct: T) {
  return tdWithInstall(construct);
}

export interface UseVModelParams<T> {
  value: Ref<T>;
  eventName?: string;
  propName?: string;
}

export function getCreateElement(h?: TypeCreateElement) {
  if (h) {
    // do nothing, just for adapt
  }
  return Vue.h;
}

export function getScopedSlots(instance: ComponentPublicInstance) {
  return instance.$slots;
}

export function useVModel(
  props: TreeProps & Record<string, any>,
  refsProps: ToRefs<TreeProps> & Record<string, any>,
  propName = 'value',
  defaultPropName = 'defaultValue',
  eventPropName = 'onChange',
  eventName = 'change',
) {
  if (eventName) {
    // do nothing，just for adapt
  }
  const { modelValue } = refsProps;
  let vm;
  if (propName === 'value') {
    vm = tdUseVModel(refsProps[propName], modelValue, props[defaultPropName], props[eventPropName], propName);
  } else {
    vm = tdUseDefaultValue(refsProps[propName], props[defaultPropName], props[eventPropName], propName);
  }
  return vm;
}
