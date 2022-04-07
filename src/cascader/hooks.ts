import { reactive, computed, onMounted, toRefs, nextTick, watchEffect } from 'vue';

import isEqual from 'lodash/isEqual';
import { getTreeValue, getValue, isEmptyValues, valueValidate } from './utils/helper';
import { treeNodesEffect, treeStoreExpendEffect } from './utils/cascader';
import TreeStore from '../_common/js/tree/tree-store';

import { useFormDisabled } from '../form/hooks';
import useVModel from '../hooks/useVModel';

import {
  TreeNode,
  TreeNodeValue,
  TdCascaderProps,
  TreeNodeModel,
  CascaderChangeSource,
  CascaderValue,
  CascaderContextType,
} from './interface';

// 全局状态
export const useContext = (props: TdCascaderProps, setInnerValue: TdCascaderProps['onChange']) => {
  const statusContext = reactive({
    inputWidth: 0,
    visible: false,
    treeStore: null,
    inputVal: '',
    scopeVal: undefined,
    treeNodes: [],
    filterActive: false,
    expend: [],
  });

  return {
    statusContext,
    cascaderContext: computed<CascaderContextType>(() => {
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
        loading,
        valueType,
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
        loading,
        valueType,
        ...statusContext,
        setTreeNodes: (nodes: TreeNode[]) => {
          statusContext.treeNodes = nodes;
        },
        setValue: (val: CascaderValue, source: CascaderChangeSource, node?: TreeNodeModel) => {
          if (isEqual(val, statusContext.scopeVal)) return;
          setInnerValue(val, { source, node });
        },
        setVisible: (val: boolean) => {
          statusContext.visible = val;
        },
        setFilterActive: (val: boolean) => {
          statusContext.filterActive = val;
        },
        setInputVal: (val: string) => {
          statusContext.inputVal = val;
        },
        setExpend: (val: TreeNodeValue[]) => {
          statusContext.expend = val;
        },
        setInputWidth: (val: number) => {
          statusContext.inputWidth = val;
        },
      };
    }),
  };
};

// 内聚组件状态
export const useCascaderContext = (props: TdCascaderProps) => {
  const disabled = useFormDisabled();
  const { value, modelValue } = toRefs(props);

  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

  const { cascaderContext, statusContext } = useContext(props, setInnerValue);

  // 更新treeNodes
  const updatedTreeNodes = () => {
    const { inputVal, treeStore, setTreeNodes } = cascaderContext.value;
    treeNodesEffect(inputVal, treeStore, setTreeNodes);
  };

  // 更新节点展开状态
  const updateExpend = () => {
    const { value, treeStore } = cascaderContext.value;
    const { expend } = statusContext;
    if (!treeStore) return;
    treeStoreExpendEffect(treeStore, value, expend);
    treeStore.replaceChecked(getTreeValue(value));
  };

  // 创建单个 cascader 节点
  watchEffect(() => {
    const { keys, checkStrictly, lazy, load, options, valueMode = 'onlyLeaf' } = props;
    if (!options || (Array.isArray(options) && !options.length)) return;

    const treeStore = new TreeStore({
      keys: keys || {},
      checkable: true,
      checkStrictly,
      expandMutex: true,
      expandParent: true,
      disabled: disabled.value,
      load,
      lazy,
      valueMode,
      onLoad: () => {
        setTimeout(() => {
          treeStore.refreshNodes();
          updatedTreeNodes();
        }, 0);
      },
    });
    treeStore.append(options);

    statusContext.treeStore = treeStore;
    // 初始化状态
    nextTick(() => {
      updateExpend();
      updatedTreeNodes();
    });
  });

  watchEffect(() => {
    const { valueType, multiple } = props;
    if (isEqual(innerValue.value, statusContext.scopeVal)) return;
    statusContext.scopeVal = getValue(innerValue.value, valueType, multiple);
    updateExpend();
    updatedTreeNodes();
  });

  watchEffect(() => {
    const { setInputVal } = cascaderContext.value;
    if (!statusContext.filterActive) {
      setInputVal('');
    }
  });

  watchEffect(() => {
    const { value, setExpend } = cascaderContext.value;
    if (!getTreeValue(value).length) {
      setExpend([]);
    }
    updatedTreeNodes();
  });

  onMounted(() => {
    const { setValue, multiple, valueType } = cascaderContext.value;
    if (valueValidate(innerValue.value, cascaderContext.value)) {
      const val: CascaderValue = multiple ? [] : '';
      setValue(val, 'invalid-value');
      console.warn('TDesign Cascader Warn:', 'cascader props value invalid, v-model automatic calibration');
    }
    if (!isEmptyValues(innerValue)) {
      statusContext.scopeVal = getValue(innerValue.value, valueType, multiple);
    }
  });

  return {
    setInnerValue,
    cascaderContext,
  };
};
