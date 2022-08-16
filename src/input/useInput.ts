import { ref, computed, watch, nextTick, toRefs, inject, onBeforeMount } from 'vue';
import { getCharacterLength } from '../utils/helper';
import { InputValue } from './type';
import { ExtendsTdInputProps } from './input';
import { FormItemInjectionKey } from '../form/const';

import useVModel from '../hooks/useVModel';
import { useFormDisabled } from '../form/hooks';

export default function useInput(props: ExtendsTdInputProps, expose: (exposed: Record<string, any>) => void) {
  const { value, modelValue } = toRefs(props);
  const inputValue = ref<InputValue>();
  const clearIconRef = ref(null);
  const innerClickElement = ref();
  const disabled = useFormDisabled();
  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

  const isHover = ref(false);
  const focused = ref(false);
  const renderType = ref(props.type);
  const inputRef = ref<HTMLInputElement>(null);
  const inputPreRef = ref(null);
  // 字数限制统计
  const limitNumber = ref('');

  const innerStatus = computed(() => {
    if (limitNumber.value) {
      const [current, total] = limitNumber.value.split('/');
      return Number(current) > Number(total) ? 'error' : '';
    }
    return '';
  });

  const tStatus = computed(() => {
    if (props.status) return props.status;
    return innerStatus.value;
  });

  const showClear = computed(() => {
    return (
      ((innerValue.value && !disabled.value && props.clearable && !props.readonly) || props.showClearIconOnEmpty) &&
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
    setInnerValue('', { e });
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
    if (props.maxcharacter && props.maxcharacter > 0) {
      const stringInfo = getCharacterLength(val, props.maxcharacter);
      if (typeof stringInfo === 'object') {
        if (!props.allowInputOverMax) {
          val = stringInfo.characters;
        }
        limitNumber.value = `${stringInfo.length}/${props.maxcharacter}`;
      }
    }
    if (props.maxlength && props.maxlength > 0) {
      if (!props.allowInputOverMax) {
        val = val.substring(0, props.maxlength);
      }
      limitNumber.value = `${val.length}/${props.maxlength}`;
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
    // 点击清空按钮的时候，不应该触发 onBlur 事件。这个规则在表格单元格编辑中有很重要的应用
    if (!isClearIcon() && props.allowTriggerBlur) {
      props.onBlur?.(innerValue.value, { e });
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

  watch(
    () => props.type,
    (v) => {
      renderType.value = v;
    },
    { immediate: true },
  );

  watch(innerStatus, () => {
    props.onValidate?.({ error: innerStatus.value ? 'exceed-maximum' : undefined });
  });

  const updateLimitNumber = () => {
    if (props.maxcharacter && props.maxcharacter > 0) {
      const len = getCharacterLength(String(innerValue.value));
      limitNumber.value = `${len}/${props.maxcharacter}`;
    }
    if (props.maxlength && props.maxlength > 0) {
      limitNumber.value = `${String(innerValue.value).length}/${props.maxlength}`;
    }
  };

  onBeforeMount(() => {
    updateLimitNumber();
  });

  expose({
    inputRef,
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
    limitNumber,
    tStatus,
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
