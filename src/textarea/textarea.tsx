import { defineComponent } from 'vue';
import isFunction from 'lodash/isFunction';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { TextareaValue } from './type';
import { getPropsApiByEvent, getCharacterLength } from '../utils/helper';
import calcTextareaHeight from './calcTextareaHeight';

const name = `${prefix}-textarea`;

type TextareaEmitEvent = 'input' | 'keydown' | 'keyup' | 'keypress' | 'focus' | 'blur' | 'change';

function getValidAttrs(obj: object): object {
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
  emits: ['input', 'keydown', 'keyup', 'keypress', 'focus', 'blur', 'change', 'update:value'],
  data() {
    return {
      focused: false,
      mouseHover: false,
      textareaStyle: {},
    };
  },
  computed: {
    inputAttrs(): Record<string, any> {
      return getValidAttrs({
        autofocus: this.autofocus,
        disabled: this.disabled,
        readonly: this.readonly,
        placeholder: this.placeholder,
        maxlength: this.maxlength || undefined,
        name: this.name || undefined,
      });
    },
    characterNumber(): number {
      const characterInfo = getCharacterLength(String(this.value));
      if (typeof characterInfo === 'object') {
        return characterInfo.length;
      }
      return characterInfo;
    },
  },

  watch: {
    value() {
      this.adjustTextareaHeight();
    },
  },

  mounted() {
    this.adjustTextareaHeight();
  },

  methods: {
    adjustTextareaHeight() {
      if (this.autosize === true) {
        this.textareaStyle = calcTextareaHeight(this.$refs.refTextareaElem as HTMLTextAreaElement);
      } else if (typeof this.autosize === 'object') {
        const { minRows, maxRows } = this.autosize;
        this.textareaStyle = calcTextareaHeight(this.$refs.refTextareaElem as HTMLTextAreaElement, minRows, maxRows);
      } else if (this.$attrs.rows) {
        this.textareaStyle = { height: 'auto', minHeight: 'auto' };
      }
    },

    emitEvent(name: TextareaEmitEvent, value: string | number, context: object) {
      this.$emit(name, value, context);
    },

    focus(): void {
      const input = this.$refs.refInputElem as HTMLInputElement;
      input?.focus();
    },
    blur(): void {
      const input = this.$refs.refInputElem as HTMLInputElement;
      input?.blur();
    },

    handleInput(e: any): void {
      if (e.isComposing || e.inputType === 'insertCompositionText') return;
      this.inputValueChangeHandle(e);
    },
    onCompositionend(e: InputEvent | CompositionEvent) {
      this.inputValueChangeHandle(e as InputEvent);
    },
    inputValueChangeHandle(e: InputEvent) {
      const { target } = e;
      let val = (target as HTMLInputElement).value;
      if (this.maxcharacter && this.maxcharacter >= 0) {
        const stringInfo = getCharacterLength(val, this.maxcharacter);
        val = typeof stringInfo === 'object' && stringInfo.characters;
      }
      this.$emit('input', val);
      this.emitEvent('change', val, { e: InputEvent });

      this.$nextTick(() => this.setInputValue(val));
      this.adjustTextareaHeight();
    },
    setInputValue(v: TextareaValue = ''): void {
      const textareaElem = this.$refs.refTextareaElem as HTMLInputElement;
      const sV = String(v);
      if (!textareaElem) {
        return;
      }
      if (textareaElem.value !== sV) {
        textareaElem.value = sV;
      }
    },
    emitKeyDown(e: KeyboardEvent) {
      if (this.disabled) return;
      this.emitEvent('keydown', this.value, { e });
    },
    emitKeyUp(e: KeyboardEvent) {
      if (this.disabled) return;
      this.emitEvent('keyup', this.value, { e });
    },
    emitKeypress(e: KeyboardEvent) {
      if (this.disabled) return;
      this.emitEvent('keypress', this.value, { e });
    },
    emitFocus(e: FocusEvent) {
      if (this.disabled) return;
      this.focused = true;
      this.emitEvent('focus', this.value, { e });
    },
    emitBlur(e: FocusEvent) {
      this.focused = false;
      this.emitEvent('blur', this.value, { e });
    },
  },

  render() {
    const inputEvents = getValidAttrs({
      onFocus: this.emitFocus,
      onBlur: this.emitBlur,
      onKeydown: this.emitKeyDown,
      onKeyup: this.emitKeyUp,
      onKeypress: this.emitKeypress,
    });
    const classes = [
      `${name}__inner`,
      {
        [CLASSNAMES.STATUS.disabled]: this.disabled,
        [CLASSNAMES.STATUS.focused]: this.focused,
        [`${prefix}-resize-none`]: this.maxlength,
      },
    ];

    return (
      <div class={`${name}`}>
        <textarea
          onInput={this.handleInput}
          onCompositionend={this.onCompositionend}
          {...inputEvents}
          {...this.$attrs}
          {...this.inputAttrs}
          ref="refTextareaElem"
          value={this.value}
          style={this.textareaStyle}
          class={classes}
        ></textarea>
        {this.maxcharacter && <span class={`${name}__limit`}>{`${this.characterNumber}/${this.maxcharacter}`}</span>}
        {!this.maxcharacter && this.maxlength ? (
          <span class={`${name}__limit`}>{`${this.value ? String(this.value)?.length : 0}/${this.maxlength}`}</span>
        ) : null}
      </div>
    );
  },
});
