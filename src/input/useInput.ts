import { ref, computed, watch, nextTick, toRefs } from 'vue';
import { getCharacterLength } from '../utils/helper';
import { TdInputProps, InputValue } from './type';
import { useEmitEvent } from '../hooks/event';
import useVModel from '../hooks/useVModel';

export default function useInput(props: TdInputProps) {
  const { value, modelValue } = toRefs(props);
  const inputValue = ref<InputValue>();
  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
  const emitEvent = useEmitEvent();

  const isHover = ref(false);
  const focused = ref(false);
  const renderType = ref(props.type);
  const inputRef = ref(null);

  const showClear = computed(
    () =>
      (props.value && !props.disabled && props.clearable && isHover.value && !props.readonly) ||
      props.showClearIconOnEmpty,
  );

  const focus = () => inputRef.value?.focus();
  const blur = () => inputRef.value?.blur();

  const emitFocus = (e: FocusEvent) => {
    inputValue.value = innerValue.value;
    if (props.disabled || props.readonly) return;
    focused.value = true;
    emitEvent('focus', innerValue.value, { e });
  };
  const emitClear = ({ e }: { e: MouseEvent }) => {
    emitEvent('clear', { e });
    emitEvent('change', '', { e });
    focus();
    emitFocus(e);
  };
  const emitPassword = () => {
    const toggleType = renderType.value === 'password' ? 'text' : 'password';
    renderType.value = toggleType;
  };

  const setInputElValue = (v: InputValue = '') => {
    const inputEl = inputRef.value as HTMLInputElement;
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
    emitEvent('change', val, { e });
    setInnerValue(val, { e } as { e: InputEvent });
    // 受控
    nextTick(() => setInputElValue(innerValue.value));
  };
  const handleInput = (e: InputEvent) => {
    const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
    if (e.isComposing || checkInputType) return;
    inputValueChangeHandle(e);
  };

  const formatAndEmitBlur = (e: FocusEvent) => {
    if (props.format) {
      inputValue.value = props.format(innerValue.value);
    }
    focused.value = false;
    emitEvent('blur', props.value, { e });
  };

  const compositionendHandler = (e: InputEvent) => {
    inputValueChangeHandle(e);
  };
  const onHandleCompositionend = (e: CompositionEvent) => {
    inputValueChangeHandle(e);
    emitEvent('compositionend', innerValue.value, { e });
  };
  const onHandleCompositionstart = (e: CompositionEvent) => {
    emitEvent('compositionstart', innerValue.value, { e });
  };

  const onRootClick = (e: MouseEvent) => {
    inputRef.value?.focus();
    emitEvent('click', e);
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

  return {
    isHover,
    focused,
    renderType,
    showClear,
    inputRef,
    inputValue,
    emitFocus,
    formatAndEmitBlur,
    onHandleCompositionend,
    onHandleCompositionstart,
    onRootClick,
    emitPassword,
    handleInput,
    emitClear,
    innerValue,
  };
}
