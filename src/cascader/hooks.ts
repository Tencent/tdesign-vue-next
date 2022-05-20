import { Ref, reactive, computed, toRefs, watch, nextTick } from 'vue';
import isEqual from 'lodash/isEqual';

import TreeStore from '../_common/js/tree/tree-store';
import { useFormDisabled } from '../form/hooks';
import useVModel from '../hooks/useVModel';
import useDefaultValue from '../hooks/useDefaultValue';
import { getTreeValue, getCascaderValue, isEmptyValues, isValueInvalid } from './core/helper';
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
        visible: innerPopupVisible.value,
        ...statusContext,
        setTreeNodes: (nodes: TreeNode[]) => {
          statusContext.treeNodes = nodes;
        },
        setValue: (val: CascaderValue, source: CascaderChangeSource, node?: TreeNodeModel) => {
          if (isEqual(val, statusContext.scopeVal)) return;
          setInnerValue(val, { source, node });
        },
        setVisible: setPopupVisible,
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

// 内聚组件核心的副作用与状态处理
export const useCascaderContext = (props: TdCascaderProps) => {
  const disabled = useFormDisabled();
  const { value, modelValue, popupVisible } = toRefs(props);
  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
  const [innerPopupVisible, setPopupVisible] = useDefaultValue(
    popupVisible,
    false,
    props.onPopupVisibleChange,
    'popupVisible',
  );
  const { cascaderContext, statusContext } = useContext(props, setInnerValue, innerPopupVisible, setPopupVisible);

  // 更新treeNodes
  const updatedTreeNodes = () => {
    const { inputVal, treeStore, setTreeNodes } = cascaderContext.value;
    treeNodesEffect(inputVal, treeStore, setTreeNodes);
  };

  // 更新节点展开状态
  const updateExpend = () => {
    const { value, treeStore } = cascaderContext.value;
    const { expend } = statusContext;
    treeStoreExpendEffect(treeStore, value, expend);
    treeStore.replaceChecked(getTreeValue(value));
  };

  watch(
    () => props.options,
    () => {
      const { options, keys = {} } = props;
      const { treeStore } = statusContext;

      if (!options.length && !treeStore) return;

      if (!treeStore) {
        const treeStore = new TreeStore({
          keys: {
            ...keys,
            children: typeof keys.children === 'string' ? keys.children : 'children',
          },
          checkable: true,
          expandMutex: true,
          expandParent: true,
          onLoad: () => {
            nextTick(() => {
              treeStore.refreshNodes();
              updatedTreeNodes();
            });
          },
        });
        treeStore.append(options);
        statusContext.treeStore = treeStore;
      } else {
        treeStore.reload(options);
        treeStore.refreshNodes();
      }
      updateExpend();
      updatedTreeNodes();
    },
    { immediate: true },
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
        console.warn('TDesign Cascader Warn:', 'cascader props value invalid, v-model automatic calibration');
      }

      if (!isEmptyValues(innerValue)) {
        statusContext.scopeVal = getCascaderValue(innerValue.value, valueType, multiple);
      }

      if (!statusContext.treeStore) return;
      updateExpend();
      updatedTreeNodes();
    },
    { immediate: true },
  );

  watch(
    () => innerPopupVisible.value && props.filterable,
    (visible) => {
      const { setInputVal } = cascaderContext.value;
      if (visible) {
        setInputVal('');
      }
    },
  );

  watch(
    () => statusContext.inputVal,
    () => {
      updatedTreeNodes();
    },
  );

  return {
    setInnerValue,
    cascaderContext,
  };
};
