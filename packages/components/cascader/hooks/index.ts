import { Ref, reactive, computed, toRefs, watch, nextTick } from 'vue';
import { isEqual } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { isString } from 'lodash-es';

import TreeStore from '@tdesign/common-js/tree/tree-store';
import { useDisabled } from '../../hooks/useDisabled';
import useVModel from '../../hooks/useVModel';
import useDefaultValue from '../../hooks/useDefaultValue';
import {
  getTreeValue,
  getCascaderValue,
  isEmptyValues,
  isValueInvalid,
  treeNodesEffect,
  treeStoreExpendEffect,
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
    replicaValue: [],
  });

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
        visible: innerPopupVisible.value,
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
        setExpend: (val: TreeNodeValue[]) => {
          statusContext.expend = val;
        },
        setReplicaValue: (val: string[]) => {
          statusContext.replicaValue = val;
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
    const { inputVal, treeStore, setTreeNodes } = cascaderContext.value;
    treeNodesEffect(inputVal, treeStore, setTreeNodes, props.filter);
  };

  // 更新节点展开状态
  const updateExpend = () => {
    const { value, treeStore } = cascaderContext.value;
    const { expend } = statusContext;
    treeStoreExpendEffect(treeStore, value, expend, props.valueType, props.options, innerValue.value, props.multiple);
    treeStore.replaceChecked(getTreeValue(value));
  };

  /**
   * 级联选择器选项接口
   */
  interface CascaderOption {
    label: string;
    value: string | number;
    children?: CascaderOption[];
    [key: string]: any; // 允许其他属性
  }

  /**
   * 当 valueType='full'时,将级联选择器数据中的每个子节点 value 转换为完整路径形式
   * @param data - 级联选择器数据
   * @returns 处理后的数据
   */
  function transformCascaderValues(data: any[], parentReplicaValue = ''): any[] {
    return data.map((item) => {
      const currentReplicaValue = parentReplicaValue ? `${parentReplicaValue}-${item.value}` : item.value;
      const newItem = {
        ...item,
        replicaValue: currentReplicaValue,
      };

      if (item.children && Array.isArray(item.children)) {
        newItem.children = transformCascaderValues(item.children, currentReplicaValue);
      }

      return newItem;
    });
  }

  watch(
    () => props.options,
    () => {
      const { options, keys = {}, checkStrictly, lazy, load, valueMode, valueType } = props;
      const { treeStore } = statusContext;

      if (!options.length && !treeStore) return;

      const transformedOptionData =
        valueType === 'full' ? transformCascaderValues(options as CascaderOption[]) : options;
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
        store.append(transformedOptionData);
        statusContext.treeStore = store;
      } else {
        treeStore.reload(transformedOptionData);
        treeStore.refreshNodes();
      }
      updateExpend();
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
      } else {
        statusContext.scopeVal = multiple ? [] : '';
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
    () => {
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
