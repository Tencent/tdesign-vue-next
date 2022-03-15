import { defineComponent, computed, watch, ref, nextTick, onMounted } from 'vue';
import { usePrefixClass, useCommonClassName } from '../config-provider';
import props from './props';
import { TextareaValue } from './type';
import { getCharacterLength } from '../utils/helper';
import calcTextareaHeight from './calcTextareaHeight';
import { ClassName } from '../common';

// hooks
import { useFormDisabled } from '../form/hooks';
import { useTNodeJSX } from '../hooks/tnode';

const prefix = usePrefixClass().value;

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
  emits: ['change', 'update:value'],
  setup(props, { attrs, emit }) {
    const disabled = useFormDisabled();
    const textareaStyle = ref({});
    const refTextareaElem = ref<HTMLTextAreaElement>();
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
      props[_name]?.(value.value, { e });
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
      props.onFocus?.(value.value, { e });
    };
    const emitBlur = (e: FocusEvent) => {
      focused.value = false;
      props.onBlur?.(value.value, { e });
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
    watch(refTextareaElem, (el) => {
      if (!el) return;
      adjustTextareaHeight();
    });
    onMounted(() => {
      adjustTextareaHeight();
    });

    const renderTNodeJSX = useTNodeJSX();
    return () => {
      const inputEvents = getValidAttrs({
        onFocus: emitFocus,
        onBlur: emitBlur,
        onKeydown: emitKeyDown,
        onKeyup: emitKeyUp,
        onKeypress: emitKeypress,
      });
      const { STATUS } = useCommonClassName();
      const classes = [
        `${name}__inner`,
        {
          [`${prefix}-is-${props.status}`]: props.status,
          [STATUS.value.disabled]: disabled.value,
          [STATUS.value.focused]: focused.value,
          [`${prefix}-resize-none`]: props.maxlength,
        },
        'narrow-scrollbar',
      ];

      const textareaNode = (
        <div class={textareaClasses.value}>
          <textarea
            onInput={handleInput}
            onCompositionend={onCompositionend}
            ref={refTextareaElem}
            value={value.value}
            style={textareaStyle.value}
            class={classes}
            {...attrs}
            {...inputEvents}
            {...inputAttrs.value}
          ></textarea>
          {props.maxcharacter && <span class={TEXTAREA_LIMIT}>{`${characterNumber.value}/${props.maxcharacter}`}</span>}
          {!props.maxcharacter && props.maxlength ? (
            <span class={TEXTAREA_LIMIT}>{`${value.value ? String(value.value)?.length : 0}/${props.maxlength}`}</span>
          ) : null}
        </div>
      );

      const tips = renderTNodeJSX('tips');
      if (tips) {
        return (
          <div class={TEXTAREA_WRAP_CLASS}>
            {textareaNode}
            <div class={`${TEXTAREA_TIPS_CLASS} ${prefix}-textarea__tips--${props.status || 'normal'}`}>{tips}</div>
          </div>
        );
      }

      return textareaNode;
    };
  },
});
