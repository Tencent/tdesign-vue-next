import Vue, { VueConstructor, CreateElement, VNode } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import { omit, getPropsApiByEvent } from '../utils/helper';
import ClearIcon from '../icon/clear-circle-filled';
import props from '../../types/input/props';
import isFunction from 'lodash/isFunction';

const name = `${prefix}-input`;

function getValidAttrs(obj: object): object {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

interface InputInstance extends Vue {
  composing: boolean;
}

export default (Vue as VueConstructor<InputInstance>).extend({
  name,
  inheritAttrs: false,
  props: { ...props },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    showClear(): boolean {
      return this.value && !this.disabled && this.clearable;
    },
    inputAttrs(): Record<string, any> {
      return getValidAttrs({
        disabled: this.disabled,
        readonly: this.readonly,
        autocomplete: this.autocomplete,
        placeholder: this.placeholder || undefined,
        maxlength: this.maxlength,
        name: this.name || undefined,
        type: this.type,
      });
    },
  },
  created() {
    this.composing = false;
  },
  render(h: CreateElement): VNode {
    const inputEvents = getValidAttrs({
      focus: this.emitFocus,
      blur: this.emitBlur,
      keydown: this.handleKeydonw,
      keyup: this.handleKeyUp,
      keypresss: this.handleKeypress,
    });

    const wrapperAttrs = omit(this.$attrs, Object.keys(this.inputAttrs));
    const wrapperEvents = omit(this.$listeners, [...Object.keys(inputEvents), 'input']);

    const prefixIcon = this.renderIcon(h, this.prefixIcon, 'prefix-icon');
    let suffixIcon = this.renderIcon(h, this.suffixIcon, 'suffix-icon');

    if (this.showClear) {
      suffixIcon = <ClearIcon class={`${name}__suffix-clear`} nativeOnClick={this.emitClear} />;
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
      <div class={classes} {...{ attrs: wrapperAttrs, on: wrapperEvents }}>
        {prefixIcon ? <span class={`${name}__prefix`}>{prefixIcon}</span> : null}
        <input
          {...{ attrs: this.inputAttrs, on: inputEvents }}
          ref="refInputElem"
          value={this.value}
          class={`${name}__inner`}
          onInput={this.onInput}
        />
        {suffixIcon ? <span class={[`${name}__suffix`, { [`${name}__clear`]: this.showClear }]}>{suffixIcon}</span> : null}
      </div>
    );
  },
  methods: {
    renderIcon(
      h: CreateElement,
      icon: string | Function | undefined,
      iconType: 'prefix-icon' | 'suffix-icon',
    ): JsxNode {
      if (typeof icon === 'function') {
        return icon(h);
      }
      if (this.$scopedSlots[iconType]) {
        return this.$scopedSlots[iconType](null);
      }
      return null;
    },
    setInputValue(v: string | number = ''): void {
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
    onInput(e: InputEvent): void {
      if (this.composing) return;
      const { target } = e;
      const val = (target as HTMLInputElement).value;
      this.$emit('change', val, { e: InputEvent });
      this.$emit('input', val);
      isFunction(this.onChange) && this.onChange(val, { e: InputEvent });
      // 受控
      this.$nextTick(() => this.setInputValue(this.value));
    },
    emitEvent(name: string, e: FocusEvent | KeyboardEvent | InputEvent) {
      this.$emit(name, this.value, { e });
      const eventPropsName = getPropsApiByEvent(name);
      isFunction(this[eventPropsName]) && this[eventPropsName]();
    },
    handleKeydonw(e: KeyboardEvent) {
      if (this.disabled) return;
      const { code } = e;
      if (code === 'Enter') {
        this.emitEvent('keydown-enter', e);
      } else {
        this.emitEvent('keydown', e);
      }
    },
    handleKeyUp(e: KeyboardEvent) {
      if (this.disabled) return;
      this.emitEvent('keyup', e);
    },
    handleKeypress(e: KeyboardEvent) {
      if (this.disabled) return;
      this.emitEvent('keypress', e);
    },
    emitClear(e: MouseEvent) {
      this.$emit('clear', { e });
      isFunction(this.onClear) && this.onClear({ e });
      this.$emit('change', '', { e: MouseEvent });
      this.$emit('input', '');
      isFunction(this.onChange) && this.onChange('', { e: MouseEvent });
    },
    emitFocus(e: FocusEvent) {
      if (this.disabled) return;
      this.focused = true;
      this.emitEvent('focus', e);
    },
    emitBlur(e: FocusEvent) {
      this.focused = false;
      this.emitEvent('blur', e);
    },
  },
});
