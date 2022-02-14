import { defineComponent } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { TextareaValue } from './type';
import { getCharacterLength } from '../utils/helper';
import calcTextareaHeight from './calcTextareaHeight';
import { emitEvent } from '../utils/event';
import { renderTNodeJSX } from '../utils/render-tnode';
import { ClassName } from '../common';

// hooks
import { useFormDisabled } from '../form/form';

const name = `${prefix}-textarea`;
const TEXTAREA_WRAP_CLASS = `${prefix}-textarea__wrap`;
const TEXTAREA_TIPS_CLASS = `${prefix}-textarea__tips`;
const TEXTAREA_LIMIT = `${name}__limit`;

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
  name: 'TTextarea',
  inheritAttrs: false,
  props: { ...props },
  emits: ['keydown', 'keyup', 'keypress', 'focus', 'blur', 'change', 'update:value'],
  setup() {
    const disabled = useFormDisabled();
    return {
      disabled,
    };
  },
  data() {
    return {
      focused: false,
      mouseHover: false,
      textareaStyle: {},
    };
  },
  computed: {
    textareaClasses(): ClassName {
      return [
        name,
        {
          [`${prefix}-is-disabled`]: this.disabled,
          [`${prefix}-is-readonly`]: this.readonly,
        },
      ];
    },
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
      const characterInfo = getCharacterLength(String(this.value || ''));
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
      this.$emit('update:value', val);
      emitEvent(this, 'change', val, { e });

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
      emitEvent(this, 'keydown', this.value, { e });
    },
    emitKeyUp(e: KeyboardEvent) {
      if (this.disabled) return;
      emitEvent(this, 'keyup', this.value, { e });
    },
    emitKeypress(e: KeyboardEvent) {
      if (this.disabled) return;
      emitEvent(this, 'keypress', this.value, { e });
    },
    emitFocus(e: FocusEvent) {
      if (this.disabled) return;
      this.focused = true;
      emitEvent(this, 'focus', this.value, { e });
    },
    emitBlur(e: FocusEvent) {
      this.focused = false;
      emitEvent(this, 'blur', this.value, { e });
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
        [`${prefix}-is-${this.status}`]: this.status,
        [CLASSNAMES.STATUS.disabled]: this.disabled,
        [CLASSNAMES.STATUS.focused]: this.focused,
        [`${prefix}-resize-none`]: this.maxlength,
      },
      'narrow-scrollbar',
    ];

    const textareaNode = (
      <div class={this.textareaClasses}>
        <textarea
          onInput={this.handleInput}
          onCompositionend={this.onCompositionend}
          ref="refTextareaElem"
          value={this.value}
          style={this.textareaStyle}
          class={classes}
          {...this.$attrs}
          {...inputEvents}
          {...this.inputAttrs}
        ></textarea>
        {this.maxcharacter && <span class={TEXTAREA_LIMIT}>{`${this.characterNumber}/${this.maxcharacter}`}</span>}
        {!this.maxcharacter && this.maxlength ? (
          <span class={TEXTAREA_LIMIT}>{`${this.value ? String(this.value)?.length : 0}/${this.maxlength}`}</span>
        ) : null}
      </div>
    );

    const tips = renderTNodeJSX(this, 'tips');
    if (tips) {
      return (
        <div class={TEXTAREA_WRAP_CLASS}>
          {textareaNode}
          <div class={`${TEXTAREA_TIPS_CLASS} ${prefix}-textarea__tips--${this.status || 'normal'}`}>{tips}</div>
        </div>
      );
    }
    return textareaNode;
  },
});
