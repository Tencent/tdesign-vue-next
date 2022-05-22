import { ref, computed, watch, nextTick, toRefs, inject } from 'vue';
import { getCharacterLength } from '../utils/helper';
import { TdInputProps, InputValue } from './type';
import { FormItemInjectionKey } from '../form/const';

import useVModel from '../hooks/useVModel';

export default function useInput(props: TdInputProps, expose: (exposed: Record<string, any>) => void) {
  const { value, modelValue } = toRefs(props);
  const inputValue = ref<InputValue>();
  const clearIconRef = ref(null);
  const innerClickElement = ref();
  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

  const isHover = ref(false);
  const focused = ref(false);
  const renderType = ref(props.type);
  const inputRef = ref<HTMLInputElement>(null);
  const inputPreRef = ref(null);

  const showClear = computed(() => {
    return (
      ((innerValue.value && !props.disabled && props.clearable && !props.readonly) || props.showClearIconOnEmpty) &&
      isHover.value
    );
  });

  const focus = () => inputRef.value?.focus();
  const blur = () => inputRef.value?.blur();

  const emitFocus = (e: FocusEvent) => {
    inputValue.value = innerValue.value;
    if (props.disabled || props.readonly) return;
    focused.value = true;
    props.onFocus?.(innerValue.value, { e });
  };

  const emitClear = ({ e }: { e: MouseEvent }) => {
    props.onClear?.({ e });
    setInnerValue('');
  };

  const onClearIconMousedown = (e: MouseEvent) => {
    innerClickElement.value = e.target;
  };

  const emitPassword = () => {
    const toggleType = renderType.value === 'password' ? 'text' : 'password';
    renderType.value = toggleType;
  };

  const setInputElValue = (v: InputValue = '') => {
    const inputEl = inputRef.value as HTMLInputElement;
    if (!inputEl) return;
    const sV = String(v);
    if (!inputEl.value) {
      return;
    }
    if (inputEl.value !== sV) {
      inputEl.value = sV;
    }
  };
  const inputValueChangeHandle = (e: InputEvent | CompositionEvent) => {
    const { target } = e;
    let val = (target as HTMLInputElement).value;
    if (props.maxcharacter && props.maxcharacter >= 0) {
      const stringInfo = getCharacterLength(val, props.maxcharacter);
      val = typeof stringInfo === 'object' && stringInfo.characters;
    }
    setInnerValue(val, { e } as { e: InputEvent });
    // 受控
    nextTick(() => setInputElValue(innerValue.value));
  };

  const handleInput = (e: InputEvent) => {
    const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
    if (e.isComposing || checkInputType) return;
    inputValueChangeHandle(e);
  };

  const isClearIcon = () => {
    let tmp = innerClickElement.value;
    if (!tmp || !tmp.tagName || !clearIconRef.value?.$el || !['path', 'svg'].includes(tmp.tagName)) return false;
    while (tmp) {
      if (clearIconRef.value?.$el === tmp) {
        return true;
      }
      tmp = tmp.parentNode;
    }
    return false;
  };

  const formItem = inject(FormItemInjectionKey, undefined);
  const formatAndEmitBlur = (e: FocusEvent) => {
    if (props.format) {
      inputValue.value = props.format(innerValue.value);
    }
    focused.value = false;
    // @ts-ignore 点击清空按钮的时候，不应该触发 onBlur 事件。这个规则在表格单元格编辑中有很重要的应用
    if (!isClearIcon()) {
      props.onBlur?.(props.value, { e });
      formItem?.handleBlur();
    }
  };

  const onHandleCompositionend = (e: CompositionEvent) => {
    inputValueChangeHandle(e);
    props.onCompositionend?.(innerValue.value, { e });
  };
  const onHandleCompositionstart = (e: CompositionEvent) => {
    props.onCompositionstart?.(innerValue.value, { e });
  };

  const onRootClick = (e: MouseEvent) => {
    inputRef.value?.focus();
  };

  watch(
    () => props.autofocus,
    (value) => {
      if (value === true) {
        nextTick(() => {
          inputRef.value?.focus();
        });
      }
    },
    { immediate: true },
  );

  watch(
    innerValue,
    (v) => {
      inputValue.value = v;
    },
    { immediate: true },
  );

  expose({
    focus,
    blur,
  });

  return {
    isHover,
    focused,
    renderType,
    showClear,
    inputRef,
    clearIconRef,
    inputValue,
    emitFocus,
    formatAndEmitBlur,
    onHandleCompositionend,
    onHandleCompositionstart,
    onRootClick,
    emitPassword,
    handleInput,
    emitClear,
    onClearIconMousedown,
    innerValue,
    inputPreRef,
  };
}
