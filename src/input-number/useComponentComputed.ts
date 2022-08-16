import { computed, Ref, ref, watch } from 'vue';
import { useCommonClassName, usePrefixClass } from '../hooks/useConfig';
import { useFormDisabled } from '../form/hooks';
import { TdInputNumberProps } from './type';
import { InputValue } from '../input';
import useInputNumberAction from './useInputNumberAction';
import useInputNumberTools from './useInputNumberTools';
import useKeyboardEvents from './useKeyboardEvents';

type InputNumberAttr = {
  disabled?: boolean;
  readonly?: any;
  autocomplete?: string;
  ref: string;
  placeholder: string;
  unselectable?: string;
  tips: TdInputNumberProps['tips'];
  autoWidth: boolean;
  align: TdInputNumberProps['align'];
  status: TdInputNumberProps['status'];
};

export default function useComponentComputed(COMPONENT_NAME: Ref<string>, props: TdInputNumberProps) {
  const disabled = useFormDisabled();
  const { SIZE, STATUS } = useCommonClassName();
  const classPrefix = usePrefixClass();

  const isError = ref(false);
  const inputting = ref(false);
  const filterValue = ref(null);

  const {
    digitsNum,
    innerValue,
    handleAction,
    clearFilterValue,
    handleReduce,
    handleAdd,
    userInput,
    addClasses,
    reduceClasses,
    handleInput,
  } = useInputNumberAction(COMPONENT_NAME, props, isError, filterValue);
  const inputNumberTools = useInputNumberTools(props, digitsNum, isError);
  const keyboardEvents = useKeyboardEvents(props, innerValue);

  const handleStartInput = () => {
    inputting.value = true;
    if (innerValue.value === undefined) return;
    filterValue.value = Number(innerValue.value).toFixed(digitsNum.value);
  };

  const handleEndInput = (e: FocusEvent) => {
    if (props.readonly) return;
    inputting.value = false;
    const value = inputNumberTools.toValidNumber(filterValue.value);
    if (value !== innerValue.value) {
      handleAction(value, 'input', e);
    }
    isError.value = false;
  };

  const handleBlur = async (e: FocusEvent) => {
    await handleEndInput(e);
    clearFilterValue();
    props.onBlur?.(innerValue.value, { e });
  };

  const handleEnter = (e: KeyboardEvent) => {
    props.onEnter?.(innerValue.value, { e });
  };

  const handleFocus = (e: FocusEvent) => {
    handleStartInput();
    props.onFocus?.(innerValue.value, { e });
  };

  const reduceEvents = computed(() => ({
    onClick: handleReduce,
  }));

  const addEvents = computed(() => ({
    onClick: handleAdd,
  }));

  const componentWrapClasses = computed(() => [
    COMPONENT_NAME.value,
    SIZE.value[props.size],
    {
      [STATUS.value.disabled]: disabled.value,
      [`${classPrefix.value}-is-controls-right`]: props.theme === 'column',
      [`${COMPONENT_NAME.value}--${props.theme}`]: props.theme,
      [`${COMPONENT_NAME.value}--auto-width`]: props.autoWidth,
    },
  ]);

  const inputEvents = computed(() => ({
    onBlur: (inputValue: InputValue, { e }: { e: FocusEvent }) => {
      handleBlur(e);
    },
    onFocus: (inputValue: InputValue, { e }: { e: FocusEvent }) => {
      handleFocus(e);
    },
    onKeydown: (inputValue: InputValue, { e }: { e: KeyboardEvent }) => {
      keyboardEvents.handleKeydown(e);
    },
    onKeyup: (inputValue: InputValue, { e }: { e: KeyboardEvent }) => {
      keyboardEvents.handleKeyup(e);
    },
    onKeypress: (inputValue: InputValue, { e }: { e: KeyboardEvent }) => {
      keyboardEvents.handleKeypress(e);
    },
    onEnter: (inputValue: InputValue, { e }: { e: KeyboardEvent }) => {
      handleEnter(e);
    },
  }));

  const inputAttrs = computed<InputNumberAttr>(() => ({
    disabled: disabled.value,
    readonly: props.readonly,
    autocomplete: 'off',
    ref: 'refInputElem',
    placeholder: props.placeholder,
    unselectable: props.readonly ? 'on' : 'off',
    tips: props.tips,
    autoWidth: props.autoWidth,
    align: props.align || (props.theme === 'row' ? 'center' : undefined),
    status: isError.value ? 'error' : props.status,
  }));

  const displayValue = computed(() => {
    if (inputting.value && userInput.value !== null) {
      return filterValue.value;
    }
    if ([undefined, null].includes(innerValue.value)) return '';
    // end input
    return props.format && !inputting.value
      ? props.format(innerValue.value)
      : Number(innerValue.value).toFixed(digitsNum.value);
  });

  watch(
    innerValue,
    (v) => {
      if (v !== undefined && typeof v === 'number') {
        inputNumberTools.isValidNumber(v);
      }
    },
    { immediate: true },
  );

  return {
    reduceEvents,
    addEvents,
    componentWrapClasses,
    inputEvents,
    inputAttrs,
    displayValue,
    addClasses,
    reduceClasses,
    handleInput,
  };
}
