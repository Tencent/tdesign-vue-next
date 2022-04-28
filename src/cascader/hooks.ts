import { reactive, computed, onMounted, toRefs, nextTick, watchEffect, watch } from 'vue';
import isEqual from 'lodash/isEqual';

import TreeStore from '../_common/js/tree/tree-store';
import { useFormDisabled } from '../form/hooks';
import useVModel from '../hooks/useVModel';
import { getTreeValue, getCascaderValue, isEmptyValues, valueValidate } from './core/helper';
import { treeNodesEffect, treeStoreExpendEffect } from './core/effect';

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
    visible: false,
    treeStore: null,
    inputVal: null,
    scopeVal: undefined,
    treeNodes: [],
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
        setInputVal: (val: string) => {
          statusContext.inputVal = val;
        },
        setExpend: (val: TreeNodeValue[]) => {
          statusContext.expend = val;
        },
      };
    }),
  };
};

// 初始化逻辑与状态受控处理
// 内聚组件状态
export const useCascaderContext = (props: TdCascaderProps) => {
  const disabled = useFormDisabled();
  const { value, modelValue } = toRefs(props);

  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

  const { cascaderContext, statusContext } = useContext(props, setInnerValue);

  onMounted(() => {
    const { setValue, multiple, valueType } = cascaderContext.value;
    if (valueValidate(innerValue.value, cascaderContext.value)) {
      const val: CascaderValue = multiple ? [] : '';
      setValue(val, 'invalid-value');
      console.warn('TDesign Cascader Warn:', 'cascader props value invalid, v-model automatic calibration');
    }
    if (!isEmptyValues(innerValue)) {
      statusContext.scopeVal = getCascaderValue(innerValue.value, valueType, multiple);
    }
  });

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
    const { options } = props;
    if (!options.length) return;

    const { treeStore } = statusContext;
    if (!treeStore) {
      const treeStore = new TreeStore({});
      treeStore.append(options);
      statusContext.treeStore = treeStore;
    } else {
      if (treeStore.config.options === options) return;
      treeStore.reload(options);
      treeStore.refreshNodes();
    }

    nextTick(() => {
      updateExpend();
      updatedTreeNodes();
    });
  });

  const update = (treeProps: any) => {
    const { treeStore } = statusContext;
    if (!treeStore) return;
    treeStore.setConfig(treeProps);
  };

  watchEffect(() => {
    const { keys, checkStrictly, lazy, load, options, valueMode = 'onlyLeaf' } = props;
    const treeProps = {
      keys: keys || {},
      checkable: true,
      checkStrictly,
      expandMutex: true,
      expandParent: true,
      disabled,
      load,
      lazy,
      valueMode,
      options,
    };
    // console.log(treeProps);
    // update(treeProps);
  });

  watch([innerValue], () => {
    const { valueType, multiple } = props;
    if (isEqual(innerValue.value, statusContext.scopeVal)) return;
    statusContext.scopeVal = getCascaderValue(innerValue.value, valueType, multiple);
    updateExpend();
    updatedTreeNodes();
  });

  watch(
    () => statusContext.inputVal,
    () => {
      const { inputVal, treeStore, setTreeNodes } = cascaderContext.value;
      treeNodesEffect(inputVal, treeStore, setTreeNodes);
    },
  );

  watch(
    () => statusContext.visible,
    (visible) => {
      const { setInputVal } = cascaderContext.value;
      if (visible) {
        setInputVal('');
      }
    },
  );

  return {
    setInnerValue,
    cascaderContext,
  };
};
