import {
  defineComponent,
  computed,
  watch,
  ref,
  nextTick,
  onMounted,
  toRefs,
  inject,
  normalizeStyle,
  CSSProperties,
} from 'vue';
import { omit } from 'lodash-es';

import { FormItemInjectionKey } from '../form/constants';
import setStyle from '@tdesign/common-js/utils/setStyle';
import { getCharacterLength, getUnicodeLength, getValidAttrs } from '@tdesign/common-js/utils/helper';

// hooks
import {
  useVModel,
  useDisabled,
  useReadonly,
  useTNodeJSX,
  usePrefixClass,
  useCommonClassName,
} from '@tdesign/shared-hooks';

import { useLengthLimit } from '../input/hooks/useLengthLimit';

import props from './props';
import type { TextareaValue, TdTextareaProps } from './type';

import calcTextareaHeight from '@tdesign/common-js/utils/calcTextareaHeight';

export default defineComponent({
  name: 'TTextarea',
  inheritAttrs: false,
  props,
  setup(props: TdTextareaProps, { attrs, expose }) {
    const prefix = usePrefixClass();
    const name = usePrefixClass('textarea');
    const TEXTAREA_TIPS_CLASS = computed(() => `${name.value}__tips`);
    const TEXTAREA_LIMIT = computed(() => `${name.value}__limit`);

    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const disabled = useDisabled();
    const isReadonly = useReadonly();
    const textareaStyle = ref<CSSProperties>({});

    const refTextareaElem = ref<HTMLTextAreaElement>();
    const focused = ref(false);
    const isComposing = ref(false);
    let previousTextareaStyle: Record<string, any> = {};

    const limitParams = computed(() => ({
      value: [undefined, null].includes(innerValue.value) ? undefined : String(innerValue.value),
      status: props.status,
      maxlength: Number(props.maxlength),
      maxcharacter: props.maxcharacter,
      allowInputOverMax: props.allowInputOverMax,
      onValidate: props.onValidate,
    }));
    const { tStatus, getValueByLimitNumber } = useLengthLimit(limitParams);

    const focus = () => refTextareaElem.value?.focus();
    const blur = () => refTextareaElem.value?.blur();

    // methods
    const adjustTextareaHeight = () => {
      if (props.autosize === true) {
        nextTick(() => {
          textareaStyle.value = calcTextareaHeight(refTextareaElem.value);
        });
      } else if (props.autosize && typeof props.autosize === 'object') {
        const { minRows, maxRows } = props.autosize;
        nextTick(() => {
          textareaStyle.value = calcTextareaHeight(refTextareaElem.value, minRows, maxRows);
        });
      } else if (attrs.rows) {
        textareaStyle.value = { height: 'auto', minHeight: 'auto' };
      } else if (attrs.style && (attrs.style as CSSProperties)?.height) {
        textareaStyle.value = { height: (attrs.style as CSSProperties)?.height };
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
      }
    };
    const inputValueChangeHandle = (e: InputEvent) => {
      const { target } = e;
      const inputValue = (target as HTMLInputElement).value;
      const val = getValueByLimitNumber(inputValue) ?? inputValue;
      setInnerValue(val, { e });
      nextTick(() => setInputValue(val));
      adjustTextareaHeight();
    };

    const handleInput = (e: InputEvent) => {
      if (e.inputType === 'insertCompositionText' || isComposing.value) {
        adjustTextareaHeight();
        return;
      }
      inputValueChangeHandle(e);
    };

    const onCompositionstart = () => {
      isComposing.value = true;
    };

    const onCompositionend = (e: InputEvent | CompositionEvent) => {
      isComposing.value = false;
      inputValueChangeHandle(e as InputEvent);
    };

    const eventDeal = <T extends 'keydown' | 'keyup' | 'keypress'>(name: T, e: KeyboardEvent) => {
      if (disabled.value) return;
      const eventName = `on${name[0].toUpperCase()}${name.slice(1)}` as `on${Capitalize<T>}`;
      props[eventName]?.(innerValue.value, { e });
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
      if (!e.target) return;
      focused.value = false;
      props.onBlur?.(innerValue.value, { e });
      formItem?.handleBlur();
    };

    // computed
    const textareaClasses = computed(() => {
      return [
        name.value,
        {
          [`${prefix.value}-is-disabled`]: disabled.value,
          [`${prefix.value}-is-readonly`]: isReadonly.value,
        },
      ];
    });
    const inputAttrs = computed<Record<string, any>>(() => {
      // 在 input 事件中处理 maxlength，确保 Unicode 字符的输入限制与计数规则一致。
      return getValidAttrs({
        autofocus: props.autofocus,
        disabled: disabled.value,
        readonly: isReadonly.value,
        placeholder: props.placeholder,
        name: props.name || undefined,
      });
    });
    const characterNumber = computed(() => {
      const characterInfo = getCharacterLength(String(innerValue.value || ''));
      if (typeof characterInfo === 'object') {
        // @ts-ignore
        // TODO: 这里的写法本身就有问题，因为 getCharacterLength(String(innerValue.value || '')) 一定会返回 number，所以这个分支肯定是进不了的，除非 getCharacterLength 写得有问题
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
      if (props.autofocus) {
        el.focus();
      }
    });

    watch(
      [refTextareaElem, textareaStyle, () => attrs.style],
      ([el, internalStyle, style]) => {
        if (!el) return;
        const normalizedStyle = (normalizeStyle([style]) || {}) as Record<string, any>;
        const nextStyle = { ...normalizedStyle, ...internalStyle };
        const removedStyle = Object.keys(previousTextareaStyle).reduce<Record<string, string>>((result, key) => {
          if (!(key in nextStyle)) result[key] = '';
          return result;
        }, {});

        setStyle(el, { ...removedStyle, ...nextStyle });
        previousTextareaStyle = nextStyle;
      },
      { deep: true },
    );

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
          [`${prefix.value}-is-${tStatus.value}`]: tStatus.value,
          [STATUS.value.disabled]: disabled.value,
          [STATUS.value.focused]: focused.value,
          [`${prefix.value}-resize-none`]: typeof props.autosize === 'object',
          [`${prefix.value}-hide-scrollbar`]: props.autosize === true,
        },
      ]);

      const tips = renderTNodeJSX('tips');

      const textTips = tips && (
        <div class={`${TEXTAREA_TIPS_CLASS.value} ${name.value}__tips--${props.status || 'normal'}`}>{tips}</div>
      );

      const limitText =
        (props.maxcharacter && (
          <span class={TEXTAREA_LIMIT.value}>{`${characterNumber.value}/${props.maxcharacter}`}</span>
        )) ||
        (!props.maxcharacter && props.maxlength && (
          <span class={TEXTAREA_LIMIT.value}>{`${getUnicodeLength(String(innerValue.value ?? ''))}/${
            props.maxlength
          }`}</span>
        ));

      return (
        <div class={textareaClasses.value} {...omit(attrs, ['style'])}>
          <textarea
            onInput={handleInput}
            onCompositionstart={onCompositionstart}
            onCompositionend={onCompositionend}
            ref={refTextareaElem}
            value={innerValue.value}
            class={classes.value}
            {...inputEvents}
            {...inputAttrs.value}
          ></textarea>
          {textTips || limitText ? (
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
          ) : null}
        </div>
      );
    };
  },
});
