import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  ref,
  toRefs,
  watch,
} from '@td/adapter-vue';
import type {
  CSSProperties,
  InjectionKey,
  StyleValue,
} from '@td/adapter-vue';
import { isUndefined, merge, omit } from 'lodash-es';

import { getCharacterLength } from '@td/adapter-utils';

// import { FormItemInjectionKey } from '../form/const';
import setStyle from '@td/shared/_common/js/utils/set-style';

// hooks
import { useCommonClassName, useEmitEvent, usePrefixClass, useTNodeJSX, useVModel } from '@td/adapter-hooks';
// ! 1. 为啥要到 form 取，2. 是不是考虑全局
import { useDisabled } from '@td/adapter-hooks';

import props from '@td/intel/components/textarea/props';
import type { TdTextareaProps, TextareaValue } from '@td/intel/components/textarea/type';
import calcTextareaHeight from './calcTextareaHeight';
// vue23:! 这个也一样好吧
export const FormItemInjectionKey: InjectionKey<{
  handleBlur: () => Promise<void>;
}> = Symbol('FormItemProvide');

function getValidAttrs(obj: object): object {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!isUndefined(obj[key])) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export default defineComponent({
  name: 'TTextarea',
  inheritAttrs: false,
  props: { ...props },

  setup(props: TdTextareaProps, { attrs, expose }) {
    const prefix = usePrefixClass();
    const name = usePrefixClass('textarea');
    const TEXTAREA_TIPS_CLASS = computed(() => `${name.value}__tips`);
    const TEXTAREA_LIMIT = computed(() => `${name.value}__limit`);
    const emitEvent = useEmitEvent();

    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    //   // vue23:!
    const disabled = useDisabled();
    const textareaStyle = ref<CSSProperties>({});

    const refTextareaElem = ref<HTMLTextAreaElement>();
    const focused = ref(false);
    const isComposing = ref(false);

    const focus = () => refTextareaElem.value?.focus();
    const blur = () => refTextareaElem.value?.blur();

    // methods
    const adjustTextareaHeight = () => {
      if (props.autosize === true) {
        textareaStyle.value = calcTextareaHeight(refTextareaElem.value);
      } else if (props.autosize && typeof props.autosize === 'object') {
        const { minRows, maxRows } = props.autosize;
        textareaStyle.value = calcTextareaHeight(refTextareaElem.value, minRows, maxRows);
      } else if (attrs.rows) {
        textareaStyle.value = { height: 'auto', minHeight: 'auto' };
      } else if (attrs.style && refTextareaElem.value?.style?.height) {
        textareaStyle.value = { height: refTextareaElem.value.style.height };
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
      !isComposing.value && setInnerValue(val, { e });
      nextTick(() => setInputValue(val));
      adjustTextareaHeight();
    };

    const handleInput = (e: InputEvent) => {
      inputValueChangeHandle(e);
    };

    const onCompositionstart = () => {
      isComposing.value = true;
    };

    const onCompositionend = (e: InputEvent | CompositionEvent) => {
      isComposing.value = false;
      inputValueChangeHandle(e as InputEvent);
    };

    const eventDeal = (name: 'keydown' | 'keyup' | 'keypress' | 'change', e: KeyboardEvent | FocusEvent) => {
      if (disabled.value) {
        return;
      }
      emitEvent(name, innerValue.value, { e });
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
      adjustTextareaHeight();
      if (disabled.value) {
        return;
      }
      focused.value = true;
      emitEvent('focus', innerValue.value, { e });
    };

    // ! 这是什么意思呀，很奇怪呀，formItem 的东西怎么在这里触发的
    const formItem = inject(FormItemInjectionKey, undefined);
    const emitBlur = (e: FocusEvent) => {
      adjustTextareaHeight();
      focused.value = false;
      emitEvent('blur', innerValue.value, { e });
      formItem?.handleBlur();
    };

    // computed
    const textareaClasses = computed(() => {
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
      if (!el) {
        return;
      }
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

    watch(textareaStyle, (val) => {
      const { style } = attrs as { style: StyleValue };
      setStyle(refTextareaElem.value, merge(style, val));
    });

    watch(innerValue, () => {
      nextTick(() => adjustTextareaHeight());
    });

    watch(() => props.autosize, adjustTextareaHeight, { deep: true });

    expose({
      focus,
      blur,
    });

    onMounted(() => {
      adjustTextareaHeight();
    });

    const renderTNodeJSX = useTNodeJSX();
    return () => {
      const { STATUS } = useCommonClassName();
      const classes = computed(() => [
        `${name.value}__inner`,
        {
          [`${prefix.value}-is-${props.status}`]: props.status,
          [STATUS.value.disabled]: disabled.value,
          [STATUS.value.focused]: focused.value,
          [`${prefix.value}-resize-none`]: typeof props.autosize === 'object',
        },
        'narrow-scrollbar',
      ]);

      const tips = renderTNodeJSX('tips');

      const textTips = tips && (
        <div class={`${TEXTAREA_TIPS_CLASS.value} ${name.value}__tips--${props.status || 'normal'}`}>{tips}</div>
      );

      const limitText
        = (props.maxcharacter && (
          <span class={TEXTAREA_LIMIT.value}>{`${characterNumber.value}/${props.maxcharacter}`}</span>
        ))
        || (!props.maxcharacter && props.maxlength && (
          <span class={TEXTAREA_LIMIT.value}>
            {`${innerValue.value ? String(innerValue.value)?.length : 0}/${
            props.maxlength
          }`}
          </span>
        ));

      // ! 这里把 omit 替换成 lodash 了
      return (
        <div class={textareaClasses.value} {...omit(attrs, ['style'])}>
          <textarea
            onInput={handleInput}
            onCompositionstart={onCompositionstart}
            onCompositionend={onCompositionend}
            ref={refTextareaElem}
            value={innerValue.value}
            class={classes.value}
            onFocus={emitFocus}
            onBlur={emitBlur}
            onKeydown={emitKeyDown}
            onKeyup={emitKeyUp}
            onKeypress={emitKeypress}
            {...inputAttrs.value}
          >
          </textarea>
          {textTips || limitText
            ? (
              <div
                class={[
                `${name.value}__info_wrapper`,
                {
                  [`${name.value}__info_wrapper_align`]: !textTips,
                },
                ]}
              >
                {textTips}
                {limitText}
              </div>
              )
            : null}
        </div>
      );
    };
  },
});
