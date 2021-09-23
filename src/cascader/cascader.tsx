import { defineComponent, VNode, Transition } from 'vue';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

// utils
import { prefix } from '../config';
import TreeStore from '../_common/js/tree/tree-store';
import { emitEvent } from '../utils/event';
import { getPropsApiByEvent } from '../utils/helper';

// component
import Panel from './components/Panel';
import Popup, { PopupProps } from '../popup/index';
import InputContent from './components/InputContent';

// types
import TreeNode from '../_common/js/tree/tree-node';
import { ContextType, TreeNodeValue, EVENT_NAME_WITH_KEBAB } from './interface';
import { CascaderValue } from './type';
import { OptionData } from '../common';
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
      model: '' as TreeNodeValue | TreeNodeValue[],
      treeNodes: [],
      filterActive: false,
    };
  },

  computed: {
    cascaderContext() {
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
      } = this;
      const {
        model,
        visible,
        treeStore,
        treeNodes,
        filterActive,
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
        ...this.mutationMethods(),
      };
    },
    panels(): TreeNode[][] {
      const panels: TreeNode[][] = [];
      this.treeNodes.forEach((node: TreeNode) => {
        if (panels[node.level]) {
          panels[node.level].push(node);
        } else {
          panels[node.level] = [node];
        }
      });
      return panels;
    },
  },

  watch: {
    value: {
      handler(val) {
        // 处理外部传进来的value
        if (isEqual(val, this.model)) return;
        this.model = val;
        // 在下拉菜单没打开时候，说明是非激活状态，更新路径
        this.$nextTick(() => {
          if (!this.visible && this.options.length) {
            this.refresh();
          }
        });
      },
      immediate: true,
    },
    visible(val) {
      this.$emit('visible-change', val);
    },
    model: {
      handler(val) {
        this.$nextTick(() => {
          if (!this.store) return;
          if (!this.multiple) {
            this.store.replaceChecked([val]);
          } else {
            this.store.replaceChecked(val);
          }
          this.refresh(false);
        });
        if (!isEqual(val, this.value)) {
          this.$emit('input', cloneDeep(this.model));
        }
      },
      immediate: true,
    },
    options: {
      handler(val) {
        this.$nextTick(() => {
          if (val.length) {
            this.build();
          }
        });
      },
      deep: true,
    },
  },

  created() {
    this.build();
  },

  methods: {
    // 创建单个 cascader 节点
    build() {
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
      });
      this.treeStore.append(options);
      this.refresh();
    },

    refresh(init = true) {
      const { value, treeStore } = this;
      if (init) {
        // 根据当前value更新树形结构选中值
        let treeValue: TreeNodeValue[] = [];
        if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === 'object') {
            treeValue = (value as OptionData[]).map((val) => val.value);
          }
        } else if (value) {
          if (typeof value === 'object') {
            treeValue = [(value as OptionData).value];
          } else {
            treeValue = [value];
          }
        }
        treeStore.resetExpanded();
        if (Array.isArray(treeValue)) {
          treeStore.setChecked(treeValue);
        }
        // 初始化展开状态
        if (Array.isArray(treeValue)) {
          const expandedMap = new Map();
          // 完整展开第一个值
          const [val] = treeValue;
          if (val) {
            expandedMap.set(val, true);
            const node = treeStore.getNode(val);
            node.getParents().forEach((tn: TreeNode) => {
              expandedMap.set(tn.value, true);
            });

            const expandedArr = Array.from(expandedMap.keys());
            treeStore.setExpanded(expandedArr);
          }
        }
      }
      treeStore.refreshNodes();
      const allNodes = treeStore.getNodes();
      this.treeNodes = allNodes.filter((node: TreeNode) => node.visible);
    },
    onVisibleChange(val: boolean) {
      if (this.disabled) {
        return false;
      }
      this.visible = val;
    },
    mutationMethods() {
      return {
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
      };
    },
  },
  render(): VNode {
    const {
      visible,
      onVisibleChange,
      trigger,
      empty,
      $attrs,
      cascaderContext,
    } = this;
    const popupProps = this.popupProps as PopupProps;

    const listeners = {};

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
        onVisibleChange={
          (e: any) => onVisibleChange(e)
        }
        expandAnimation={true}
        {...popupProps}
        v-slots={{
          content: () => <panel empty={empty} trigger={trigger} cascaderContext={cascaderContext} onChange={(checked: CascaderValue, ctx: ContextType) => {
            this.$emit('change', checked, ctx);
          }}/>,
        }}
      >
        <InputContent {...$attrs} cascaderContext={cascaderContext} listeners={listeners}/>
      </Popup>
    </div >);
  },
});
