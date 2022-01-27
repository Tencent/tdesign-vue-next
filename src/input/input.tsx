import { defineComponent, h, VNodeChild, nextTick } from 'vue';
import { BrowseIcon, BrowseOffIcon, CloseCircleFilledIcon } from 'tdesign-icons-vue-next';
import { InputValue } from './type';
import { getCharacterLength, omit } from '../utils/helper';
import getConfigReceiverMixins, { InputConfig } from '../config-provider/config-receiver';
import mixins from '../utils/mixins';

import CLASSNAMES from '../utils/classnames';
import { prefix } from '../config';
import props from './props';
import { emitEvent } from '../utils/event';
import { renderTNodeJSX } from '../utils/render-tnode';

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
  emits: ['enter', 'keydown', 'keyup', 'keypress', 'clear', 'change', 'focus', 'blur'],
  data() {
    return {
      isHover: false,
      focused: false,
      renderType: this.type,
    };
  },
  computed: {
    tDisabled(): boolean {
      return this.formDisabled || this.disabled;
    },
    showClear(): boolean {
      return this.value && !this.tDisabled && this.clearable && this.isHover;
    },
    inputAttrs(): Record<string, any> {
      return getValidAttrs({
        autofocus: this.autofocus,
        disabled: this.tDisabled,
        readonly: this.readonly,
        autocomplete: this.autocomplete,
        placeholder: this.placeholder ?? this.t(this.global.placeholder),
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
            (this.$refs.refInputElem as HTMLInputElement).focus();
          });
        }
      },
      immediate: true,
    },
  },
  created() {
    this.composing = false;
  },
  methods: {
    mouseEvent(v: boolean) {
      this.isHover = v;
    },
    renderIcon(icon: string | Function | undefined, iconType: 'prefix-icon' | 'suffix-icon') {
      if (typeof icon === 'function') {
        return icon(h);
      }
      if (this.$slots[iconType]) {
        return this.$slots[iconType](null);
      }
      return null;
    },
    setInputValue(v: InputValue = ''): void {
      const input = this.$refs.refInputElem as HTMLInputElement;
      const sV = String(v);
      if (!input) {
        return;
      }
      if (input.value !== sV) {
        input.value = sV;
      }
    },
    focus(): void {
      const input = this.$refs.refInputElem as HTMLInputElement;
      input?.focus();
    },
    blur(): void {
      const input = this.$refs.refInputElem as HTMLInputElement;
      input?.blur();
    },
    handleInput(e: InputEvent): void {
      // 中文输入的时候inputType是insertCompositionText所以中文输入的时候禁止触发。
      const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
      if (e.isComposing || checkInputType) return;
      this.inputValueChangeHandle(e);
    },

    handleKeydown(e: KeyboardEvent) {
      if (this.tDisabled) return;
      const { code } = e;
      if (code === 'Enter' || code === 'NumpadEnter') {
        emitEvent(this, 'enter', this.value, { e });
      } else {
        emitEvent(this, 'keydown', this.value, { e });
      }
    },
    handleKeyUp(e: KeyboardEvent) {
      if (this.tDisabled) return;
      emitEvent(this, 'keyup', this.value, { e });
    },
    handleKeypress(e: KeyboardEvent) {
      if (this.tDisabled) return;
      emitEvent(this, 'keypress', this.value, { e });
    },
    onHandlePaste(e: ClipboardEvent) {
      if (this.tDisabled) return;
      // @ts-ignore
      const clipData = e.clipboardData || window.clipboardData;
      this.onPaste?.({ e, pasteValue: clipData?.getData('text/plain') });
    },
    onHandleMousewheel(e: WheelEvent) {
      this.onMousewheel?.({ e });
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
      if (this.tDisabled) return;
      this.focused = true;
      emitEvent(this, 'focus', this.value, { e });
    },
    emitBlur(e: FocusEvent) {
      this.focused = false;
      emitEvent(this, 'blur', this.value, { e });
    },
    onHandleCompositionend(e: CompositionEvent) {
      this.inputValueChangeHandle(e);
      emitEvent(this, 'compositionend', this.value, { e });
    },
    onHandleonCompositionstart(e: CompositionEvent) {
      emitEvent(this, 'compositionstart', this.value, { e });
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
  },

  render(): VNodeChild {
    const inputEvents = getValidAttrs({
      onFocus: (e: FocusEvent) => this.emitFocus(e),
      onBlur: this.emitBlur,
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

    const label = renderTNodeJSX(this, 'label');
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
        [CLASSNAMES.STATUS.disabled]: this.tDisabled,
        [CLASSNAMES.STATUS.focused]: this.focused,
        [`${prefix}-is-${this.status}`]: this.status,
        [`${prefix}-is-disabled`]: this.tDisabled,
        [`${prefix}-is-readonly`]: this.readonly,
        [`${name}--prefix`]: prefixIcon || labelContent,
        [`${name}--suffix`]: suffixIcon || suffixContent,
        [`${name}--focused`]: this.focused,
      },
    ];
    const inputNode = (
      <div
        class={classes}
        onMouseenter={this.onInputMouseenter}
        onMouseleave={this.onInputMouseleave}
        onwheel={this.onHandleMousewheel}
        {...{ ...wrapperAttrs }}
      >
        {prefixIcon ? <span class={[`${name}__prefix`, `${name}__prefix-icon`]}>{prefixIcon}</span> : null}
        {labelContent}
        <input
          class={`${name}__inner`}
          {...{ ...this.inputAttrs }}
          {...inputEvents}
          ref="refInputElem"
          value={this.value}
          onInput={(e: Event) => this.handleInput(e as InputEvent)}
        />
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
