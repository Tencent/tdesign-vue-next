import { defineComponent, nextTick, VNode, ComponentPublicInstance } from 'vue';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import set from 'lodash/set';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import TLoading from '../loading';

import { renderTNodeJSX } from '../utils/render-tnode';
import TInput from '../input/index';
import Tag from '../tag/index';
import FakeArrow from '../common-components/fake-arrow';
import Popup, { PopupProps, PopupVisibleChangeContext } from '../popup/index';
import Option from './option';
import OptionGroup from './optionGroup';

import props from './props';
import {
  SelectOption,
  TdOptionProps,
  SelectValue,
  TdSelectProps,
  SelectOptionGroup,
  SelectValueChangeTrigger,
} from './type';
import { ClassName } from '../common';
import { emitEvent } from '../utils/event';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

export type OptionInstance = InstanceType<typeof Option>;

interface KeysType {
  value?: string;
  label?: string;
}

// trigger元素不超过此宽度时，下拉选项的最大宽度（用户未设置overStyle width时）
// 用户设置overStyle width时，以设置的为准
const DEFAULT_MAX_OVERLAY_WIDTH = 500;
// 默认垂直滚动条宽度 .narrow-scrollbar 8px
const DEFAULT_SCROLLY_WIDTH = 8;

export default defineComponent({
  name: 'TSelect',
  components: {
    CloseCircleFilledIcon,
    TInput,
    Tag,
    Popup,
    TOption: Option,
    TOptionGroup: OptionGroup,
  },
  provide(): any {
    return {
      tSelect: this,
    };
  },
  inject: {
    formItem: { default: undefined },
  },
  props: { ...props },
  emits: [
    'change',
    'input',
    'clear',
    'keydown',
    'keyup',
    'keypress',
    'focus',
    'blur',
    'remove',
    'create',
    'search',
    'visible-change',
    'popup-visible-change',
  ],
  setup() {
    const disabled = useFormDisabled();
    const COMPONENT_NAME = usePrefixClass('select');
    const classPrefix = usePrefixClass('');
    const listName = usePrefixClass('select__list');
    const { STATUS, SIZE } = useCommonClassName();
    const { global, t } = useConfig('select');
    return {
      STATUS,
      SIZE,
      classPrefix,
      listName,
      COMPONENT_NAME,
      disabled,
      global,
      t,
    };
  },
  data() {
    return {
      isHover: false,
      visible: false,
      searchInput: '',
      showCreateOption: false,
      hasOptions: false, // select的slot是否有options组件
      defaultProps: {
        trigger: 'click',
        placement: 'bottom-left' as string,
        overlayClassName: '' as ClassName,
        overlayStyle: {},
      } as PopupProps,
      focusing: false, // filterable时，输入框是否在focus中
      labelInValue: this.valueType === 'object',
      realValue: this.keys && (this.keys as KeysType).value ? (this.keys as KeysType).value : 'value',
      realLabel: this.keys && (this.keys as KeysType).label ? (this.keys as KeysType).label : 'label',
      realOptions: [] as Array<TdOptionProps>,
      hoverIndex: -1,
      popupOpenTime: 250, // popup打开弹出层的延迟时间
      checkScroll: true, // 弹出层执行加宽事件（仅执行一次，且在有滚动条时执行）
    };
  },
  computed: {
    classes(): ClassName {
      return [
        `${this.COMPONENT_NAME}`,
        `${this.COMPONENT_NAME}-polyfill`, // 基于select-input改造时需要移除，polyfill代码，同时移除common中此类名
        {
          [this.STATUS.disabled]: this.disabled,
          [this.STATUS.active]: this.visible,
          [this.SIZE[this.size]]: this.size,
          [`${this.classPrefix}-has-prefix`]: this.$slots.prefixIcon,
          [`${this.classPrefix}-no-border`]: !this.bordered,
        },
      ];
    },
    popClass(): string {
      const { popupObject } = this;
      return `${popupObject.overlayClassName} ${this.COMPONENT_NAME}__dropdown narrow-scrollbar`;
    },
    tipsClass(): ClassName {
      return [
        `${this.COMPONENT_NAME}__loading-tips`,
        {
          [this.SIZE[this.size]]: this.size,
        },
      ];
    },
    emptyClass(): ClassName {
      return [
        `${this.COMPONENT_NAME}__empty`,
        {
          [this.SIZE[this.size]]: this.size,
        },
      ];
    },
    showPlaceholder(): boolean {
      if (
        !this.showFilter &&
        ((!this.multiple && !this.selectedSingle) ||
          (!this.multiple && typeof this.value === 'object' && !this.selectedSingle) ||
          (Array.isArray(this.value) && !this.value.length) ||
          this.value === null ||
          this.value === undefined ||
          this.value === '')
      ) {
        return true;
      }
      return false;
    },
    // 是否为分组选择器
    isGroupOption(): boolean {
      const firstOption = this.options?.[0];
      return !!(firstOption && 'group' in firstOption && 'children' in firstOption);
    },
    filterPlaceholder(): string {
      if (this.multiple && Array.isArray(this.value) && this.value.length) {
        return '';
      }
      if (!this.multiple && this.selectedSingle) {
        return this.selectedSingle;
      }
      return this.placeholder;
    },
    showClose(): boolean {
      return Boolean(
        this.clearable &&
          this.isHover &&
          !this.disabled &&
          ((!this.multiple && (this.value || this.value === 0)) ||
            (this.multiple && Array.isArray(this.value) && this.value.length)),
      );
    },
    // to fix Computed property "showArrow" is already defined in Props.
    innerShowArrow(): boolean {
      return (
        this.showArrow &&
        (!this.clearable ||
          !this.isHover ||
          this.disabled ||
          (!this.multiple && !this.value && this.value !== 0) ||
          (this.multiple && (!Array.isArray(this.value) || (Array.isArray(this.value) && !this.value.length))))
      );
    },
    canFilter(): boolean {
      return this.filterable || isFunction(this.filter);
    },
    showLoading(): boolean {
      return this.loading && !this.disabled;
    },
    showFilter(): boolean {
      if (this.disabled) return false;
      if (!this.multiple && this.selectedSingle && this.canFilter) {
        return this.visible;
      }
      return this.canFilter;
    },
    selectedSingle(): string {
      if (!this.multiple && (typeof this.value === 'string' || typeof this.value === 'number')) {
        let target: Array<TdOptionProps> = [];
        if (this.realOptions && this.realOptions.length) {
          target = this.realOptions.filter((item) => get(item, this.realValue) === this.value);
        }
        if (target.length) {
          if (get(target[target.length - 1], this.realLabel) === '') {
            return get(target[target.length - 1], this.realValue);
          }
          return get(target[target.length - 1], this.realLabel);
        }
        return this.value.toString();
      }
      const showText = get(this.value, this.realLabel);
      // label为空时显示value值
      if (!this.multiple && typeof this.value === 'object' && showText !== undefined) {
        return showText === '' ? get(this.value, this.realValue) : showText;
      }
      return '';
    },
    selectedMultiple(): Array<TdOptionProps> {
      if (this.multiple && Array.isArray(this.value) && this.value.length) {
        return this.value.map((item: string | number | TdOptionProps) => {
          if (typeof item === 'object') {
            return item;
          }
          const tmp = this.realOptions.filter((op) => get(op, this.realValue) === item);
          const valueLabel = {};
          set(valueLabel, this.realValue, item);
          set(valueLabel, this.realLabel, tmp.length ? get(tmp[tmp.length - 1], this.realLabel) : item);
          return tmp.length && tmp[tmp.length - 1].disabled ? { ...valueLabel, disabled: true } : valueLabel;
        });
      }
      return [];
    },
    popupObject(): PopupProps {
      const propsObject = this.popupProps ? { ...this.defaultProps, ...(this.popupProps as any) } : this.defaultProps;
      return propsObject;
    },
    filterOptions(): Array<TdOptionProps> {
      // filter优先级 filter方法>仅filterable
      if (isFunction(this.filter)) {
        return this.realOptions.filter((option) => this.filter(this.searchInput, option));
      }
      if (this.filterable) {
        // 仅有filterable属性时，默认不区分大小写过滤label
        return this.realOptions.filter(
          (option) =>
            option[this.realLabel].toString().toLowerCase().indexOf(this.searchInput.toString().toLowerCase()) !== -1,
        );
      }
      return [];
    },
    displayOptions(): Array<TdOptionProps> {
      // 展示优先级，用户远程搜索传入>组件通过filter过滤>getOptions后的完整数据
      if (isFunction(this.onSearch) || this.$attrs.search) {
        return this.realOptions;
      }
      if (this.canFilter && !this.creatable) {
        if (this.searchInput === '') {
          return this.realOptions;
        }
        return this.filterOptions;
      }
      return this.realOptions;
    },
    hoverOptions(): Array<TdOptionProps> {
      if (!this.showCreateOption) {
        if (isFunction(this.filter) || this.filterable) {
          return this.filterOptions;
        }
        return this.realOptions;
      }
      const willCreateOption = [{ value: this.searchInput, label: this.searchInput }] as Array<TdOptionProps>;
      if (isFunction(this.filter) || this.filterable) {
        return willCreateOption.concat(this.filterOptions);
      }
      return willCreateOption.concat(this.realOptions);
    },
  },
  watch: {
    showFilter(val) {
      if (val && this.selectedSingle) {
        nextTick(() => {
          this.doFocus();
        });
      }
    },
    searchInput(val) {
      if (!val && !this.visible) return;
      if (isFunction(this.onSearch) || this.$attrs.search) {
        this.debounceOnRemote();
      }
      if (this.canFilter && val && this.creatable) {
        const tmp = this.realOptions.filter((item) => get(item, this.realLabel).toString() === val);
        this.showCreateOption = !tmp.length;
      } else {
        this.showCreateOption = false;
      }
    },
    options: {
      immediate: true,
      deep: true,
      handler(options: SelectOption[]) {
        if (Array.isArray(options)) {
          this.realOptions = this.getRealOptions(options);
        } else {
          console.error('TDesign Select: options must be an array.');
        }
      },
    },
    visible() {
      this.visible && document.addEventListener('keydown', this.keydownEvent);
      !this.visible && document.removeEventListener('keydown', this.keydownEvent);
    },
  },
  mounted() {
    this.checkVal();
  },
  methods: {
    getRealOptions(options: SelectOption[]): Array<TdOptionProps> {
      if (this.isGroupOption) {
        let arr: TdOptionProps[] = [];
        options.forEach((item) => {
          if ('children' in item) {
            arr = arr.concat(item.children);
          }
        });
        return arr;
      }
      return [...options];
    },
    checkVal() {
      const { value, multiple } = this;
      if ((multiple && !Array.isArray(value)) || (!multiple && Array.isArray(value))) {
        emitEvent(this, 'change', this.multiple ? [] : '');
        console.warn('TDesign Warn:', 'select props value invalid, v-model automatic calibration');
      }
    },
    multiLimitDisabled(value: string | number) {
      if (this.multiple && this.max) {
        if (this.value instanceof Array && this.value.indexOf(value) === -1 && this.max <= this.value.length) {
          return true;
        }
      }
      return false;
    },
    visibleChange(val: boolean, context: PopupVisibleChangeContext) {
      this.visible = val;
      if (!val) {
        this.searchInput = '';
        this.showCreateOption = false;
      }
      val && this.monitorWidth();
      val && this.canFilter && this.doFocus();
      // 事件重复，需讨论移除其中一个
      emitEvent<Parameters<TdSelectProps['onVisibleChange']>>(this, 'visible-change', val);
      emitEvent<Parameters<TdSelectProps['onPopupVisibleChange']>>(this, 'popup-visible-change', val, context);
    },
    onOptionClick(value: string | number, e: MouseEvent | KeyboardEvent) {
      if (this.value !== value) {
        if (this.multiple && this.value instanceof Array) {
          if (this.labelInValue) {
            const index = this.value.map((item) => get(item, this.realValue)).indexOf(value);
            if (index > -1) {
              this.removeTag(index, { e });
            } else {
              this.value.push(this.realOptions.filter((item) => get(item, this.realValue) === value)[0]);
              this.emitChange(this.value, 'check');
            }
          } else {
            const index = this.value.indexOf(value);
            if (index > -1) {
              this.removeTag(index, { e });
            } else {
              this.value.push(value);
              this.emitChange(this.value, 'check');
            }
          }
        } else {
          this.emitChange(value, 'check');
        }
      }
      if (!this.multiple) {
        this.searchInput = '';
        this.hideMenu();
      } else {
        if (!this.reserveKeyword) {
          this.searchInput = '';
        }
        this.canFilter && this.doFocus();
      }
    },
    removeTag(index: number, context?: { e?: MouseEvent | KeyboardEvent }) {
      const { e } = context || {};
      e && e.stopPropagation();
      if (this.disabled) {
        return;
      }
      const val = this.value[index];
      const removeOption = this.realOptions.filter((item) => get(item, this.realValue) === val);
      const tempValue = this.value instanceof Array ? [].concat(this.value) : [];
      tempValue.splice(index, 1);
      this.emitChange(tempValue, 'tag-remove');
      emitEvent(this, 'remove', { value: val, data: removeOption[0], e });
    },
    hideMenu() {
      this.visible = false;
    },
    clearSelect(e: MouseEvent) {
      e.stopPropagation();
      if (this.multiple) {
        this.emitChange([], 'clear');
      } else {
        this.emitChange('', 'clear');
      }
      this.focusing = false;
      this.searchInput = '';
      this.visible = false;
      emitEvent(this, 'clear', { e });
    },
    getOptions(option: OptionInstance) {
      // create option值不push到options里
      if (
        option.$el &&
        option.$el.className &&
        option.$el.className.indexOf(`${this.COMPONENT_NAME}__create-option--special`) !== -1
      )
        return;
      const tmp = this.realOptions.filter((item) => get(item, this.realValue) === option.value);
      if (!tmp.length) {
        this.hasOptions = true;
        const valueLabel = {};
        set(valueLabel, this.realValue, option.value);
        set(valueLabel, this.realLabel, option.label);
        const valueLabelAble = option.disabled ? { ...valueLabel, disabled: true } : valueLabel;
        this.realOptions.push(valueLabelAble);
      }
    },
    destroyOptions(option: OptionInstance) {
      this.realOptions.forEach((item, index) => {
        if (item[this.realValue] === option.value && item[this.realLabel] === option.label) {
          this.realOptions.splice(index, 1);
        }
      });
    },
    emitChange(val: SelectValue | Array<SelectValue>, trigger: SelectValueChangeTrigger) {
      let value: SelectValue | Array<SelectValue> | Array<TdOptionProps> | TdOptionProps;
      if (this.labelInValue) {
        if (Array.isArray(val)) {
          if (!val.length) {
            value = [];
          } else {
            value = val;
          }
        } else {
          const target = this.realOptions.filter((item) => get(item, this.realValue) === val);
          value = target.length ? target[0] : '';
        }
      } else {
        value = val;
      }
      emitEvent<Parameters<TdSelectProps['onChange']>>(this, 'change', value, { trigger });
    },
    createOption(value: string) {
      this.$nextTick(() => {
        this.searchInput = '';
        this.showCreateOption = false;
      });
      emitEvent<Parameters<TdSelectProps['onCreate']>>(this, 'create', value);
    },
    debounceOnRemote: debounce(function (this: any) {
      emitEvent<Parameters<TdSelectProps['onSearch']>>(this, 'search', this.searchInput);
    }, 300),
    focus(value: string, context: { e: FocusEvent }) {
      this.focusing = true;
      emitEvent<Parameters<TdSelectProps['onFocus']>>(this, 'focus', { value: this.value, e: context?.e });
    },
    blur(value: string, context: { e: FocusEvent | KeyboardEvent }) {
      this.focusing = false;
      emitEvent<Parameters<TdSelectProps['onBlur']>>(this, 'blur', { value: this.value, e: context?.e });
    },
    enter(value: string, context: { e: KeyboardEvent }) {
      emitEvent<Parameters<TdSelectProps['onEnter']>>(this, 'enter', {
        inputValue: this.searchInput,
        value: this.value,
        e: context?.e,
      });
    },
    keydownEvent(e: KeyboardEvent) {
      if (!this.hoverOptions.length) return;
      const preventKeys = ['ArrowDown', 'ArrowUp', 'Enter', 'Escape', 'Tab'];
      if (preventKeys.includes(e.code)) {
        e.preventDefault();
      }
      switch (e.code) {
        case 'ArrowDown':
          if (this.hoverIndex === -1) {
            this.initHoverindex();
            return;
          }
          if (this.hoverIndex < this.hoverOptions.length - 1) {
            this.hoverIndex += 1;
            this.arrowDownOption();
          } else {
            this.hoverIndex = 0;
            this.arrowDownOption();
          }
          break;
        case 'ArrowUp':
          if (this.hoverIndex === -1) {
            this.initHoverindex();
            return;
          }
          if (this.hoverIndex > 0) {
            this.hoverIndex -= 1;
            this.arrowUpOption();
          } else {
            this.hoverIndex = this.hoverOptions.length - 1;
            this.arrowUpOption();
          }
          break;
        case 'Enter':
          if (this.showCreateOption) {
            this.createOption(this.searchInput);
          }
          this.hoverOptions[this.hoverIndex] &&
            this.onOptionClick(this.hoverOptions[this.hoverIndex][this.realValue], e);
          break;
        case 'Escape':
        case 'Tab':
          this.visible = false;
          emitEvent<Parameters<TdSelectProps['onVisibleChange']>>(this, 'visible-change', false);
          this.searchInput = '';
          if (this.focusing) {
            this.blur(this.searchInput, { e });
          }
          break;
      }
    },
    arrowDownOption() {
      let count = 0;
      while (this.hoverIndex < this.hoverOptions.length) {
        if (!this.hoverOptions[this.hoverIndex] || !this.hoverOptions[this.hoverIndex].disabled) {
          break;
        }
        if (this.hoverIndex === this.hoverOptions.length - 1) {
          this.hoverIndex = 0;
        } else {
          this.hoverIndex += 1;
        }
        count += 1;
        if (count >= this.hoverOptions.length) break;
      }
    },
    arrowUpOption() {
      let count = 0;
      while (this.hoverIndex > -1) {
        if (!this.hoverOptions[this.hoverIndex] || !this.hoverOptions[this.hoverIndex].disabled) {
          break;
        }
        if (this.hoverIndex === 0) {
          this.hoverIndex = this.hoverOptions.length - 1;
        } else {
          this.hoverIndex -= 1;
        }
        count += 1;
        if (count >= this.hoverOptions.length) break;
      }
    },
    hoverEvent(v: boolean) {
      this.isHover = v;
    },
    getOverlayElm(): HTMLElement {
      let r;
      try {
        r = (this.$refs.popup as any).getOverlay();
      } catch (e) {
        console.warn('TDesign Warn:', e);
      }
      return r;
    },
    // 打开浮层时，监听trigger元素和浮层宽度，取max
    monitorWidth() {
      this.$nextTick(() => {
        let styles = (this.popupProps && (this.popupProps as PopupProps).overlayStyle) || {};
        if (this.popupProps && isFunction((this.popupProps as PopupProps).overlayStyle)) {
          styles = (this.popupProps as any).overlayStyle(this.$refs.select as HTMLElement) || {};
        }
        if (typeof styles === 'object' && !styles.width) {
          const elWidth = (this.$refs.select as HTMLElement).getBoundingClientRect().width;
          const popupWidth = this.getOverlayElm().getBoundingClientRect().width;
          const width =
            elWidth > DEFAULT_MAX_OVERLAY_WIDTH
              ? elWidth
              : Math.min(DEFAULT_MAX_OVERLAY_WIDTH, Math.max(elWidth, popupWidth));
          this.defaultProps.overlayStyle = { width: `${Math.ceil(width)}px` };
          if (this.checkScroll) {
            const timer = setTimeout(() => {
              const { scrollHeight, clientHeight } = this.getOverlayElm();
              if (scrollHeight > clientHeight) {
                this.defaultProps.overlayStyle = { width: `${Math.ceil(width) + DEFAULT_SCROLLY_WIDTH}px` };
              }
              this.checkScroll = false;
              clearTimeout(timer);
            }, this.popupOpenTime);
          }
        }
      });
    },
    getEmpty() {
      const useLocale = !this.empty && !this.$slots.empty;
      return useLocale ? this.t(this.global.empty) : renderTNodeJSX(this as ComponentPublicInstance, 'empty');
    },
    getLoadingText() {
      const useLocale = !this.loadingText && !this.$slots.loadingText;
      return useLocale ? this.t(this.global.loadingText) : renderTNodeJSX(this, 'loadingText');
    },
    getPlaceholderText() {
      return this.placeholder || this.t(this.global.placeholder);
    },
    getCloseIcon() {
      // TODO 基于select-input改造时需要移除，polyfill代码，同时移除common中此类名
      const closeIconClass = [
        `${this.COMPONENT_NAME}__right-icon`,
        `${this.COMPONENT_NAME}__right-icon-clear`,
        `${this.COMPONENT_NAME}__right-icon-polyfill`,
      ];
      if (isFunction(this.global.clearIcon)) {
        return (
          <span class={closeIconClass} onClick={this.clearSelect}>
            {this.global.clearIcon()}
          </span>
        );
      }
      return (
        <close-circle-filled-icon
          class={closeIconClass}
          size={this.size}
          onClick={({ e }: { e: MouseEvent }) => this.clearSelect(e)}
        />
      );
    },
    doFocus() {
      const input = this.$refs.input as HTMLElement;
      input?.focus();
      this.focusing = true;
    },
    renderGroupOptions(options: SelectOptionGroup[]) {
      return (
        <ul class={this.listName}>
          {options.map((groupList: SelectOptionGroup) => {
            const children = groupList.children.filter((item) =>
              this.displayOptions.find((child) => child.value === item.value),
            );
            return (
              <t-option-group label={groupList.group} divider={groupList.divider}>
                {this.renderOptions(children)}
              </t-option-group>
            );
          })}
        </ul>
      );
    },
    // options 直传时
    renderOptions(options: SelectOption[]) {
      return (
        <ul class={this.listName}>
          {options.map((item: TdOptionProps, index: number) => (
            <t-option
              value={get(item, this.realValue)}
              label={get(item, this.realLabel)}
              content={item.content}
              disabled={item.disabled || this.multiLimitDisabled(get(item, this.realValue))}
              key={index}
            />
          ))}
        </ul>
      );
    },
    // 两类：普通选择器和分组选择器
    renderDataWithOptions() {
      return this.isGroupOption
        ? this.renderGroupOptions(this.options as SelectOptionGroup[])
        : this.renderOptions(this.displayOptions);
    },
    initHoverindex() {
      if (!this.multiple && (typeof this.value === 'string' || typeof this.value === 'number')) {
        const targetIndex = Object.keys(this.hoverOptions).filter(
          (i) => get(this.hoverOptions[i], this.realValue) === this.value,
        );
        this.hoverIndex = targetIndex.length ? parseInt(targetIndex[targetIndex.length - 1], 10) : -1;
      } else if (this.multiple && Array.isArray(this.value) && this.value.length) {
        this.value.some((item: string | number | TdOptionProps) => {
          const targetIndex = Object.keys(this.hoverOptions).filter(
            (i) =>
              (typeof item === 'object' && get(this.hoverOptions[i], this.realValue) === get(item, this.realValue)) ||
              get(this.hoverOptions[i], this.realValue) === item,
          );
          this.hoverIndex = targetIndex.length ? parseInt(targetIndex[targetIndex.length - 1], 10) : -1;
          return this.hoverIndex !== -1;
        });
      }
    },
  },
  render(): VNode {
    const {
      classes,
      popupObject,
      disabled,
      popClass,
      size,
      showPlaceholder,
      selectedMultiple,
      multiple,
      showFilter,
      selectedSingle,
      filterPlaceholder,
      tipsClass,
      loading,
      loadingText,
      emptyClass,
      hasOptions,
      realLabel,
      showCreateOption,
      displayOptions,
    } = this;
    const children = renderTNodeJSX(this, 'default');
    const prefixIconSlot = renderTNodeJSX(this, 'prefixIcon');
    const emptySlot = this.getEmpty();
    const loadingTextSlot = this.getLoadingText();
    const placeholderText = this.getPlaceholderText();
    const slots = {
      content: () => (
        <div className={`${this.COMPONENT_NAME}__dropdown-inner`}>
          {renderTNodeJSX(this, 'panelTopContent')}
          <ul v-show={showCreateOption} class={[`${this.COMPONENT_NAME}__create-option`, this.listName]}>
            <t-option
              value={this.searchInput}
              label={this.searchInput}
              class={`${this.COMPONENT_NAME}__create-option--special`}
            />
          </ul>
          {loading && <div class={tipsClass}>{loadingTextSlot || loadingText}</div>}
          {!loading && !displayOptions.length && !showCreateOption && <div class={emptyClass}>{emptySlot}</div>}
          {!hasOptions && displayOptions.length && !loading ? (
            this.renderDataWithOptions()
          ) : (
            <ul class={[`${this.COMPONENT_NAME}__groups`, this.listName]}>{children}</ul>
          )}
          {renderTNodeJSX(this, 'panelBottomContent')}
        </div>
      ),
    };
    return (
      <div ref="select" class={`${this.COMPONENT_NAME}__wrap`}>
        <Popup
          ref="popup"
          {...popupObject}
          class={`${this.COMPONENT_NAME}__popup-reference`}
          visible={this.visible}
          placement={popupObject.placement}
          trigger={popupObject.trigger}
          disabled={disabled}
          overlayClassName={popClass}
          overlayStyle={popupObject.overlayStyle}
          onVisibleChange={this.visibleChange}
          expandAnimation={true}
          v-slots={slots}
        >
          <div
            class={classes}
            onMouseenter={this.hoverEvent.bind(null, true)}
            onMouseleave={this.hoverEvent.bind(null, false)}
          >
            {prefixIconSlot && <span class={`${this.COMPONENT_NAME}__left-icon`}>{prefixIconSlot[0]}</span>}
            {showPlaceholder && <span class={`${this.COMPONENT_NAME}__placeholder`}> {placeholderText}</span>}
            {multiple &&
              (this.valueDisplay || this.$slots.valueDisplay
                ? renderTNodeJSX(this, 'valueDisplay', {
                    params: { value: selectedMultiple, onClose: (index: number) => this.removeTag(index) },
                  })
                : selectedMultiple.map((item: TdOptionProps, index: number) => (
                    <tag
                      v-show={this.minCollapsedNum <= 0 || index < this.minCollapsedNum}
                      key={index}
                      size={size}
                      closable={!item.disabled && !disabled}
                      disabled={disabled}
                      style="max-width: 100%;"
                      maxWidth="100%"
                      title={get(item, realLabel)}
                      onClose={this.removeTag.bind(null, index)}
                    >
                      {get(item, realLabel)}
                    </tag>
                  )))}
            {this.collapsedItems || this.$slots.collapsedItems ? (
              renderTNodeJSX(this, 'collapsedItems', {
                params: {
                  value: selectedMultiple,
                  collapsedSelectedItems: selectedMultiple.slice(this.minCollapsedNum),
                  count: selectedMultiple.length - this.minCollapsedNum,
                },
              })
            ) : (
              <tag v-show={this.minCollapsedNum > 0 && selectedMultiple.length > this.minCollapsedNum} size={size}>
                {`+${selectedMultiple.length - this.minCollapsedNum}`}
              </tag>
            )}
            {!multiple &&
              !showPlaceholder &&
              !showFilter &&
              (this.valueDisplay || this.$slots.valueDisplay ? (
                renderTNodeJSX(this, 'valueDisplay', {
                  params: { value: selectedSingle },
                })
              ) : (
                <span title={selectedSingle} class={`${this.COMPONENT_NAME}__single`}>
                  {selectedSingle}
                </span>
              ))}
            {showFilter && (
              <t-input
                ref="input"
                v-model={this.searchInput}
                size={size}
                placeholder={filterPlaceholder}
                disabled={disabled}
                class={`${this.COMPONENT_NAME}__input`}
                readonly={!this.visible || !this.showFilter}
                onFocus={this.focus}
                onBlur={this.blur}
                onEnter={this.enter}
              />
            )}
            {this.innerShowArrow && !this.showLoading && (
              <FakeArrow
                overlayClassName={`${this.COMPONENT_NAME}__right-icon ${this.COMPONENT_NAME}__right-icon-polyfill`}
                isActive={this.visible && !this.disabled}
              />
            )}
            {this.showClose && !this.showLoading && this.getCloseIcon()}
            {this.showLoading && (
              <TLoading
                class={`${this.COMPONENT_NAME}__right-icon ${this.COMPONENT_NAME}__active-icon ${this.COMPONENT_NAME}__right-icon-polyfill`}
                size="small"
              />
            )}
          </div>
        </Popup>
        {/* 当存在default slot的时候，渲染一次，拿到真实的options数据，之后将不会再渲染。抛弃在前一个commit中，函数中 render options的行为，会产生大量告警，compositionAPI重构这一块需要处理一下 */}
        {children && !this.visible && !this.hasOptions && <div v-show={false}>{children}</div>}
      </div>
    );
  },
});
