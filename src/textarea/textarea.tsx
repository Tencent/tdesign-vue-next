import { prefix } from "@src/config";
import { getPropsApiByEvent, omit } from "@src/utils/helper";
import { defineComponent } from "vue";
import props from '../../types/textarea/props';
import CLASSNAMES from '../utils/classnames';
import isFunction from 'lodash/isFunction';

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
  props: {...props},
  inheritAttrs: false,
  emits: ['input','keydown','keyup','keypress','focus','blur','change','update:value'],
  data() {
    return {
      focused: false,
      mouseHover: false,
    };
  },
  methods: {
    emitEvent(name: TextareaEmitEvent, value: string | number, context: object) {
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
      this.$emit('update:value', val);
      this.emitEvent('change', val, { e: InputEvent });
      // this.value = val;
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
      console.log('key press',e)
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

    // console.log('.......',this.value)
    // console.log('props',props.value)

    return (
      <div class={`${name}`}>
        <textarea
          onInput={this.handleInput}
          {...inputEvents}
          {...this.inputAttrs}
          ref="refInputElem"
          value={this.value}
          class={classes}
        ></textarea>
        {this.maxlength ? (
          <span class={`${name}__limit`}>{`${String(this.value)?.length || 0}/${this.maxlength}`}</span>
        ) : null}
      </div>
    );
  },
})