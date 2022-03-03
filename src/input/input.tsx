import { defineComponent, h, VNodeChild, nextTick } from 'vue';
import { BrowseIcon, BrowseOffIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import { InputValue } from './type';
import { getCharacterLength, omit } from '../utils/helper';
import getConfigReceiverMixins, { InputConfig } from '../config-provider/config-receiver';
import mixins from '../utils/mixins';
import CLASSNAMES from '../utils/classnames';
import { prefix } from '../config';
import props from './props';
import { emitEvent } from '../utils/event';
import { renderTNodeJSX } from '../utils/render-tnode';

// hooks
import { useFormDisabled } from '../form/hooks';

const name = `${prefix}-input`;
const INPUT_WRAP_CLASS = `${prefix}-input__wrap`;
const INPUT_TIPS_CLASS = `${prefix}-input__tips`;

function getValidAttrs(obj: Record<string, unknown>): Record<string, unknown> {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export default defineComponent({
  ...mixins(getConfigReceiverMixins<InputConfig>('input')),
  name: 'TInput',
  inheritAttrs: false,
  props: { ...props },
  emits: ['enter', 'keydown', 'keyup', 'keypress', 'clear', 'change', 'focus', 'blur', 'click'],
  setup() {
    const disabled = useFormDisabled();
    return {
      disabled,
    };
  },
  data() {
    return {
      isHover: false,
      focused: false,
      renderType: this.type,
    };
  },
  computed: {
    showClear(): boolean {
      return (this.value && !this.disabled && this.clearable && this.isHover) || this.showClearIconOnEmpty;
    },
    tPlaceholder(): string {
      return this.placeholder ?? this.t(this.global.placeholder);
    },
    inputAttrs(): Record<string, any> {
      return getValidAttrs({
        autofocus: this.autofocus,
        disabled: this.disabled,
        readonly: this.readonly,
        placeholder: this.tPlaceholder,
        maxlength: this.maxlength,
        name: this.name || undefined,
        type: this.renderType,
      });
    },
  },
  watch: {
    autofocus: {
      handler(val) {
        if (val === true) {
          this.$nextTick(() => {
            (this.$refs.inputRef as HTMLInputElement).focus();
          });
        }
      },
      immediate: true,
    },
    value: {
      handler(val) {
        this.inputValue = val;
      },
      immediate: true,
    },
  },

  created() {
    this.composing = false;
    if (this.autoWidth) {
      this.addListenders();
    }
  },

  methods: {
    addListenders() {
      this.$watch(
        () => this.value + this.placeholder,
        () => {
          if (!this.autoWidth) return;
          nextTick(() => {
            this.updateInputWidth();
          });
        },
        { immediate: true },
      );
    },
    mouseEvent(v: boolean) {
      this.isHover = v;
    },
    renderIcon(icon: string | Function | undefined, iconType: 'prefix-icon' | 'suffix-icon') {
      if (typeof icon === 'function') {
        return icon(h);
      }
      // 插槽名称为中划线
      if (this.$slots[kebabCase(iconType)]) {
        return this.$slots[kebabCase(iconType)](null);
      }
      // 插槽名称为驼峰
      if (this.$slots[camelCase(iconType)]) {
        return this.$slots[camelCase(iconType)](null);
      }
      return null;
    },
    setInputValue(v: InputValue = ''): void {
      const input = this.$refs.inputRef as HTMLInputElement;
      const sV = String(v);
      if (!input) {
        return;
      }
      if (input.value !== sV) {
        input.value = sV;
      }
    },
    focus(): void {
      const input = this.$refs.inputRef as HTMLInputElement;
      input?.focus();
    },
    blur(): void {
      const input = this.$refs.inputRef as HTMLInputElement;
      input?.blur();
    },
    handleInput(e: InputEvent): void {
      // 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
      const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
      if (e.isComposing || checkInputType) return;
      this.inputValueChangeHandle(e);
    },

    handleKeydown(e: KeyboardEvent) {
      if (this.disabled) return;
      const { code } = e;
      if (code === 'Enter' || code === 'NumpadEnter') {
        emitEvent(this, 'enter', this.value, { e });
      } else {
        emitEvent(this, 'keydown', this.value, { e });
      }
    },
    handleKeyUp(e: KeyboardEvent) {
      if (this.disabled) return;
      emitEvent(this, 'keyup', this.value, { e });
    },
    handleKeypress(e: KeyboardEvent) {
      if (this.disabled) return;
      emitEvent(this, 'keypress', this.value, { e });
    },
    onHandlePaste(e: ClipboardEvent) {
      if (this.disabled) return;
      // @ts-ignore
      const clipData = e.clipboardData || window.clipboardData;
      this.onPaste?.({ e, pasteValue: clipData?.getData('text/plain') });
    },
    onHandleMousewheel(e: WheelEvent) {
      this.onWheel?.({ e });
    },
    emitPassword() {
      const { renderType } = this;
      const toggleType = renderType === 'password' ? 'text' : 'password';
      this.renderType = toggleType;
    },
    emitClear({ e }: { e: MouseEvent }) {
      emitEvent(this, 'clear', { e });
      emitEvent(this, 'change', '', { e });
      this.focus();
      this.emitFocus(e);
    },
    emitFocus(e: FocusEvent) {
      this.inputValue = this.value;
      if (this.disabled) return;
      this.focused = true;
      emitEvent(this, 'focus', this.value, { e });
    },
    formatAndEmitBlur(e: FocusEvent) {
      if (this.format) {
        this.inputValue = this.format(this.value);
      }
      this.focused = false;
      emitEvent(this, 'blur', this.value, { e });
    },
    compositionendHandler(e: InputEvent) {
      this.inputValueChangeHandle(e);
    },
    onHandleCompositionend(e: CompositionEvent) {
      this.inputValueChangeHandle(e);
      emitEvent(this, 'compositionend', this.value, { e });
    },
    onHandleonCompositionstart(e: CompositionEvent) {
      emitEvent(this, 'compositionstart', this.value, { e });
    },
    onRootClick(e: MouseEvent) {
      (this.$refs.inputRef as HTMLInputElement)?.focus();
      this.$emit('click', e);
    },
    inputValueChangeHandle(e: InputEvent | CompositionEvent) {
      const { target } = e;
      let val = (target as HTMLInputElement).value;
      if (this.maxcharacter && this.maxcharacter >= 0) {
        const stringInfo = getCharacterLength(val, this.maxcharacter);
        val = typeof stringInfo === 'object' && stringInfo.characters;
      }
      emitEvent(this, 'change', val, { e });
      // 受控
      nextTick(() => this.setInputValue(this.value));
    },

    onInputMouseenter(e: MouseEvent) {
      this.mouseEvent(true);
      this.onMouseenter?.({ e });
    },

    onInputMouseleave(e: MouseEvent) {
      this.mouseEvent(false);
      this.onMouseleave?.({ e });
    },

    updateInputWidth() {
      const pre = this.$refs.inputPreRef as HTMLSpanElement;
      if (!pre) return;
      const width = pre.offsetWidth;
      (this.$refs.inputRef as HTMLInputElement).style.width = `${width}px`;
    },
  },

  render(): VNodeChild {
    const inputEvents = getValidAttrs({
      onFocus: (e: FocusEvent) => this.emitFocus(e),
      onBlur: this.formatAndEmitBlur,
      onKeydown: this.handleKeydown,
      onKeyup: this.handleKeyUp,
      onKeypresss: this.handleKeypress,
      onPaste: this.onHandlePaste,
      onCompositionend: this.onHandleCompositionend,
      onCompositionstart: this.onHandleonCompositionstart,
      // input的change事件是失去焦点或者keydown的时候执行。这与api定义的change不符，所以不做任何变化。
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange: () => {},
    });

    const wrapperAttrs = omit(this.$attrs, [...Object.keys(inputEvents), ...Object.keys(this.inputAttrs), 'input']);

    const prefixIcon = this.renderIcon(this.prefixIcon, 'prefix-icon');

    let suffixIcon = this.renderIcon(this.suffixIcon, 'suffix-icon');

    const label = renderTNodeJSX(this, 'label', { silent: true });
    const suffix = renderTNodeJSX(this, 'suffix');

    const labelContent = label ? <div class={`${name}__prefix`}>{label}</div> : null;
    const suffixContent = suffix ? <div class={`${name}__suffix`}>{suffix}</div> : null;

    if (this.showClear) {
      suffixIcon = <CloseCircleFilledIcon class={`${name}__suffix-clear`} onClick={this.emitClear} />;
    }

    if (this.type === 'password') {
      if (this.renderType === 'password') {
        suffixIcon = <BrowseOffIcon class={`${name}__suffix-clear`} onClick={this.emitPassword} />;
      } else if (this.renderType === 'text') {
        suffixIcon = <BrowseIcon class={`${name}__suffix-clear`} onClick={this.emitPassword} />;
      }
    }

    const classes = [
      name,
      {
        [CLASSNAMES.SIZE[this.size]]: this.size !== 'medium',
        [CLASSNAMES.STATUS.disabled]: this.disabled,
        [CLASSNAMES.STATUS.focused]: this.focused,
        [`${prefix}-is-${this.status}`]: this.status,
        [`${prefix}-align-${this.align}`]: this.align !== 'left',
        [`${prefix}-is-disabled`]: this.disabled,
        [`${prefix}-is-readonly`]: this.readonly,
        [`${name}--prefix`]: prefixIcon || labelContent,
        [`${name}--suffix`]: suffixIcon || suffixContent,
        [`${name}--focused`]: this.focused,
        [`${name}--auto-width`]: this.autoWidth,
      },
    ];
    const inputNode = (
      <div
        class={classes}
        onClick={this.onRootClick}
        onMouseenter={this.onInputMouseenter}
        onMouseleave={this.onInputMouseleave}
        onWheel={this.onHandleMousewheel}
        {...{ ...wrapperAttrs }}
      >
        {prefixIcon ? <span class={[`${name}__prefix`, `${name}__prefix-icon`]}>{prefixIcon}</span> : null}
        {labelContent}
        <input
          class={`${name}__inner`}
          {...{ ...this.inputAttrs }}
          {...inputEvents}
          ref="inputRef"
          value={this.inputValue}
          onInput={(e: Event) => this.handleInput(e as InputEvent)}
        />
        {this.autoWidth && (
          <span ref="inputPreRef" class={`${prefix}-input__input-pre`}>
            {this.value || this.tPlaceholder}
          </span>
        )}
        {suffixContent}
        {suffixIcon ? (
          <span class={[`${name}__suffix`, `${name}__suffix-icon`, { [`${name}__clear`]: this.showClear }]}>
            {suffixIcon}
          </span>
        ) : null}
      </div>
    );
    const tips = renderTNodeJSX(this, 'tips');
    if (tips) {
      return (
        <div class={INPUT_WRAP_CLASS}>
          {inputNode}
          <div class={`${INPUT_TIPS_CLASS} ${prefix}-input__tips--${this.status || 'normal'}`}>{tips}</div>
        </div>
      );
    }
    return inputNode;
  },
});
