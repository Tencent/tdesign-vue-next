import {
  defineComponent, h, VNodeChild, nextTick,
} from 'vue';
import { InputValue } from './type';
import { getCharacterLength, omit } from '../utils/helper';

import BrowseIcon from '../icon/browse';
import BrowseOffIcon from '../icon/browse-off';
import CLASSNAMES from '../utils/classnames';
import ClearIcon from '../icon/close-circle-filled';
import { prefix } from '../config';
import props from './props';

const name = `${prefix}-input`;

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
  name,
  inheritAttrs: false,
  props: { ...props },
  emits: ['enter', 'keydown', 'keyup', 'keypress', 'clear', 'change', 'input', 'focus', 'blur'],
  data() {
    return {
      isHover: false,
      focused: false,
      renderType: this.type,
    };
  },
  computed: {
    showClear(): boolean {
      return this.value && !this.disabled && this.clearable && this.isHover;
    },
    inputAttrs(): Record<string, any> {
      return getValidAttrs({
        autofocus: this.autofocus,
        disabled: this.disabled,
        readonly: this.readonly,
        autocomplete: this.autocomplete,
        placeholder: this.placeholder || undefined,
        maxlength: this.maxlength,
        name: this.name || undefined,
        type: this.renderType,
      });
    },
  },
  created() {
    this.composing = false;
  },
  methods: {
    mouseEvent(v: boolean) {
      this.isHover = v;
    },
    renderIcon(
      icon: string | Function | undefined,
      iconType: 'prefix-icon' | 'suffix-icon',
    ) {
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

    handleKeydonw(e: KeyboardEvent) {
      if (this.disabled) return;
      const { code } = e;
      if (code === 'Enter') {
        this.$emit('enter', this.value, { e });
      } else {
        this.$emit('keydown', this.value, { e });
      }
    },
    handleKeyUp(e: KeyboardEvent) {
      if (this.disabled) return;
      this.$emit('keyup', this.value, { e });
    },
    handleKeypress(e: KeyboardEvent) {
      if (this.disabled) return;
      this.$emit('keypress', this.value, { e });
    },
    emitPassword() {
      const { renderType } = this;
      const toggleType = renderType === 'password' ? 'text' : 'password';
      this.renderType = toggleType;
    },
    emitClear(e: MouseEvent) {
      this.$emit('clear', { e });
      this.$emit('change', '', { e });
      this.$emit('input', '', { e });
    },
    emitFocus(e: FocusEvent) {
      if (this.disabled) return;
      this.focused = true;
      this.$emit('focus', this.value, { e });
    },
    emitBlur(e: FocusEvent) {
      this.focused = false;
      this.$emit('blur', this.value, { e });
    },
    onCompositionend(e: CompositionEvent) {
      this.inputValueChangeHandle(e);
    },
    inputValueChangeHandle(e: InputEvent | CompositionEvent) {
      const { target } = e;
      let val = (target as HTMLInputElement).value;
      if (this.maxcharacter && this.maxcharacter >= 0) {
        const stringInfo = getCharacterLength(val, this.maxcharacter);
        val = typeof stringInfo === 'object' && stringInfo.characters;
      }
      this.$emit('change', val, { e });
      this.$emit('input', val, { e });
      // 受控
      nextTick(() => this.setInputValue(this.value));
    },
  },
  render(): VNodeChild {
    const inputEvents = getValidAttrs({
      onFocus: this.emitFocus,
      onBlur: this.emitBlur,
      onKeydown: this.handleKeydonw,
      onKeyup: this.handleKeyUp,
      onKeypresss: this.handleKeypress,
      // input的change事件是失去焦点或者keydown的时候执行。这与api定义的change不符，所以不做任何变化。
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onChange: () => { },
    });

    const wrapperAttrs = omit(this.$attrs, [...Object.keys(inputEvents), ...Object.keys(this.inputAttrs), 'input']);

    // @ts-ignore: TODO
    const prefixIcon = this.renderIcon(this.prefixIcon, 'prefix-icon');

    // @ts-ignore: TODO
    let suffixIcon = this.renderIcon(this.suffixIcon, 'suffix-icon');

    if (this.showClear) {
      suffixIcon = <ClearIcon class={`${name}__suffix-clear`} onClick={this.emitClear} />;
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
      CLASSNAMES.SIZE[this.size] || '',
      {
        [CLASSNAMES.STATUS.disabled]: this.disabled,
        [CLASSNAMES.STATUS.focused]: this.focused,
        [`${prefix}-is-${this.status}`]: this.status,
        [`${name}--prefix`]: prefixIcon,
        [`${name}--suffix`]: suffixIcon,
      },
    ];
    return (
      <div
        class={classes}
        onMouseenter={() => this.mouseEvent(true) }
        onMouseleave={() => this.mouseEvent(false) }
        {...{ ...wrapperAttrs } }
      >
        {prefixIcon ? <span class={`${name}__prefix`}>{prefixIcon}</span> : null}
        <input
          {...{ ...this.inputAttrs } }
          {...inputEvents }
          ref="refInputElem"
          value={this.value}
          autoFocus={props.autofocus}
          class={`${name}__inner`}
          onInput={(e: Event) => this.handleInput(e as InputEvent)}
          onCompositionend={this.onCompositionend}
        />
        {suffixIcon ? <span class={[`${name}__suffix`, { [`${name}__clear`]: this.showClear }]}>{suffixIcon}</span> : null}
      </div>
    );
  },
});
