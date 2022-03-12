import { defineComponent, computed, watch, ref, nextTick, onMounted } from 'vue';
import { prefix } from '../config';
import CLASSNAMES from '../utils/classnames';
import props from './props';
import { TextareaValue } from './type';
import { getCharacterLength } from '../utils/helper';
import calcTextareaHeight from './calcTextareaHeight';
import { renderTNodeJSX } from '../utils/render-tnode';
import { ClassName } from '../common';

// hooks
import { useFormDisabled } from '../form/hooks';

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
  setup(props, { attrs, emit }) {
    const disabled = useFormDisabled();
    const textareaStyle = ref({});
    const refTextareaElem = ref<HTMLTextAreaElement>();
    const refInputElem = ref<HTMLInputElement>();
    const value = ref(props.value || '');
    const focused = ref(false);

    // methods
    const adjustTextareaHeight = () => {
      if (props.autosize === true) {
        textareaStyle.value = calcTextareaHeight(refTextareaElem.value);
      } else if (typeof props.autosize === 'object') {
        const { minRows, maxRows } = props.autosize;
        textareaStyle.value = calcTextareaHeight(refTextareaElem.value, minRows, maxRows);
      } else if (attrs.rows) {
        textareaStyle.value = { height: 'auto', minHeight: 'auto' };
      }
    };
    const focus = () => {
      refInputElem.value?.focus();
    };
    const blur = () => {
      refInputElem.value?.blur();
    };

    const setInputValue = (v: TextareaValue = '') => {
      const textareaElem = refTextareaElem.value;
      const sV = String(v);
      if (!textareaElem) {
        return;
      }
      if (textareaElem.value !== sV) {
        textareaElem.value = sV;
        value.value = sV;
      }
    };
    const inputValueChangeHandle = (e: InputEvent) => {
      const { target } = e;
      let val = (target as HTMLInputElement).value;
      if (props.maxcharacter && props.maxcharacter >= 0) {
        const stringInfo = getCharacterLength(val, props.maxcharacter);
        val = typeof stringInfo === 'object' && stringInfo.characters;
      }
      emit('update:value', val);
      emit('change', val, { e });
      nextTick(() => setInputValue(val));
      adjustTextareaHeight();
    };

    const handleInput = (e: any) => {
      if (e.isComposing || e.inputType === 'insertCompositionText') return;
      inputValueChangeHandle(e);
    };
    const onCompositionend = (e: InputEvent | CompositionEvent) => {
      inputValueChangeHandle(e as InputEvent);
    };

    const eventDeal = (name: 'keydown' | 'keyup' | 'keypress' | 'change', e: KeyboardEvent | FocusEvent) => {
      if (disabled.value) return;
      const _name = `on${name[0].toUpperCase()}${name.slice(1)}`;
      if (props[_name] && typeof props[_name] === 'function') {
        props[_name](value.value, { e });
      } else {
        emit(name, value.value, { e });
      }
    };

    const emitKeyDown = (e: KeyboardEvent) => {
      eventDeal('keydown', e);
    };
    const emitKeyUp = (e: KeyboardEvent) => {
      eventDeal('keyup', e);
    };
    const emitKeypress = (e: KeyboardEvent) => {
      eventDeal('keypress', e);
    };

    const emitFocus = (e: FocusEvent) => {
      if (disabled.value) return;
      focused.value = true;
      if (props.onFocus && typeof props.onFocus === 'function') {
        props.onFocus(value.value, { e });
      } else {
        emit('focus', value.value, { e });
      }
    };
    const emitBlur = (e: FocusEvent) => {
      focused.value = false;
      if (props.onBlur && typeof props.onBlur === 'function') {
        props.onBlur(value.value, { e });
      } else {
        emit('blur', value.value, { e });
      }
    };

    // computed
    const textareaClasses = computed<ClassName>(() => {
      return [
        name,
        {
          [`${prefix}-is-disabled`]: disabled.value,
          [`${prefix}-is-readonly`]: props.readonly,
        },
      ];
    });
    const inputAttrs = computed<Record<string, any>>(() => {
      return getValidAttrs({
        autofocus: props.autofocus,
        disabled: disabled.value,
        readonly: props.readonly,
        placeholder: props.placeholder,
        maxlength: props.maxlength || undefined,
        name: props.name || undefined,
      });
    });
    const characterNumber = computed<number>(() => {
      const characterInfo = getCharacterLength(String(value.value || ''));
      if (typeof characterInfo === 'object') {
        return characterInfo.length;
      }
      return characterInfo;
    });

    // watch
    watch(
      () => props.value,
      () => adjustTextareaHeight(),
    );
    onMounted(() => {
      adjustTextareaHeight();
    });

    return {
      refTextareaElem,
      refInputElem,
      disabled,
      focused,
      value,
      textareaStyle,
      textareaClasses,
      inputAttrs,
      characterNumber,
      handleInput,
      onCompositionend,
      emitFocus,
      emitBlur,
      emitKeyDown,
      emitKeyUp,
      emitKeypress,
      focus,
      blur,
    };
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
