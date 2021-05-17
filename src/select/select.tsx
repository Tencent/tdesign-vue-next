import { defineComponent, nextTick } from 'vue';
import { renderTNodeJSX } from '../utils/render-tnode';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import TIconChevronDown from '../icon/chevron-down';
import TIconClose from '../icon/close';
import TIconLoading from '../icon/loading';
import Input from '../input/index';
import Tag from '../tag/index';
import isFunction from 'lodash/isFunction';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import set from 'lodash/set';
import Popup from '../popup/index';
import Option from './option';
import { PopupProps } from '@Popup';

import props from '@TdTypes/select/props';
import { Options, SelectValue } from '@TdTypes/select/TdSelectProps';

// import { SelectInstance } from './instance';
const name = `${prefix}-select`;

export default defineComponent({
  name,
  components: {
    TIconChevronDown,
    TIconClose,
    TIconLoading,
    TInput: Input,
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
  emits: ['change', 'input', 'clear', 'visible-change', 'keydown', 'keyup', 'keypress', 'focus', 'blur', 'update:value', 'remove', 'create', 'search'],
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
        overlayClassName: '',
        overlayStyle: {
          width: '',
        },
      } as PopupProps,
      width: 0,
      options: [],
      focusing: false, // filterable时，输入框是否在focus中
      labelInValue: this.valueType === 'object',
      realValue: this.keys && this.keys.value ? this.keys.value : 'value',
      realLabel: this.keys && this.keys.label ? this.keys.label : 'label',
      tmpOptions: [],
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
        {
          [CLASSNAMES.STATUS.visible]: visible,
        },
      ];
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
      return !this.showFilter
        && ((typeof this.value === 'string' && this.value === '' && !this.selectedSingle)
          || (!this.multiple && typeof this.value === 'object' && !this.selectedSingle)
          || (Array.isArray(this.value) && !this.value.length)
          || this.value === null
          || this.value === undefined);
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
    showLoading(): boolean {
      return this.filterable && this.loading && !this.disabled;
    },
    showFilter(): boolean {
      if (this.disabled) return false;
      if (!this.multiple && this.selectedSingle && this.filterable) {
        return this.visible;
      }
      return this.filterable;
    },
    selectedSingle(): string {
      if (!this.multiple && (typeof this.value === 'string' || typeof this.value === 'number')) {
        let target: Array<Options> = [];
        if (this.options && this.options.length) {
          target = this.options.filter(item => get(item, this.realValue) === this.value);
        }
        return target.length ? get(target[0], this.realLabel) : this.value;
      }
      if (!this.multiple && typeof this.value === 'object' && get(this.value, this.realLabel) !== undefined) {
        return get(this.value, this.realLabel);
      }
      return '';
    },
    selectedMultiple(): Array<Options> {
      if (this.multiple && Array.isArray(this.value) && this.value.length) {
        return this.value.map((item: string|number|Options) => {
          if (typeof item === 'object') {
            return item;
          }
          const tmp = this.options.filter(op => get(op, this.realValue) === item);
          const valueLabel = {};
          set(valueLabel, this.realValue, item);
          set(valueLabel, this.realLabel, tmp.length ? get(tmp[0], this.realLabel) : item);
          return tmp.length && tmp[0].disabled ? { ...valueLabel, disabled: true } : valueLabel;
        });
      }
      return [];
    },
    popupObject(): PopupProps {
      const propsObject = this.popupProps ? Object.assign({}, this.defaultProps, this.popupProps) : this.defaultProps;
      if ((!this.popupProps || !this.popupProps.overlayStyle || !this.popupProps.overlayStyle.width) && this.width) {
        propsObject.overlayStyle.width = `${this.width}px`;
      }
      return propsObject;
    },
    displayOptions(): Array<Options> {
      if (isFunction(this.filter)) {
        if (this.searchInput === '') {
          return this.options;
        }
        return this.tmpOptions;
      }
      return this.options;
    },
  },
  watch: {
    showFilter(val) {
      if (val && this.selectedSingle) {
        nextTick(() => {
          const input = this.$refs.input as HTMLElement;
          input?.focus();
          this.focusing = true;
        });
      }
    },
    searchInput(val) {
      if (isFunction(this.filter)) {
        this.tmpOptions = this.options.filter(option => this.filter(val, option));
      } else {
        this.debounceOnRemote();
      }
      if (this.filterable && val && this.creatable) {
        const tmp = this.options.filter(item => get(item, this.realLabel).toString() === val);
        this.showCreateOption = !tmp.length;
      } else {
        this.showCreateOption = false;
      }
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
        (this.$refs.popup as any).showPopper = true;
        return;
      }
      this.visible = val;
      if (!val) {
        if (!this.multiple || !this.reserveKeyword || this.creatable) {
          this.searchInput = '';
        }
      }
      this.$emit('visible-change', val);
      this.monitorWidth();
    },
    onOptionClick(value: string | number, e: MouseEvent) {
      if (this.value !== value) {
        if (this.multiple && this.value instanceof Array) {
          if (this.labelInValue) {
            const index = this.value.map(item => get(item, this.realValue)).indexOf(value);
            if (index > -1) {
              this.removeTag(index, e);
            } else {
              this.value.push(this.options.filter(item => get(item, this.realValue) === value)[0]);
              this.emitChange(this.value);
            }
          } else {
            const index = this.value.indexOf(value);
            if (index > -1) {
              this.removeTag(index, e);
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
        this.hideMenu();
      } else {
        if (!this.reserveKeyword) {
          this.searchInput = '';
        }
        if (this.filterable) {
          const input = this.$refs.input as HTMLElement;
          input?.focus();
          this.focusing = true;
        }
      }
    },
    removeTag(index: number, e: MouseEvent) {
      e.stopPropagation();
      if (this.disabled) {
        return;
      }
      const val = this.value[index];
      const removeOption = this.options.filter(item => get(item, this.realValue) === val);
      this.value instanceof Array && this.value.splice(index, 1);
      this.emitChange(this.value);
      this.$emit('remove', { value: val, data: removeOption[0], e });
    },
    hideMenu() {
      (this.$refs.popup as any).showPopper = false;
    },
    clearSelect(e: MouseEvent) {
      e.stopPropagation();
      if (this.multiple) {
        this.emitChange([]);
      } else {
        this.emitChange('');
      }
      this.focusing = false;
      this.searchInput = '';
      (this.$refs.popup as any).showPopper = false;
      this.$emit('clear', { e });
    },
    getOptions(option: Options) {
      if (!option.value && !option.label) return;
      const tmp = this.options.filter(item => get(item, this.realValue) === option.value);
      if (!tmp.length) {
        this.hasOptions = true;
        const valueLabel = {};
        set(valueLabel, this.realValue, option.value);
        set(valueLabel, this.realLabel, option.label);
        const valueLabelAble = option.disabled ? { ...valueLabel, disabled: true } : valueLabel;
        this.options.push(valueLabelAble);
      }
    },
    destroyOptions(index: number) {
      this.options.splice(index, 1);
    },
    emitChange(val: SelectValue | Array<SelectValue>) {
      let value: SelectValue | Array<SelectValue> | Array<Options> | Options;
      if (this.labelInValue) {
        if (Array.isArray(val)) {
          if (!val.length) {
            value = [];
          } else {
            value = this.selectedMultiple;
          }
        } else {
          const target = this.options.filter(item => get(item, this.realValue) === val);
          value = target.length ? target[0] : '';
        }
      } else {
        value = val;
      }
      this.$emit('change', value);
      this.monitorWidth();
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
    monitorWidth() {
      nextTick(() => {
        this.width = this.$el && this.$el.clientWidth;
      });
    },
    hoverEvent(v: boolean) {
      this.isHover = v;
    },
  },
  render() {
    const {
      classes,
      visible,
      popupObject,
      disabled,
      popClass,
      size,
      options,
      showPlaceholder,
      placeholder,
      selectedMultiple,
      multiple,
      showFilter,
      selectedSingle,
      filterPlaceholder,
      tipsClass,
      loading,
      loadingText,
      empty,
      emptyClass,
      hasOptions,
      realValue,
      realLabel,
      showCreateOption,
      displayOptions,
    } = this;
    const children = renderTNodeJSX(this, 'default');
    const prefixIconSlot = renderTNodeJSX(this, 'prefixIcon');
    const emptySlot = renderTNodeJSX(this, 'empty');
    const loadingTextSlot = renderTNodeJSX(this, 'loadingText');
    const slots = {
      content: () => (
        <div>
          <ul v-show={showCreateOption} class={`${name}-create-option`}>
            <t-option value={this.searchInput} label={this.searchInput} />
          </ul>
          {
            loading && (
              <li class={tipsClass}>{ loadingTextSlot ? loadingTextSlot : loadingText }</li>
            )
          }
          {
            !loading && !displayOptions.length && !showCreateOption && (
              <li class={emptyClass}>{ emptySlot ? emptySlot : empty }</li>
            )
          }
          {
            !hasOptions && options.length
              ? <ul>
              {
                options.map((item: Options, index: number) => (
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
              : <span v-show={!loading && options.length}>{children}</span>
          }
        </div>
      ),
    };

    return (
      <div ref='select'>
        <Popup
          ref='popup'
          class={`${name}-popup-reference`}
          visible={visible}
          placement={popupObject.placement}
          trigger={popupObject.trigger}
          disabled={disabled}
          overlayClassName={popClass}
          overlayStyle={popupObject.overlayStyle}
          onVisibleChange={ this.visibleChange }
          v-slots={slots}
        >
          <div class={classes} onMouseenter={ this.hoverEvent.bind(null, true) } onMouseleave={ this.hoverEvent.bind(null, false) }>
            {
              prefixIconSlot && (<span class="t-select-left-icon">{ prefixIconSlot[0] }</span>)
            }
            {
              showPlaceholder && (
                <span class={`${name}-placeholder`}> { placeholder }</span>
              )
            }
            {
              selectedMultiple.map((item: Options, index: number) => (
                <tag
                  key={index}
                  size={size}
                  closable={!item.disabled && !disabled}
                  disabled={disabled}
                  onClose={this.removeTag.bind(null, index)}
                >
                  { get(item, realLabel) }
                </tag>
              ))
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
                />
              )
            }
            {
              this.showArrow && !this.showLoading && (
                <t-icon-chevron-down class={this.arrowClass} size={size} />
              )
            }
            {
              this.showClose && !this.showLoading && (
                <t-icon-close
                  class={`${name}-right-icon`}
                  size={size}
                  nativeOnClick={this.clearSelect}
                />
              )
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
