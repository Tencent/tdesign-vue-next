import { defineComponent, VNode, Transition } from 'vue';

// utils
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { prefix } from '../config';
import TreeStore from '../_common/js/tree/tree-store';
import { emitEvent } from '../utils/event';
import { getPropsApiByEvent } from '../utils/helper';
import { getTreeValue } from './utils/helper';

// common logic
import { treeNodesEffect, treeStoreExpendEffect } from './utils/cascader';

// component
import Panel from './components/Panel';
import Popup, { PopupProps } from '../popup/index';
import InputContent from './components/InputContent';

// types
import TreeNode from '../_common/js/tree/tree-node';
import { ListenersType, TreeNodeValue, EVENT_NAME_WITH_KEBAB, CascaderContextType, TdCascaderProps } from './interface';
import props from './props';
import { CascaderChangeSource, CascaderValue } from './type';
import { TreeNodeModel } from '../tree';

const name = `${prefix}-cascader`;

export default defineComponent({
  name,

  components: {
    Popup,
    Panel,
    Transition,
    InputContent,
  },

  props: {
    ...props,
  },

  emits: ['change', 'remove', 'blur', 'focus'],

  data() {
    return {
      inputWidth: 0,
      visible: false,
      treeStore: null,
      inputVal: '',
      scopeVal: this.defaultValue as any,
      treeNodes: [],
      filterActive: false,
      expend: [] as TreeNodeValue[],
    };
  },

  computed: {
    stateFns() {
      return {
        setTreeNodes: (nodes: TreeNode[]) => {
          this.treeNodes = nodes;
        },
        setValue: (val: CascaderValue, source: CascaderChangeSource, node: TreeNodeModel) => {
          if (isEqual(val, this.scopeVal)) return;
          emitEvent<Parameters<TdCascaderProps['onChange']>>(this, 'change', val, { source, node });
        },
        setVisible: (val: boolean) => {
          this.visible = val;
        },
        setFilterActive: (val: boolean) => {
          this.filterActive = val;
        },
        setInputVal: (val: string) => {
          this.inputVal = val;
        },
        setExpend: (val: TreeNodeValue[]) => {
          this.expend = val;
        },
        setInputWidth: (val: number) => {
          this.inputWidth = val;
        },
      };
    },
    cascaderContext(): CascaderContextType {
      const value = this.scopeVal as TdCascaderProps['value'];
      const {
        size = 'medium',
        checkStrictly = false,
        lazy = true,
        multiple = false,
        filterable = false,
        clearable = false,
        checkProps = {},
        max = 0,
        disabled,
        showAllLevels = true,
        minCollapsedNum = 0,
        loading,
      } = this;

      const { visible, treeStore, treeNodes, filterActive, inputVal, inputWidth } = this;

      return {
        loading,
        size,
        disabled,
        checkStrictly,
        lazy,
        multiple,
        filterable,
        checkProps,
        clearable,
        showAllLevels,
        max,
        value,
        visible,
        treeStore,
        treeNodes,
        filterActive,
        inputVal,
        inputWidth,
        minCollapsedNum,
        ...this.stateFns,
      };
    },
  },

  watch: {
    // 处理外部传进来的value
    value: {
      handler(val) {
        if (isEqual(val, this.scopeVal)) return;
        this.scopeVal = val;
        this.updateExpend();
        this.updatedTreeNodes();
      },
    },
    inputVal() {
      const {
        cascaderContext: { value, setExpend },
      } = this;
      if (!getTreeValue(value).length) {
        setExpend([]);
      }
      this.updatedTreeNodes();
    },
    filterActive() {
      const {
        cascaderContext: { filterActive },
      } = this;
      if (!filterActive) {
        this.inputVal = '';
      }
    },
  },

  mounted() {
    const {
      value,
      multiple,
      cascaderContext: { setValue },
    } = this;
    if ((multiple && !Array.isArray(value)) || (!multiple && Array.isArray(value))) {
      const val: CascaderValue = multiple ? [] : '';
      setValue(val, 'invalid-value');
      console.warn('TDesign Cascader Warn:', 'cascader props value invalid, v-model automatic calibration');
    }
    if (!isEmpty(value)) {
      this.scopeVal = value;
    }

    this.init();
    ['checkStrictly', 'disabled', 'keys', 'lazy', 'load', 'options', 'valueMode'].forEach((key) => {
      this.$watch(key, () => {
        this.init();
      });
    });
  },

  methods: {
    // 创建单个 cascader 节点
    init() {
      const { disabled, keys, checkStrictly = false, lazy = true, load, options, valueMode = 'onlyLeaf' } = this;
      if (!options || (Array.isArray(options) && !options.length)) return;

      this.treeStore = new TreeStore({
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
            this.treeStore.refreshNodes();
            this.updatedTreeNodes();
          }, 0);
        },
      });
      this.treeStore.append(options);

      // 初始化状态
      this.$nextTick(() => {
        this.updateExpend();
        this.updatedTreeNodes();
      });
    },
    // 更新treeNodes
    updatedTreeNodes() {
      const {
        cascaderContext: { inputVal, treeStore, setTreeNodes },
      } = this;
      treeNodesEffect(inputVal, treeStore, setTreeNodes);
    },
    // 更新节点展开状态
    updateExpend() {
      const {
        cascaderContext: { treeStore, value },
        expend,
      } = this;
      if (!treeStore) return;
      treeStoreExpendEffect(treeStore, value, expend);
      treeStore.replaceChecked(getTreeValue(value));
    },
  },
  render(): VNode {
    const { visible, trigger, empty, $attrs, cascaderContext, $slots, placeholder, collapsedItems } = this;

    const popupProps = this.popupProps as PopupProps;

    const listeners: ListenersType = {};

    EVENT_NAME_WITH_KEBAB.forEach((eventName) => {
      listeners[getPropsApiByEvent(eventName)] = (...args: any[]) => {
        emitEvent(this, eventName, ...args);
      };
    });

    return (
      <div ref="cascader">
        <Popup
          ref="popup"
          overlayClassName={`${name}__dropdown`}
          placement="bottom-left"
          visible={visible}
          trigger={popupProps?.trigger || 'click'}
          expandAnimation={true}
          v-slots={{
            content: () => (
              <panel empty={empty} trigger={trigger} cascaderContext={cascaderContext}>
                {{ empty: $slots.empty }}
              </panel>
            ),
          }}
          {...popupProps}
        >
          <InputContent
            {...$attrs}
            cascaderContext={cascaderContext}
            placeholder={placeholder}
            collapsedItems={collapsedItems}
            listeners={listeners}
          >
            {{ collapsedItems: $slots.collapsedItems }}
          </InputContent>
        </Popup>
      </div>
    );
  },
});
