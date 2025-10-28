import { Ref, reactive, computed, toRefs, watch, nextTick } from 'vue';
import { isEqual, isString, isFunction } from 'lodash-es';

import TreeStore from '@tdesign/common-js/tree/tree-store';
import { useVModel, useDisabled, useDefaultValue } from '@tdesign/shared-hooks';

import {
  getTreeValue,
  getCascaderValue,
  isEmptyValues,
  isValueInvalid,
  treeNodesEffect,
  treeStoreExpendEffect,
  calculateExpand,
} from '../utils';

import {
  TreeNode,
  TreeNodeValue,
  TdCascaderProps,
  TreeNodeModel,
  CascaderChangeSource,
  CascaderValue,
  TreeOptionData,
} from '../types';

/**
 * @description 扁平化树形数据，在 filterable 和 checkStrictly 或 valueMode 为 parentFirst 时使用
 */
function flattenOptions(options: TdCascaderProps['options']) {
  const result: TdCascaderProps['options'] = [];

  function processNodes(nodes: any[], parentLabel = '', isParentDisabled = false) {
    nodes.forEach((node) => {
      const currentDisabled = isParentDisabled || node.disabled || false;
      const currentLabel = parentLabel ? `${parentLabel}/${node.label}` : node.label;
      const newNode = {
        label: currentLabel,
        value: node.value,
        disabled: currentDisabled,
      };

      result.push(newNode);

      if (node.children) {
        processNodes(node.children, currentLabel, currentDisabled);
      }
    });
  }

  processNodes(options);
  return result;
}

// 全局状态
export const useContext = (
  props: TdCascaderProps,
  setInnerValue: TdCascaderProps['onChange'],
  innerPopupVisible: Ref<TdCascaderProps['popupVisible']>,
  setPopupVisible: TdCascaderProps['onPopupVisibleChange'],
) => {
  const statusContext = reactive({
    treeStore: null,
    inputVal: null,
    scopeVal: undefined,
    treeNodes: [],
    expend: [],
  });

  const isParentFilterable = computed(() => props.valueMode === 'parentFirst' && statusContext.inputVal);

  return {
    statusContext,
    cascaderContext: computed(() => {
      const {
        size,
        checkStrictly,
        lazy,
        multiple,
        filterable,
        clearable,
        checkProps,
        max,
        disabled,
        showAllLevels,
        minCollapsedNum,
        valueType,
        modelValue,
        valueMode,
      } = props;
      return {
        value: statusContext.scopeVal,
        size,
        checkStrictly,
        lazy,
        multiple,
        filterable,
        clearable,
        checkProps,
        max,
        disabled,
        showAllLevels,
        minCollapsedNum,
        valueType,
        valueMode,
        visible: innerPopupVisible.value,
        isParentFilterable: isParentFilterable.value,
        ...statusContext,
        setTreeNodes: (nodes: TreeNode[]) => {
          statusContext.treeNodes = nodes;
        },
        setValue: (val: CascaderValue, source: CascaderChangeSource, node?: TreeNodeModel) => {
          if (isEqual(val, modelValue)) return;
          setInnerValue(val, { source, node });
        },
        setVisible: setPopupVisible,
        setInputVal: (val: string) => {
          statusContext.inputVal = val;
        },
        setExpand: (val: TreeNodeValue[]) => {
          statusContext.expend = val;
        },
      };
    }),
  };
};

// 内聚组件核心的副作用与状态处理
export const useCascaderContext = (props: TdCascaderProps) => {
  const disabled = useDisabled();
  const { value, modelValue, popupVisible } = toRefs(props);
  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
  const [innerPopupVisible, setPopupVisible] = useDefaultValue(
    popupVisible,
    false,
    props.onPopupVisibleChange,
    'popupVisible',
  );
  const { cascaderContext, statusContext } = useContext(props, setInnerValue, innerPopupVisible, setPopupVisible);

  const isFilterable = computed(() => {
    return Boolean(props.filterable || isFunction(props.filter));
  });

  // 更新treeNodes
  const updatedTreeNodes = () => {
    const { inputVal, treeStore, setTreeNodes, isParentFilterable } = cascaderContext.value;
    treeNodesEffect(inputVal, treeStore, setTreeNodes, props.filter, isParentFilterable);
  };

  // 更新节点展开状态
  const updateExpand = () => {
    const { value, treeStore } = cascaderContext.value;
    const { expend } = statusContext;
    treeStoreExpendEffect(treeStore, value, expend);
    treeStore.replaceChecked(getTreeValue(value));
  };

  watch(
    () => props.options,
    () => {
      const { options, keys = {}, checkStrictly, lazy, load, valueMode } = props;
      const { treeStore } = statusContext;

      if (!options.length && !treeStore) return;

      if (!treeStore) {
        const store = new TreeStore({
          keys: {
            ...keys,
            children: isString(keys.children) ? keys.children : 'children',
          },
          checkable: true,
          expandMutex: true,
          expandParent: true,
          lazy,
          load,
          valueMode,
          checkStrictly,
          onLoad: () => {
            nextTick(() => {
              store.refreshNodes();
              updatedTreeNodes();
            });
          },
        });
        store.append(options);
        statusContext.treeStore = store;
      } else {
        treeStore.reload(options);
        treeStore.refreshNodes();
      }
      updateExpand();
      updatedTreeNodes();
    },
    { immediate: true, deep: true },
  );

  // tree插件配置变化
  watch(
    () => {
      const { checkStrictly, lazy, load, valueMode } = props;
      return JSON.stringify({
        valueMode,
        checkStrictly,
        lazy,
        load,
      });
    },
    () => {
      const { treeStore } = statusContext;
      if (!treeStore) return;
      const { checkStrictly, lazy, load, valueMode } = props;
      const treeProps = {
        checkStrictly,
        disabled,
        load,
        lazy,
        valueMode,
      };
      treeStore.setConfig(treeProps);
    },
    { immediate: true },
  );

  watch(
    innerValue,
    () => {
      // 初始化判断 value 逻辑
      const { setValue, multiple, valueType } = cascaderContext.value;

      if (isValueInvalid(innerValue.value, cascaderContext.value)) {
        setValue(multiple ? [] : '', 'invalid-value');
      }

      if (!isEmptyValues(innerValue.value)) {
        statusContext.scopeVal = getCascaderValue(innerValue.value, valueType, multiple);
      } else {
        statusContext.scopeVal = multiple ? [] : '';
      }

      if (!statusContext.treeStore) return;
      updateExpand();
      updatedTreeNodes();
    },
    { immediate: true },
  );

  watch(
    () => innerPopupVisible.value && isFilterable.value,
    (visible) => {
      const { setInputVal } = cascaderContext.value;
      if (visible) {
        setInputVal('');
      }
    },
  );

  watch(
    () => statusContext.inputVal,
    (val) => {
      if (props.checkStrictly && props.filterable) {
        if (val) {
          const flattenedOptions = flattenOptions(props.options);
          statusContext.treeStore.reload(flattenedOptions);
          statusContext.treeStore.refreshNodes();
        } else {
          statusContext.treeStore.reload(props.options);
        }
        const expand = calculateExpand(statusContext.treeStore, cascaderContext.value.value);
        statusContext.treeStore.replaceExpanded(expand);
        updateExpand();
      }
      updatedTreeNodes();
    },
  );

  const getCascaderItems = (arrValue: CascaderValue[]) => {
    const options: TreeOptionData[] = [];
    arrValue.forEach((value) => {
      const nodes = statusContext.treeStore?.getNodes(value);
      nodes && nodes[0] && options.push(nodes[0].data);
    });
    return options;
  };

  return {
    cascaderContext,
    isFilterable,
    innerValue,
    getCascaderItems,
  };
};
