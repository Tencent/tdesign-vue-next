import { defineComponent, VNode, Transition } from 'vue';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import TreeStore from '../_common/js/tree/tree-store';
import TreeNode from '../_common/js/tree/tree-node';
import { prefix } from '../config';
import { renderTNodeJSX } from '../utils/render-tnode';
import CLASSNAMES from '../utils/classnames';
import TIconChevronDrown from '../icon/chevron-down';
import IIconClose from '../icon/close-circle-filled';
import Input from '../input/index';
import Popup, { PopupProps } from '../popup/index';
import Tag from '../tag/index';
import item from './item';
import { ClassName, OptionData } from '../common';
import props from './props';
import getLocalRecevierMixins from '../locale/local-receiver';
import mixins from '../utils/mixins';

import {
  TreeNodeValue,
  TypeValueMode,
  TypeEventState,
} from '../tree/types';

const CascaderLocalReceiver = getLocalRecevierMixins('cascader');
const name = `${prefix}-cascader`;

type TypeContext = { e?: Event; node?: TreeNode };
type CascaderDataType = {
  model: TreeNodeValue | TreeNodeValue[];
  [key: string]: any;
};

export default defineComponent({
  ...mixins(CascaderLocalReceiver),

  name,

  components: {
    TIconChevronDrown,
    TInput: Input,
    Popup,
    item,
    Tag,
    Transition,
  },

  provide(): any {
    return {
      tCascader: this,
    };
  },

  props: {
    ...props,
  },

  emits: ['visible-change', 'load', 'update', 'change', 'remove', 'input'],

  data(): CascaderDataType {
    return {
      isHover: false,
      name,
      model: '',
      visible: false,
      initValue: false,
      store: null,
      nodesMap: null,
      treeNodes: [],
      path: [],
    };
  },

  computed: {
    cascaderInnerClasses(): Array<string | object> {
      return [
        `${name}`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
          [CLASSNAMES.STATUS.active]: this.visible,
          [CLASSNAMES.SIZE[this.size]]: this.size,
          [`${name}-is-multiple`]: this.multiple,
        },
      ];
    },
    iconClass(): ClassName {
      return [
        `${name}-icon`,
        {
          [CLASSNAMES.STATUS.visible]: this.visible,
        },
      ];
    },
    arrowClass(): ClassName {
      const { visible } = this;
      return [
        `${name}-icon`,
        `${prefix}-fake-arrow`,
        {
          [`${prefix}-fake-arrow--active`]: visible,
        }];
    },
    tipsClass(): ClassName {
      return [
        `${name}-loading-tips`,
        {
          [CLASSNAMES.SIZE[this.size]]: this.size,
        },
      ];
    },
    showPlaceholder(): boolean {
      if (
        !this.filterable
        && ((typeof this.model === 'string' && this.model === '')
          || (Array.isArray(this.model) && !this.model.length)
          || this.model === null)
      ) {
        return true;
      }
      return false;
    },
    showClose(): boolean {
      return !!(
        this.clearable
        && this.isHover
        && !this.disabled
        && ((!this.multiple && this.model) || (this.multiple && (this.model as TreeNodeValue[]).length))
      );
    },
    showArrow(): boolean {
      return (
        !this.clearable
        || !this.isHover
        || this.disabled
        || (!this.multiple && !this.model)
        || (this.multiple && !(this.model as TreeNodeValue[]).length)
      );
    },
    showFilter(): boolean {
      return false;
    },
    showLoading(): boolean {
      return false;
    },
    selectedSingle(): string {
      const {
        multiple, model, path, showAllLevels,
      } = this;
      if (!multiple && model !== '') {
        if (path.length) {
          return (showAllLevels
            ? path.map((node: TreeNode) => node.label).join(' / ')
            : path[path.length - 1].label);
        }
        return model as string;
      }
      return '';
    },
    selectedMultiple(): TreeNode[] {
      if (this.multiple && (this.model as TreeNodeValue[]).length) {
        return this.path.length ? this.path : this.model;
      }
      return [];
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
            const node = this.store.getNodes(val);
            this.path = node[0].getPath();
          } else {
            this.store.replaceChecked(val);
            this.path = (val as TreeNodeValue[]).map((item: TreeNodeValue) => {
              const node = this.store.getNodes(item);
              return node[0];
            });
          }
          this.refresh(false);
        });
        if (!isEqual(val, this.value)) {
          this.$emit('input', cloneDeep(this.model));
        }
      },
      immediate: true,
    },
    // When the options change, rebuild the tree
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
      const list = this.options;
      const {
        activable,
        activeMultiple,
        checkable = true,
        checkStrictly = false,
        expandAll,
        expandLevel,
        expandMutex = true,
        expandParent = true,
        disabled,
        load,
        lazy,
        valueMode,
        filter,
        keys,
      } = this;
      if (list && list.length > 0) {
        const store = new TreeStore({
          activable,
          activeMultiple,
          checkable,
          checkStrictly,
          expandAll,
          expandLevel,
          expandMutex,
          expandParent,
          disabled,
          load,
          lazy,
          keys,
          valueMode: valueMode as TypeValueMode,
          filter,
          onLoad: (info: TypeEventState) => {
            this.onStoreLoad(info);
          },
          onUpdate: (info: TypeEventState) => {
            this.onStoreUpdate(info);
          },
        });
        this.store = store;
        store.append(list);
        this.refresh();
      }
    },
    refresh(init = true) {
      const { value, store } = this;
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
        store.resetExpanded();
        if (Array.isArray(treeValue)) {
          store.setChecked(treeValue);
        }
        // 初始化展开状态
        if (Array.isArray(treeValue)) {
          const expandedMap = new Map();
          // 完整展开第一个值
          const [val] = treeValue;
          if (val) {
            expandedMap.set(val, true);
            const node = store.getNode(val);
            node.getParents().forEach((tn: TreeNode) => {
              expandedMap.set(tn.value, true);
            });

            const expandedArr = Array.from(expandedMap.keys());
            store.setExpanded(expandedArr);
          }
        }
      }
      store.refreshNodes();
      const allNodes = store.getNodes();
      this.treeNodes = allNodes.filter((node: TreeNode) => node.visible);
    },
    onStoreLoad(info: TypeEventState) {
      const event = new Event('load');
      const { node, data } = info;
      const state = {
        event,
        node,
        data,
      };
      this.$emit('load', state);
    },
    onStoreUpdate(info: TypeEventState) {
      const event = new Event('update');
      const { nodes } = info;
      const state = {
        event,
        nodes,
      };
      this.$emit('update', state);
      this.refresh(false);
    },
    onVisibleChange(val: boolean) {
      if (this.disabled) {
        return false;
      }
      this.visible = val;
    },
    // 点击cascader中的某一项，单选状态直接变更值
    handleExpand(ctx: TypeContext, trigger: 'hover' | 'click') {
      const { node } = ctx;
      const expanded = node.setExpanded(true);
      if (this.trigger === trigger) {
        this.store.replaceExpanded(expanded);
      }
      // 单选并且点击叶子节点
      if (!this.multiple && (node.isLeaf() || this.checkStrictly) && trigger === 'click') {
        this.store.resetChecked();
        const checked = node.setChecked(!node.isChecked());
        [this.model] = checked;
        this.$emit('change', this.model, ctx);
        this.visible = false;
      }
      return expanded;
    },
    // 多选状态下变更值
    handleChange(ctx: TypeContext) {
      const { disabled } = this;
      const { node } = ctx;
      if (!node || disabled || node.disabled) {
        return;
      }
      const checked = node.setChecked(!node.isChecked());
      this.model = checked;
      this.$emit('change', this.model, ctx);
    },
    // 多选状态下删除已选标签
    handleRemoveTag(ctx: TypeContext) {
      const { node } = ctx;
      if (this.disabled) {
        return false;
      }
      const checked = node.setChecked(!node.isChecked());
      this.model = checked;
      this.$emit('remove', ctx);
      this.$emit('change', this.model, ctx);
    },
    handleClearSelect(e: Event) {
      if (this.multiple) {
        this.model = [];
      } else {
        this.model = '';
      }
      this.store.resetChecked();
      this.store.resetExpanded();
      this.$emit('change', this.model, { e });
    },
    renderPlaceholder(): VNode {
      const {
        name,
        showPlaceholder,
        placeholder,
      } = this;
      return showPlaceholder
        ? <span class={`${name}-placeholder`}>{placeholder || this.t(this.locale.placeholder)}</span>
        : null;
    },
    renderSingleSelect(): VNode {
      const {
        name,
        multiple,
        showPlaceholder,
        showFilter,
        selectedSingle,
      } = this;

      return !multiple && !showPlaceholder && !showFilter
        ? <span title={selectedSingle} class={`${name}-content`}>
          {selectedSingle}
        </span> : null;
    },
    renderTag(): VNode[] {
      const {
        selectedMultiple,
        size,
        disabled,
        handleRemoveTag,
      } = this;
      return selectedMultiple.map((item: TreeNode, index) => <tag
        key={index}
        size={size}
        closable={!disabled && !item.disabled}
        disabled={disabled}
        onClose={(e: Event) => {
          handleRemoveTag({ e, node: item });
        }}
      > {item.label}</tag>);
    },
    renderArrowIcon(): VNode {
      return this.showArrow && !this.showLoading && (
        <svg class={this.arrowClass} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.75 5.7998L7.99274 10.0425L12.2361 5.79921" stroke="black" stroke-opacity="0.9" stroke-width="1.3"/>
        </svg>
      );
    },
    renderCloseIcon(): VNode {
      return this.showClose && (
        <transition name={`${prefix}-cascader-close-icon-fade`} appear>
          <IIconClose class={this.iconClass} size={this.size} onClick={this.handleClearSelect} />
        </transition>
      );
    },
    renderPanel(): VNode {
      const {
        name,
        panels,
        handleExpand,
        handleChange,
        getEmpty,
      } = this;
      const emptyContent = getEmpty();
      return (
        <div class={[`${name}-panel`, `${name}--normal`]}>
          {panels && panels.length ? panels.map((panel: TreeNode[], index) => (<ul class={
              [`${name}-menu`,
                { [`${name}-menu__seperator`]: index !== panels.length - 1 }]
            } key={index}>
              {panel.map((node: TreeNode) => <item
                key={node.value}
                node={node}
                onClick={(ctx: TypeContext) => {
                  handleExpand(ctx, 'click');
                }}
                onMouseenter={(ctx: TypeContext) => {
                  handleExpand(ctx, 'hover');
                }}
                onChange={handleChange}
              ></item>)}
            </ul>)) : emptyContent}
        </div>
      );
    },
    getEmpty() {
      const useLocale = !this.empty && !this.$slots.empty;
      return useLocale ? this.t(this.locale.empty) : <ul class={[`${name}-menu`]}>
        <li class={[`${name}-item`, `${name}-item__is-empty`]}>{renderTNodeJSX(this, 'empty')}</li>
      </ul>;
    },
  },
  render(): VNode {
    const {
      name,
      cascaderInnerClasses,
      visible,
      renderPlaceholder,
      renderSingleSelect,
      renderTag,
      renderPanel,
      renderArrowIcon,
      renderCloseIcon,
      onVisibleChange,
    } = this;
    const popupProps = this.popupProps as PopupProps;
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
          content: () => renderPanel(),
        }}
      >
        <div class={cascaderInnerClasses}
            onMouseenter={() => {
              this.isHover = true;
            }}
            onMouseleave={() => {
              this.isHover = false;
            }}
          >
          {renderPlaceholder()}
          {renderSingleSelect()}
          {renderTag()}
          {renderArrowIcon()}
          {renderCloseIcon()}
        </div >
      </Popup>
    </div >);
  },
});
