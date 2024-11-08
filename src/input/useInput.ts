import { ref, computed, watch, nextTick, toRefs, inject } from 'vue';
import { InputValue, TdInputProps } from './type';
import { FormItemInjectionKey } from '../form/const';
import useVModel from '../hooks/useVModel';
import { useDisabled } from '../hooks/useDisabled';
import useLengthLimit from './useLengthLimit';

export function getOutputValue(val: InputValue, type: TdInputProps['type']) {
  if (type === 'number') {
    return val || val === 0 ? Number(val) : undefined;
  }
  return val;
}

export interface ExtendsTdInputProps extends TdInputProps {
  showInput: boolean;
  keepWrapperWidth: boolean;
}

export default function useInput(props: ExtendsTdInputProps, expose: (exposed: Record<string, any>) => void) {
  const { value, modelValue } = toRefs(props);
  const inputValue = ref<InputValue>();
  const isComposition = ref(false);
  const compositionValue = ref<InputValue>();
  const clearIconRef = ref(null);
  const innerClickElement = ref();
  const disabled = useDisabled();
  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

  const isHover = ref(false);
  const focused = ref(false);
  const renderType = ref(props.type);
  const inputRef = ref<HTMLInputElement>(null);

  const limitParams = computed(() => ({
    value: [undefined, null].includes(innerValue.value) ? undefined : String(innerValue.value),
    status: props.status,
    maxlength: Number(props.maxlength),
    maxcharacter: props.maxcharacter,
    allowInputOverMax: props.allowInputOverMax,
    onValidate: props.onValidate,
  }));
  const { limitNumber, getValueByLimitNumber, tStatus } = useLengthLimit(limitParams);

  const showClear = computed(() => {
    return (
      ((innerValue.value && !disabled.value && props.clearable && !props.readonly) || props.showClearIconOnEmpty) &&
      isHover.value
    );
  });

  const focus = () => {
    focused.value = true;
    inputRef.value?.focus();
  };

  const blur = () => {
    focused.value = false;
    inputRef.value?.blur();
  };

  const emitFocus = (e: FocusEvent) => {
    if (isHover.value && focused.value) return;
    inputValue.value = innerValue.value;
    if (props.disabled) return;
    focused.value = true;
    props.onFocus?.(innerValue.value, { e });
  };

  const emitClear = ({ e }: { e: MouseEvent }) => {
    const val = props.type === 'number' ? undefined : '';
    setInnerValue(val, { e, trigger: 'clear' });
    props.onClear?.({ e });
  };

  const onClearIconMousedown = (e: MouseEvent) => {
    innerClickElement.value = e.target;
  };

  const emitPassword = () => {
    if (disabled.value) return;
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
    // over length: allow delete; not add
    if (props.type !== 'number' && typeof innerValue.value === 'string' && val.length > innerValue.value?.length) {
      val = getValueByLimitNumber(val);
    }
    setInnerValue(getOutputValue(val, props.type), { e, trigger: 'input' });
    // 受控
    nextTick(() => {
      // type = 'number'时, 解决小数点后面有 0 自动删除的问题
      if (props.type === 'number' && /\.(\d+)?0$/.test(val)) {
        setInputElValue(val);
      } else {
        setInputElValue(innerValue.value);
      }
    });
  };

  const handleInput = (e: InputEvent) => {
    const checkInputType = e.inputType && e.inputType === 'insertCompositionText';
    const {
      currentTarget: { value: val },
    }: any = e;
    if (checkInputType || isComposition.value) {
      compositionValue.value = val;
      return;
    }
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
    if (!isClearIcon()) {
      if (props.format) {
        inputValue.value =
          typeof innerValue.value === 'number' || props.type === 'number'
            ? innerValue.value
            : props.format(innerValue.value);
      }
      focused.value = false;
      props.onBlur?.(innerValue.value, { e });
      formItem?.handleBlur();
    } else {
      focus();
    }
  };

  const onHandleCompositionend = (e: CompositionEvent) => {
    isComposition.value = false;
    compositionValue.value = '';
    inputValueChangeHandle(e);
    props.onCompositionend?.(String(innerValue.value), { e });
  };

  const onHandleCompositionstart = (e: CompositionEvent) => {
    isComposition.value = true;
    const {
      currentTarget: { value },
    }: any = e;
    compositionValue.value = value;
    props.onCompositionstart?.(String(innerValue.value), { e });
  };

  const onRootClick = (e: MouseEvent) => {
    inputRef.value?.focus();
    props.onClick?.({ e });
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
    (val, oldVal) => {
      const isNumberType = props.type === 'number';
      // 初始化时，如果有 format 函数，需要对 value 进行格式化
      if (oldVal === undefined && props.format && typeof val !== 'number' && !isNumberType) {
        inputValue.value = props.format(val);
      } else {
        inputValue.value = val;
      }
      // limit props value
      const newVal = typeof val === 'number' ? val : getValueByLimitNumber(val);
      if (newVal !== val && !isNumberType) {
        setInnerValue(newVal, { trigger: 'initial' });
      }
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
    isComposition,
    compositionValue,
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
  };
}
