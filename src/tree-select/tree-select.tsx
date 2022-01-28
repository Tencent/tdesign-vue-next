import { defineComponent, VNode } from 'vue';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import TLoading from '../loading';
import mixins from '../utils/mixins';
import getConfigReceiverMixins, { TreeSelectConfig } from '../config-provider/config-receiver';
import { renderTNodeJSX } from '../utils/render-tnode';

import Popup, { PopupProps } from '../popup';
import Tag from '../tag';
import Tree, { TreeNodeModel, TreeNodeValue } from '../tree';
import Input, { InputValue } from '../input';
import FakeArrow from '../common-components/fake-arrow';
import { emitEvent } from '../utils/event';

import CLASSNAMES from '../utils/classnames';
import props from './props';

import { TreeSelectValue } from './type';
import { ClassName, TreeOptionData } from '../common';
import { prefix } from '../config';

import { RemoveOptions, NodeOptions } from './interface';

const name = `${prefix}-tree-select`;

export default defineComponent({
  ...mixins(getConfigReceiverMixins<TreeSelectConfig>('treeSelect')),
  name: 'TTreeSelect',
  components: {
    Tree,
  },
  props: {
    ...props,
  },
  emits: ['change', 'clear', 'focus', 'blur', 'remove', 'search'],
  data() {
    return {
      // 表单控制禁用态时的变量
      formDisabled: undefined,
      visible: false,
      isHover: false,
      focusing: false,
      defaultProps: {
        trigger: 'click',
        placement: 'bottom-left',
        overlayClassName: '',
        overlayStyle: (trigger) => ({
          width: `${trigger.offsetWidth}px`,
          border: '1px solid #dcdcdc',
        }),
      } as PopupProps,
      filterText: '',
      filterByText: null,
      actived: [],
      expanded: [],
      nodeInfo: null,
      treeKey: 0,
    };
  },
  computed: {
    tDisabled() {
      return this.formDisabled || this.disabled;
    },
    classes(): ClassName {
      return [
        `${prefix}-select`,
        {
          [CLASSNAMES.STATUS.disabled]: this.tDisabled,
          [CLASSNAMES.STATUS.active]: this.visible,
          [CLASSNAMES.SIZE[this.size]]: this.size,
          [`${prefix}-has-prefix`]: this.prefixIconSlot,
          [`${prefix}-select-selected`]: this.selectedSingle || !isEmpty(this.selectedMultiple),
        },
      ];
    },
    popupClass(): ClassName {
      const { popupObject } = this;
      return `${popupObject.overlayClassName} ${prefix}-select__dropdown narrow-scrollbar`;
    },
    isObjectValue(): boolean {
      return this.valueType === 'object';
    },
    checked(): Array<TreeSelectValue> {
      if (this.multiple) {
        if (this.isObjectValue) {
          return isArray(this.value) ? this.value.map((item) => (item as NodeOptions).value) : [];
        }
        return isArray(this.value) ? this.value : [];
      }
      return [];
    },
    showArrow(): boolean {
      return (
        !this.clearable ||
        !this.isHover ||
        this.tDisabled ||
        (!this.multiple && !this.value && this.value !== 0) ||
        (this.multiple && isArray(this.value) && isEmpty(this.value))
      );
    },
    showLoading(): boolean {
      return this.loading && !this.tDisabled;
    },
    showClose(): boolean {
      return (
        this.clearable &&
        this.isHover &&
        !this.tDisabled &&
        ((!this.multiple && (!!this.value || this.value === 0)) ||
          (this.multiple && !isEmpty(this.value as Array<TreeSelectValue>)))
      );
    },
    showPlaceholder(): boolean {
      if (
        !this.showFilter &&
        ((isString(this.value) && this.value === '' && !this.selectedSingle) ||
          (isArray(this.value) && isEmpty(this.value)) ||
          this.value === null)
      ) {
        return true;
      }
      return false;
    },
    showFilter(): boolean {
      if (this.tDisabled) {
        return false;
      }
      if (!this.multiple && this.selectedSingle && (this.filterable || isFunction(this.filter))) {
        return this.visible;
      }
      return this.filterable || isFunction(this.filter);
    },
    showTree(): boolean {
      return !this.loading;
    },
    popupObject(): PopupProps {
      const propsObject = this.popupProps ? { ...this.defaultProps, ...(this.popupProps as any) } : this.defaultProps;
      return propsObject;
    },
    selectedSingle(): string {
      if (!this.multiple && (isString(this.value) || isNumber(this.value) || isObject(this.value))) {
        if (this.nodeInfo) {
          return this.nodeInfo.label;
        }
        return `${this.value}`;
      }
      return '';
    },
    selectedMultiple(): Array<TreeSelectValue> {
      if (this.multiple && isArray(this.value) && !isEmpty(this.value)) {
        return this.value;
      }
      return [];
    },
    multiLimitDisabled() {
      if (this.multiple && this.max && isArray(this.value) && this.max <= this.value.length) {
        return true;
      }
      return false;
    },
    filterPlaceholder(): string {
      if (this.multiple && isArray(this.value) && !isEmpty(this.value)) {
        return '';
      }
      if (!this.multiple && this.selectedSingle) {
        return this.selectedSingle;
      }
      return this.placeholder;
    },
    loadingTextSlot(): VNode {
      const useLocale = !this.loadingText && !this.$slots.loadingText;
      return useLocale ? (
        <div class={`${prefix}-select__empty`}>{this.t(this.global.loadingText)}</div>
      ) : (
        renderTNodeJSX(this, 'loadingText')
      );
    },
    emptySlot(): VNode {
      const useLocale = !this.empty && !this.$slots.empty;
      return useLocale ? (
        <div class={`${prefix}-select__empty`}>{this.t(this.global.empty)}</div>
      ) : (
        renderTNodeJSX(this, 'empty')
      );
    },
    prefixIconSlot(): VNode {
      return renderTNodeJSX(this, 'prefixIcon');
    },
    realLabel(): string {
      const { treeProps } = this;
      if (!isEmpty(treeProps) && !isEmpty((treeProps as any).keys)) {
        return (treeProps as any).keys.label || 'label';
      }
      return 'label';
    },
    realValue(): string {
      const { treeProps } = this;
      if (!isEmpty(treeProps) && !isEmpty((treeProps as any).keys)) {
        return (treeProps as any).keys.value || 'value';
      }
      return 'value';
    },
    tagList(): Array<TreeSelectValue> {
      if (this.nodeInfo && isArray(this.nodeInfo)) {
        return this.nodeInfo.map((node) => node.label);
      }
      return this.isObjectValue ? [] : this.selectedMultiple;
    },
  },
  watch: {
    async value() {
      await this.changeNodeInfo();
      if (!this.multiple) {
        this.actived = this.nodeInfo ? [this.nodeInfo.value] : [];
      }
    },
    async data() {
      await this.changeNodeInfo();
      this.treeRerender();
    },
  },
  async mounted() {
    if (!this.value && this.defaultValue) {
      await this.change(this.defaultValue, null);
    }
    if (this.isObjectValue) {
      this.actived = isArray(this.value)
        ? this.value.map((item) => (item as NodeOptions).value)
        : [(this.value as NodeOptions).value];
    } else {
      this.actived = isArray(this.value) ? this.value : [this.value];
    }
    this.changeNodeInfo();
  },
  methods: {
    async popupVisibleChange(visible: boolean) {
      if (this.focusing && !visible) {
        this.visible = true;
        return;
      }
      await (this.visible = visible);
      if (this.showFilter && this.visible) {
        const searchInput = this.$refs.input as HTMLElement;
        searchInput?.focus();
        this.focusing = true;
      }
    },
    removeTag(index: number, data: TreeOptionData, e: MouseEvent) {
      if (this.tDisabled) {
        return;
      }
      this.remove({ value: this.value[index], data, e });
      isArray(this.value) && this.value.splice(index, 1);
      this.change(this.value, null);
    },
    change(value: TreeSelectValue, node: TreeNodeModel<TreeOptionData>) {
      emitEvent(this, 'change', value, { node });
      this.changeNodeInfo();
    },
    clear(e: MouseEvent) {
      e.stopPropagation();
      const defaultValue: TreeSelectValue = this.multiple ? [] : '';
      this.change(defaultValue, null);
      this.actived = [];
      this.filterText = '';
      emitEvent(this, 'clear', { e });
    },
    focus(e: FocusEvent) {
      this.focusing = true;
      emitEvent(this, 'focus', { value: this.value, e });
    },
    blur(e: FocusEvent) {
      this.focusing = false;
      this.filterText = '';
      emitEvent(this, 'blur', { value: this.value, e });
    },
    remove(options: RemoveOptions<TreeOptionData>) {
      emitEvent(this, 'remove', options);
    },
    search(filterWords: string) {
      emitEvent(this, 'search', filterWords);
    },
    treeNodeChange(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<TreeOptionData>; e: MouseEvent }) {
      let current: TreeSelectValue = value;
      if (this.isObjectValue) {
        const { tree } = this.$refs;
        current = value.map((nodeValue) => {
          const node = (tree as any).getItem(nodeValue);
          return { label: node.data[this.realLabel], value: node.data[this.realValue] };
        });
      }
      this.change(current, context.node);
      this.actived = value;
    },
    treeNodeActive(value: Array<TreeNodeValue>, context: { node: TreeNodeModel<TreeOptionData>; e: MouseEvent }) {
      // 多选模式屏蔽 Active 事件
      if (this.multiple) {
        return;
      }
      let current: TreeSelectValue = value;
      if (this.isObjectValue) {
        const { tree } = this.$refs;
        const nodeValue = isEmpty(value) ? '' : value[0];
        const node = (tree as any).getItem(nodeValue);
        current = { label: node.data[this.realLabel], value: node.data[this.realValue] };
      } else {
        current = isEmpty(value) ? '' : value[0];
      }
      this.change(current, context.node);
      this.actived = value;
      this.visible = false;
    },
    treeNodeExpand(value: Array<TreeNodeValue>) {
      this.expanded = value;
    },
    onInput() {
      this.filterByText = (node: TreeNodeModel<TreeOptionData>) => {
        if (isFunction(this.filter)) {
          const filter: boolean | Promise<boolean> = this.filter(this.filterText, node);
          if (isBoolean(filter)) {
            return filter;
          }
        }
        return node.data[this.realLabel].indexOf(this.filterText) >= 0;
      };
      this.search(this.filterText);
    },
    async changeNodeInfo() {
      const { tree } = this.$refs;
      await this.value;

      if (tree && !this.multiple && this.value) {
        const nodeValue = this.isObjectValue ? (this.value as NodeOptions).value : this.value;
        // 数据源非空
        if (!isEmpty(this.data)) {
          const node = (tree as any).getItem(nodeValue);
          this.nodeInfo = { label: node.data[this.realLabel], value: node.data[this.realValue] };
        } else {
          this.nodeInfo = { label: nodeValue, value: nodeValue };
        }
      } else if (tree && this.multiple && isArray(this.value)) {
        this.nodeInfo = this.value.map((value) => {
          const nodeValue = this.isObjectValue ? (value as NodeOptions).value : value;
          // 数据源非空
          if (!isEmpty(this.data)) {
            const node = (tree as any).getItem(nodeValue);
            return { label: node.data[this.realLabel], value: node.data[this.realValue] };
          }
          return { label: nodeValue, value: nodeValue };
        });
      } else {
        this.nodeInfo = null;
      }
    },
    treeRerender() {
      this.treeKey += 1;
    },
  },
  render(): VNode {
    const { treeProps, popupObject, classes, popupClass, treeKey } = this;
    const iconStyle = { 'font-size': this.size };
    const treeSlots = {
      empty: () => <>{this.emptySlot}</>,
    };
    const treeItem = (
      <tree
        ref="tree"
        v-show={this.showTree}
        key={treeKey}
        value={this.checked}
        hover
        expandAll
        expandOnClickNode
        data={this.data}
        activable={!this.multiple}
        checkable={this.multiple}
        disabled={this.tDisabled || this.multiLimitDisabled}
        empty={this.empty}
        size={this.size}
        filter={this.filterByText}
        actived={this.actived}
        expanded={this.expanded}
        activeMultiple={this.multiple}
        onChange={this.treeNodeChange}
        onActive={this.treeNodeActive}
        onExpand={this.treeNodeExpand}
        v-slots={treeSlots}
        {...treeProps}
      />
    );
    const searchInput = (
      <Input
        ref="input"
        v-show={this.showFilter}
        v-model={this.filterText}
        class={`${prefix}-select__input`}
        size={this.size}
        disabled={this.disabled}
        placeholder={this.filterPlaceholder}
        onInput={this.onInput}
        onBlur={(value: InputValue, context: { e: FocusEvent }) => this.blur(context.e)}
        onFocus={(value: InputValue, context: { e: FocusEvent }) => this.focus(context.e)}
      />
    );
    const tagItem = this.tagList.map((label, index) => (
      <Tag
        v-show={this.minCollapsedNum <= 0 || index < this.minCollapsedNum}
        key={index}
        size={this.size}
        closable={!this.disabled}
        disabled={this.disabled}
        onClose={(context: { e: MouseEvent }) => this.removeTag(index, null, context.e)}
      >
        {label}
      </Tag>
    ));
    const collapsedItem =
      (this.collapsedItems || this.$slots.collapsedItems) &&
      this.minCollapsedNum > 0 &&
      this.tagList.length > this.minCollapsedNum ? (
        renderTNodeJSX(this, 'collapsedItems', {
          params: {
            count: this.tagList.length - this.minCollapsedNum,
            value: this.selectedMultiple,
            collapsedSelectedItems: this.selectedMultiple.slice(this.minCollapsedNum),
          },
        })
      ) : (
        <Tag v-show={this.minCollapsedNum > 0 && this.tagList.length > this.minCollapsedNum} size={this.size}>
          {`+${this.tagList.length - this.minCollapsedNum}`}
        </Tag>
      );
    const slots = {
      content: () => (
        <>
          <p v-show={this.showLoading} class={`${prefix}-select-loading-tips`}>
            {this.loadingTextSlot}
          </p>
          {treeItem}
        </>
      ),
    };
    return (
      <div ref="treeSelect">
        <Popup
          ref="popup"
          class={`${prefix}-select__popup-reference`}
          visible={this.visible}
          disabled={this.disabled}
          placement={popupObject.placement}
          trigger={popupObject.trigger}
          overlayStyle={popupObject.overlayStyle}
          overlayClassName={popupClass}
          onVisibleChange={this.popupVisibleChange}
          expandAnimation={true}
          v-slots={slots}
        >
          <div class={classes} onmouseenter={() => (this.isHover = true)} onmouseleave={() => (this.isHover = false)}>
            {this.prefixIconSlot && <span class={`${prefix}-select__left-icon`}>{this.prefixIconSlot[0]}</span>}
            <span v-show={this.showPlaceholder} class={`${prefix}-select__placeholder`}>
              {this.placeholder || this.global.placeholder}{' '}
            </span>
            {tagItem}
            {collapsedItem}
            {!this.multiple && !this.showPlaceholder && !this.showFilter && (
              <span title={this.selectedSingle} class={`${prefix}-select__single`}>
                {this.selectedSingle}
              </span>
            )}
            {searchInput}
            {this.showArrow && !this.showLoading && (
              <FakeArrow
                overlayClassName={`${prefix}-select__right-icon`}
                overlayStyle={iconStyle}
                isActive={this.visible && !this.tDisabled}
              />
            )}
            <CloseCircleFilledIcon
              v-show={this.showClose && !this.showLoading}
              name="close"
              class={`${prefix}-select__right-icon ${prefix}-select__right-icon-clear`}
              size={this.size}
              onClick={({ e }) => this.clear(e)}
            />
            <TLoading
              v-show={this.showLoading}
              name="loading"
              class={`${prefix}-select__right-icon ${prefix}-select__active-icon`}
              size="small"
            />
          </div>
        </Popup>
      </div>
    );
  },
});
