import {
  defineComponent, nextTick, VNode, ComponentPublicInstance,
} from 'vue';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import set from 'lodash/set';
import { renderTNodeJSX } from '../utils/render-tnode';
import mixins from '../utils/mixins';
import getLocalRecevierMixins from '../locale/local-receiver';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import TIconChevronDown from '../icon/chevron-down';
import TIconClose from '../icon/close-circle-filled';
import TIconLoading from '../icon/loading';
import TInput from '../input/index';
import Tag from '../tag/index';
import Popup, { PopupProps } from '../popup/index';
import Option from './option';
import props from './props';
import { Options, SelectValue } from './type';
import { ClassName } from '../common';
import FakeArrow from '../common-components/fake-arrow';

interface KeysType {
  value?: string;
  label?: string
}

// import { SelectInstance } from './instance';
const name = `${prefix}-select`;
// trigger元素不超过此宽度时，下拉选项的最大宽度（用户未设置overStyle width时）
// 用户设置overStyle width时，以设置的为准
const DEFAULT_MAX_OVERLAY_WIDTH = 500;

const SelectLocalReceiver = getLocalRecevierMixins('select');

export default defineComponent({
  ...mixins(SelectLocalReceiver),
  name,
  components: {
    TIconChevronDown,
    TIconClose,
    TIconLoading,
    TInput,
    Tag,
    Popup,
    TOption: Option,
  },
  provide(): any {
    return {
      tSelect: this,
    };
  },
  props: { ...props },
  emits: ['change', 'input', 'clear', 'keydown', 'keyup', 'keypress', 'focus', 'blur', 'remove', 'create', 'search'],
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
      realOptions: [] as Array<Options>,
    };
  },
  computed: {
    classes(): ClassName {
      return [
        `${name}`,
        {
          [CLASSNAMES.STATUS.disabled]: this.disabled,
          [CLASSNAMES.STATUS.active]: this.visible,
          [CLASSNAMES.SIZE[this.size]]: this.size,
          [`${prefix}-has-prefix`]: this.$slots.prefixIcon,
          [`${prefix}-no-border`]: !this.bordered,
        },
      ];
    },
    popClass(): string {
      const { popupObject } = this;
      return `${popupObject.overlayClassName} ${name}-dropdown narrow-scrollbar`;
    },
    arrowClass(): ClassName {
      const { visible } = this;
      return [
        `${name}-right-icon`,
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
    emptyClass(): ClassName {
      return [
        `${name}-empty`,
        {
          [CLASSNAMES.SIZE[this.size]]: this.size,
        },
      ];
    },
    showPlaceholder(): boolean {
      if (
        !this.showFilter
          && ((typeof this.value === 'string' && this.value === '' && !this.selectedSingle)
          || (!this.multiple && typeof this.value === 'object' && !this.selectedSingle)
          || (Array.isArray(this.value) && !this.value.length)
          || this.value === null
          || this.value === undefined)
      ) {
        return true;
      }
      return false;
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
      return Boolean(this.clearable
        && this.isHover
        && !this.disabled
        && ((!this.multiple && (this.value || this.value === 0)) || (this.multiple && this.value instanceof Array && this.value.length)));
    },
    showArrow(): boolean {
      return (
        !this.clearable
        || !this.isHover
        || this.disabled
        || (!this.multiple && !this.value && this.value !== 0)
        || (this.multiple && this.value instanceof Array && !this.value.length)
      );
    },
    canFilter(): boolean {
      return this.filterable || isFunction(this.filter);
    },
    showLoading(): boolean {
      return this.canFilter && this.loading && !this.disabled;
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
        let target: Array<Options> = [];
        if (this.realOptions && this.realOptions.length) {
          target = this.realOptions.filter((item) => get(item, this.realValue) === this.value);
        }
        if (target.length) {
          if (get(target[0], this.realLabel) === '') {
            return get(target[0], this.realValue);
          }
          return get(target[0], this.realLabel);
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
    selectedMultiple(): Array<Options> {
      if (this.multiple && Array.isArray(this.value) && this.value.length) {
        return this.value.map((item: string|number|Options) => {
          if (typeof item === 'object') {
            return item;
          }
          const tmp = this.realOptions.filter((op) => get(op, this.realValue) === item);
          const valueLabel = {};
          set(valueLabel, this.realValue, item);
          set(valueLabel, this.realLabel, tmp.length ? get(tmp[0], this.realLabel) : item);
          return tmp.length && tmp[0].disabled ? { ...valueLabel, disabled: true } : valueLabel;
        });
      }
      return [];
    },
    popupObject(): PopupProps {
      const propsObject = this.popupProps ? ({ ...this.defaultProps, ...this.popupProps as any }) : this.defaultProps;
      return propsObject;
    },
    filterOptions(): Array<Options> {
      // filter优先级 filter方法>仅filterable
      if (isFunction(this.filter)) {
        return this.realOptions.filter((option) => this.filter(this.searchInput, option));
      } if (this.filterable) {
        // 仅有filterable属性时，默认不区分大小写过滤label
        return this.realOptions.filter((option) => option[this.realLabel].toString().toLowerCase()
          .indexOf(this.searchInput.toString().toLowerCase()) !== -1);
      }
      return [];
    },
    displayOptions(): Array<Options> {
      // 展示优先级，用户远程搜索传入>组件通过filter过滤>getOptions后的完整数据
      if (isFunction(this.onSearch) || this.$attrs.search) {
        return this.realOptions;
      } if (this.canFilter && !this.creatable) {
        if (this.searchInput === '') {
          return this.realOptions;
        }
        return this.filterOptions;
      }
      return this.realOptions;
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
      handler(options: Array<Options>) {
        this.realOptions = [...options];
      },
    },
  },
  methods: {
    multiLimitDisabled(value: string | number) {
      if (this.multiple && this.max) {
        if (
          this.value instanceof Array
          && this.value.indexOf(value) === -1
          && this.max <= this.value.length
        ) {
          return true;
        }
      }
      return false;
    },
    visibleChange(val: boolean) {
      if (this.focusing && !val) {
        this.visible = true;
        return;
      }
      this.visible = val;
      if (!val) {
        if (!this.multiple || !this.reserveKeyword || this.creatable) {
          this.searchInput = '';
        }
      }
      val && this.monitorWidth();
      val && this.canFilter && this.doFocus();
    },
    onOptionClick(value: string | number, e: PointerEvent) {
      if (this.value !== value) {
        if (this.multiple && this.value instanceof Array) {
          if (this.labelInValue) {
            const index = this.value.map((item) => get(item, this.realValue)).indexOf(value);
            if (index > -1) {
              this.removeTag(index, { e });
            } else {
              this.value.push(this.realOptions.filter((item) => get(item, this.realValue) === value)[0]);
              this.emitChange(this.value);
            }
          } else {
            const index = this.value.indexOf(value);
            if (index > -1) {
              this.removeTag(index, { e });
            } else {
              this.value.push(value);
              this.emitChange(this.value);
            }
          }
        } else {
          this.emitChange(value);
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
    removeTag(index: number, context?: { e?: MouseEvent }) {
      const { e } = context || {};
      e && e.stopPropagation();
      if (this.disabled) {
        return;
      }
      const val = this.value[index];
      const removeOption = this.realOptions.filter((item) => get(item, this.realValue) === val);
      const tempValue = this.value instanceof Array ? [].concat(this.value) : [];
      tempValue.splice(index, 1);
      this.emitChange(tempValue);
      this.$emit('remove', { value: val, data: removeOption[0], e });
    },
    hideMenu() {
      this.visible = false;
    },
    clearSelect(e: PointerEvent) {
      if (this.multiple) {
        this.emitChange([]);
      } else {
        this.emitChange('');
      }
      this.focusing = false;
      this.searchInput = '';
      this.visible = false;
      this.$emit('clear', { e });
    },
    getOptions(option: Options) {
      // create option值不push到options里
      if (option.$el && option.$el.className.indexOf(`${name}-create-option-special`) !== -1) return;
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
    destroyOptions(index: number) {
      this.realOptions.splice(index, 1);
    },
    emitChange(val: SelectValue | Array<SelectValue>) {
      let value: SelectValue | Array<SelectValue> | Array<Options> | Options;
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
      this.$emit('change', value);
    },
    createOption(value: string | number) {
      this.$emit('create', value);
    },
    debounceOnRemote: debounce(function (this: any) {
      this.$emit('search', this.searchInput);
    }, 300),
    focus(e: FocusEvent) {
      this.$emit('focus', { value: this.value, e });
      this.focusing = true;
    },
    blur(e: FocusEvent) {
      this.$emit('blur', { value: this.value, e });
      this.focusing = false;
    },
    enter(e: KeyboardEvent) {
      this.$emit('blur', { inputValue: this.searchInput, value: this.value, e });
    },
    hoverEvent(v: boolean) {
      this.isHover = v;
    },
    getOverlayElm(): HTMLElement {
      let r;
      try {
        r = (this.$refs.popup as any).$refs.overlay || (this.$refs.popup as any).$refs.component.$refs.overlay;
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
          const width = elWidth > DEFAULT_MAX_OVERLAY_WIDTH ? elWidth : Math.min(DEFAULT_MAX_OVERLAY_WIDTH, Math.max(elWidth, popupWidth));
          (this.defaultProps.overlayStyle as any).width = `${Math.ceil(width)}px`;
        }
      });
    },
    getEmpty() {
      const useLocale = !this.empty && !this.$slots.empty;
      return useLocale ? this.t(this.locale.empty) : renderTNodeJSX(this as ComponentPublicInstance, 'empty');
    },
    getLoadingText() {
      const useLocale = !this.loadingText && !this.$slots.loadingText;
      return useLocale ? this.t(this.locale.loadingText) : renderTNodeJSX(this as ComponentPublicInstance, 'loadingText');
    },
    getPlaceholderText() {
      return this.placeholder || this.t(this.locale.placeholderText);
    },
    getCloseIcon() {
      const closeIconClass = [`${name}-right-icon`, `${name}-right-icon__clear`];
      if (isFunction(this.locale.clearIcon)) {
        return (
          <span class={closeIconClass} onClick={this.clearSelect}>
            {this.locale.clearIcon(this.$createElement)}
          </span>
        );
      }
      return (
        <t-icon-close
          class={closeIconClass}
          size={this.size}
          onClick={this.clearSelect}
        />
      );
    },
    doFocus() {
      const input = this.$refs.input as HTMLElement;
      input?.focus();
      this.focusing = true;
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
      realValue,
      realLabel,
      showCreateOption,
      displayOptions,
    } = this;
    const children = renderTNodeJSX(this as ComponentPublicInstance, 'default');
    const prefixIconSlot = renderTNodeJSX(this as ComponentPublicInstance, 'prefixIcon');
    const emptySlot = this.getEmpty();
    const loadingTextSlot = this.getLoadingText();
    const placeholderText = this.getPlaceholderText();
    const slots = {
      content: () => (
        <div>
          <ul v-show={showCreateOption} class={`${name}-create-option`}>
            <t-option value={this.searchInput} label={this.searchInput} class={`${name}-create-option-special`} />
          </ul>
          {
            loading && (
              <li class={tipsClass}>{ loadingTextSlot || loadingText }</li>
            )
          }
          {
            !loading && !displayOptions.length && !showCreateOption && (
              <li class={emptyClass}>{ emptySlot }</li>
            )
          }
          {
            // options直传时
            !hasOptions && displayOptions.length && !loading
              ? <ul>
              {
                displayOptions.map((item: Options, index: number) => (
                    <t-option
                      value={get(item, realValue)}
                      label={get(item, realLabel)}
                      disabled={item.disabled || this.multiLimitDisabled(get(item, realValue))}
                      key={index}
                    >
                      { get(item, realLabel) }
                    </t-option>
                ))
              }
            </ul>
              : <span v-show={!loading && displayOptions.length}>{children}</span>
          }
        </div>
      ),
    };

    return (
      <div ref='select' class={`${name}-wrap`}>
        <Popup
          ref='popup'
          class={`${name}-popup-reference`}
          visible={this.visible}
          placement={popupObject.placement}
          trigger={popupObject.trigger}
          disabled={disabled}
          overlayClassName={popClass}
          overlayStyle={popupObject.overlayStyle}
          onVisibleChange={ this.visibleChange }
          expandAnimation={true}
          v-slots={slots}
        >
          <div class={classes} onMouseenter={ this.hoverEvent.bind(null, true) } onMouseleave={ this.hoverEvent.bind(null, false) }>
            {
              prefixIconSlot && (<span class="t-select-left-icon">{ prefixIconSlot[0] }</span>)
            }
            {
              showPlaceholder && (
                <span class={`${name}-placeholder`}> { placeholderText }</span>
              )
            }
            {this.valueDisplay || this.$slots.valueDisplay
              ? renderTNodeJSX(this, 'valueDisplay', {
                params: { value: selectedMultiple, onClose: (index: number) => this.removeTag(index) },
              })
              : (
                selectedMultiple.map((item: Options, index: number) => (
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
                    { get(item, realLabel) }
                  </tag>
                ))
              )
            }
            {this.collapsedItems || this.$slots.collapsedItems
              ? renderTNodeJSX(this, 'collapsedItems', {
                params: {
                  value: selectedMultiple,
                  collapsedSelectedItems: selectedMultiple.slice(this.minCollapsedNum),
                  count: selectedMultiple.length - this.minCollapsedNum,
                },
              })
              : <tag
                  v-show={this.minCollapsedNum > 0 && selectedMultiple.length > this.minCollapsedNum}
                  size={size}
                >
                  { `+${selectedMultiple.length - this.minCollapsedNum}` }
                </tag>
            }
            {!multiple && !showPlaceholder && !showFilter && (
              <span title={selectedSingle} class={`${name}-selectedSingle`}>{ selectedSingle }</span>
            )}
            {
              showFilter && (
                <t-input
                  ref='input'
                  v-model={this.searchInput}
                  size={size}
                  placeholder={ filterPlaceholder }
                  disabled={disabled}
                  class={`${name}-input`}
                  onFocus={this.focus}
                  onBlur={this.blur}
                  onEnter={this.enter}
                />
              )
            }
            {
              this.showArrow && !this.showLoading && (
                <FakeArrow overlayClassName={`${name}-right-icon`} isActive={ this.visible && !this.disabled}/>
              )
            }
            {
              this.showClose && !this.showLoading && this.getCloseIcon()
            }
            {
              this.showLoading && (
                <t-icon-loading class={`${name}-right-icon ${name}-active-icon`} size={size} />
              )
            }
          </div>
        </Popup>
      </div>
    );
  },
});
