import { defineComponent, computed, watch, ref, nextTick, onMounted, toRefs, inject } from 'vue';
import props from './props';
import { TextareaValue } from './type';
import { getCharacterLength } from '../utils/helper';
import calcTextareaHeight from './calcTextareaHeight';
import { ClassName } from '../common';
import { FormItemInjectionKey } from '../form/const';

// hooks
import useVModel from '../hooks/useVModel';
import { useFormDisabled } from '../form/hooks';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass, useCommonClassName } from '../hooks/useConfig';

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
  props: { ...props },

  setup(props, { attrs }) {
    const prefix = usePrefixClass();
    const name = usePrefixClass('textarea');
    const TEXTAREA_TIPS_CLASS = computed(() => `${name.value}__tips`);
    const TEXTAREA_LIMIT = computed(() => `${name.value}__limit`);

    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const disabled = useFormDisabled();
    const textareaStyle = ref({});
    const refTextareaElem = ref<HTMLTextAreaElement>();
    const focused = ref(false);

    // methods
    const adjustTextareaHeight = () => {
      if (props.autosize === true) {
        nextTick(() => {
          textareaStyle.value = calcTextareaHeight(refTextareaElem.value);
        });
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
        innerValue.value = sV;
      }
    };
    const inputValueChangeHandle = (e: InputEvent) => {
      const { target } = e;
      let val = (target as HTMLInputElement).value;
      if (props.maxcharacter && props.maxcharacter >= 0) {
        const stringInfo = getCharacterLength(val, props.maxcharacter);
        val = typeof stringInfo === 'object' && stringInfo.characters;
      }
      setInnerValue(val, { e });
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
      props[_name]?.(innerValue.value, { e });
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
      props.onFocus?.(innerValue.value, { e });
    };

    const formItem = inject(FormItemInjectionKey, undefined);
    const emitBlur = (e: FocusEvent) => {
      focused.value = false;
      props.onBlur?.(innerValue.value, { e });
      formItem?.handleBlur();
    };

    // computed
    const textareaClasses = computed<ClassName>(() => {
      return [
        name.value,
        {
          [`${prefix.value}-is-disabled`]: disabled.value,
          [`${prefix.value}-is-readonly`]: props.readonly,
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
    const characterNumber = computed(() => {
      const characterInfo = getCharacterLength(String(innerValue.value || ''));
      if (typeof characterInfo === 'object') {
        return characterInfo.length;
      }
      return characterInfo;
    });

    // watch
    watch(
      () => innerValue.value,
      () => adjustTextareaHeight(),
    );

    watch(refTextareaElem, (el) => {
      if (!el) return;
      adjustTextareaHeight();
    });

    watch(
      () => props.autofocus,
      (val) => {
        if (val) {
          refTextareaElem.value.focus();
        }
      },
    );

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
      const classes = computed(() => [
        `${name.value}__inner`,
        {
          [`${prefix.value}-is-${props.status}`]: props.status,
          [STATUS.value.disabled]: disabled.value,
          [STATUS.value.focused]: focused.value,
          [`${prefix.value}-resize-none`]: props.maxlength,
        },
        'narrow-scrollbar',
      ]);

      const tips = renderTNodeJSX('tips');

      return (
        <div class={textareaClasses.value}>
          <textarea
            onInput={handleInput}
            onCompositionend={onCompositionend}
            ref={refTextareaElem}
            value={innerValue.value}
            style={textareaStyle.value}
            class={classes.value}
            {...inputEvents}
            {...inputAttrs.value}
          ></textarea>
          {props.maxcharacter && (
            <span class={TEXTAREA_LIMIT.value}>{`${characterNumber.value}/${props.maxcharacter}`}</span>
          )}
          {!props.maxcharacter && props.maxlength ? (
            <span class={TEXTAREA_LIMIT.value}>{`${innerValue.value ? String(innerValue.value)?.length : 0}/${
              props.maxlength
            }`}</span>
          ) : null}
          {tips && (
            <div class={`${TEXTAREA_TIPS_CLASS.value} ${name.value}__tips--${props.status || 'normal'}`}>{tips}</div>
          )}
        </div>
      );
    };
  },
});
