import { defineComponent, VNode, Transition } from 'vue';
import isEqual from 'lodash/isEqual';

// utils
import { prefix } from '../config';
import TreeStore from '../_common/js/tree/tree-store';
import { emitEvent } from '../utils/event';
import { getPropsApiByEvent } from '../utils/helper';

// common logic
import { getTreeValue, treeNodesEffect, treeStoreExpendEffect } from './utils/cascader';

// component
import Panel from './components/Panel';
import Popup, { PopupProps } from '../popup/index';
import InputContent from './components/InputContent';

// types
import TreeNode from '../_common/js/tree/tree-node';
import {
  ListenersType, TreeNodeValue, EVENT_NAME_WITH_KEBAB, TreeOptionData,
  CascaderContextType,
} from './interface';
import props from './props';

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

  emits: ['visible-change', 'load', 'update', 'change', 'remove', 'input'],

  data() {
    return {
      visible: false,
      treeStore: null,
      inputVal: '',
      model: this.value as TreeNodeValue | TreeNodeValue[],
      treeNodes: [],
      filterActive: false,
      expend: [] as TreeNodeValue[],
    };
  },

  computed: {
    cascaderContext(): CascaderContextType {
      const {
        size = 'medium',
        disabled = false,
        checkStrictly = false,
        lazy = true,
        multiple = false,
        filterable = false,
        clearable = false,
        checkProps = {},
        max = undefined,
        showAllLevels = true,
        collapseTags,
      } = this;

      const stateFns = {
        setTreeNodes: (nodes: TreeNode[]) => {
          this.treeNodes = nodes;
        },
        setModel: (val: TreeNodeValue | TreeNodeValue[]) => {
          this.model = val;
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
      };

      const {
        model,
        visible,
        treeStore,
        treeNodes,
        filterActive,
        inputVal,
      } = this;

      return {
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
        model,
        visible,
        treeStore,
        treeNodes,
        filterActive,
        inputVal,
        collapseTags,
        ...stateFns,
      };
    },
    treeValue() {
      return getTreeValue(this.model);
    },
  },

  watch: {
    model: {
      handler(val) {
        if (!this.treeStore) return;
        if (!isEqual(val, this.value)) {
          this.$emit('change', this.model);
        }
        this.updatedTreeNodes();
      },
    },
    value: {
      handler(val) {
        // 处理外部传进来的value
        if (isEqual(val, this.model)) return;
        this.model = val;
      },
      immediate: true,
    },
    inputVal() {
      this.updatedTreeNodes();
    },
    filterActive() {
      const { cascaderContext: { filterActive } } = this;
      if (!filterActive) {
        this.inputVal = '';
      }
    },
    treeValue() {
      this.updateExpend();
    },
  },

  mounted() {
    this.init();
    if (this.multiple && !Array.isArray(this.model)) {
      this.model = [];
    }
    if (!this.multiple && Array.isArray(this.model)) {
      this.model = '';
    }
    ['checkStrictly', 'disabled', 'keys', 'lazy', 'load', 'options', 'valueMode'].forEach((key) => {
      this.$watch(key, () => {
        this.init();
      });
    });
  },

  methods: {
    // 创建单个 cascader 节点
    init() {
      const {
        disabled,
        keys,
        checkStrictly = false,
        lazy = true,
        load,
        options,
        valueMode = 'onlyLeaf',
      } = this;
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
        cascaderContext: { treeStore },
        treeValue,
        expend,
      } = this;
      treeStoreExpendEffect(treeStore, treeValue, expend);
      treeStore.replaceChecked(treeValue);
    },
  },
  render(): VNode {
    const {
      visible,
      trigger,
      empty,
      $attrs,
      cascaderContext,
    } = this;

    const popupProps = this.popupProps as PopupProps;

    const listeners: ListenersType = {};

    EVENT_NAME_WITH_KEBAB.forEach((eventName) => {
      listeners[getPropsApiByEvent(eventName)] = (params: any) => {
        emitEvent(this, eventName, params);
      };
    });

    return (<div ref="cascader" >
      <Popup
        ref="popup"
        overlayClassName={`${name}-dropdown`}
        placement="bottom-left"
        visible={visible}
        trigger={popupProps?.trigger || 'click'}
        expandAnimation={true}
        {...popupProps}
        v-slots={{
          content: () => <panel empty={empty} trigger={trigger} cascaderContext={cascaderContext} onChange={listeners.onChange}/>,
        }}
      >
        <InputContent {...$attrs} cascaderContext={cascaderContext} listeners={listeners}/>
      </Popup>
    </div >);
  },
});
