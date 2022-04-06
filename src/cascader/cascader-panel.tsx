import { defineComponent, onMounted, toRefs, nextTick, watchEffect } from 'vue';

// utils
import isEqual from 'lodash/isEqual';
import TreeStore from '../_common/js/tree/tree-store';
import { getTreeValue, getValue, isEmptyValues } from './utils/helper';

// common logic
import { treeNodesEffect, treeStoreExpendEffect } from './utils/cascader';

// component
import Panel from './components/Panel';

// types
import props from './props';
import { CascaderValue } from './type';

// hooks
import { useFormDisabled } from '../form/hooks';
import SelectInput from '../select-input';
import useVModel from '../hooks/useVModel';
import useContext from './useContext';

export default defineComponent({
  name: 'TCascaderPanel',

  components: {
    Panel,
  },

  props: { ...props, haveInput: Boolean },

  setup(props, { slots }) {
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
      const { disabled, keys, checkStrictly, lazy, load, options, valueMode = 'onlyLeaf' } = props;
      if (!options || (Array.isArray(options) && !options.length)) return;

      const treeStore = new TreeStore({
        keys: keys || {},
        checkable: true,
        checkStrictly,
        expandMutex: true,
        expandParent: true,
        disabled,
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
      const { setValue, showAllLevels } = cascaderContext.value;
      const { multiple, valueType } = props;
      if ((multiple && !Array.isArray(innerValue)) || (!multiple && Array.isArray(innerValue) && !showAllLevels)) {
        const val: CascaderValue = multiple ? [] : '';
        setValue(val, 'invalid-value');
        console.warn('TDesign Cascader Warn:', 'cascader props value invalid, v-model automatic calibration');
      }
      if (!isEmptyValues(innerValue)) {
        statusContext.scopeVal = getValue(innerValue.value, valueType, multiple);
      }
    });

    const renderPanel = () => (
      <panel empty={props.empty} trigger={props.trigger} cascaderContext={cascaderContext.value}>
        {{ empty: slots.empty }}
      </panel>
    );

    return () =>
      props.haveInput ? (
        <SelectInput
          value={props}
          popup-props={{ overlayStyle: { width: 'auto' } }}
          v-slots={{
            panel: () => renderPanel(),
          }}
        />
      ) : (
        renderPanel()
      );
  },
});
