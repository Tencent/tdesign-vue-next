import Vue from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from '../../types/textarea/props';
import isFunction from 'lodash/isFunction';
import { getPropsApiByEvent } from '../utils/helper';

const name = `${prefix}-textarea`;
function getValidAttrs(obj: object): object {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}
export default Vue.extend({
  name,
  props: {
    ...props,
  },
  data() {
    return {
      focused: false,
      mouseHover: false,
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
  },

  methods: {
    emitEvent(name: string, value: string | number, context: object) {
      this.$emit(name, value, context);
      const handleName = getPropsApiByEvent(name);
      isFunction(this[handleName]) && this[handleName](value, context);
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
      const { target } = e;
      const val = (target as HTMLInputElement).value;
      this.$emit('input', val);
      this.emitEvent('change', val, { e: InputEvent });
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
      focus: this.emitFocus,
      blur: this.emitBlur,
      keydown: this.emitKeyDown,
      keyup: this.emitKeyUp,
      keypress: this.emitKeypress,
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
          {...{ attrs: this.inputAttrs, on: inputEvents }}
          value={this.value}
          class={classes}
        ></textarea>
        {this.maxlength ? (
          <span class={`${name}__limit`}>{`${String(this.value)?.length || 0}/${this.maxlength}`}</span>
        ) : null}
      </div>
    );
  },
});
