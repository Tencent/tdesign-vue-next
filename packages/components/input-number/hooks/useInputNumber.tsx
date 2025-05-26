import { computed, ref, toRefs, watch } from 'vue';
import { useVModel, useReadonly, useDisabled, useCommonClassName } from '@tdesign/hooks';

import { InputNumberValue, TdInputNumberProps } from '../type';

// 计算逻辑，统一到 common 中，方便各框架复用（如超过 16 位的大数处理）
import {
  canAddNumber,
  canInputNumber,
  canReduceNumber,
  getMaxOrMinValidateResult,
  getStepValue,
  formatThousandths,
  canSetValue,
  formatUnCompleteNumber,
  largeNumberToFixed,
} from '@tdesign/common-js/input-number/number';

import { StrInputProps } from '../../input';

/**
 * 独立一个组件 Hook 方便用户直接使用相关逻辑 自定义任何样式的数字输入框
 */
export default function useInputNumber(props: TdInputNumberProps) {
  const { classPrefix, SIZE, STATUS } = useCommonClassName();
  const { value, modelValue, max, min } = toRefs(props);
  // 统一处理受控、非受控、语法糖 v-model 等
  const [tValue, setTValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
  const inputRef = ref();
  const userInput = ref('');

  const tDisabled = useDisabled();

  const isReadonly = useReadonly();

  const isError = ref<'exceed-maximum' | 'below-minimum'>();

  const disabledReduce = computed(
    () => tDisabled.value || !canReduceNumber(tValue.value, props.min, props.largeNumber),
  );

  const disabledAdd = computed(() => tDisabled.value || !canAddNumber(tValue.value, props.max, props.largeNumber));

  const wrapClasses = computed(() => [
    `${classPrefix.value}-input-number`,
    SIZE.value[props.size],
    {
      [STATUS.value.disabled]: tDisabled.value,
      [`${classPrefix.value}-is-controls-right`]: props.theme === 'column',
      [`${classPrefix.value}-input-number--${props.theme}`]: props.theme,
      [`${classPrefix.value}-input-number--auto-width`]: props.autoWidth,
    },
  ]);

  const reduceClasses = computed(() => [
    `${classPrefix.value}-input-number__decrease`,
    { [STATUS.value.disabled]: disabledReduce.value },
  ]);

  const addClasses = computed(() => [
    `${classPrefix.value}-input-number__increase`,
    { [STATUS.value.disabled]: disabledAdd.value },
  ]);

  const getUserInput = (value: InputNumberValue) => {
    if (!value && value !== 0) return '';
    let inputStr = value || value === 0 ? String(value) : '';
    if (!inputRef.value?.inputRef?.contains(document.activeElement)) {
      const num = formatUnCompleteNumber(inputStr, {
        decimalPlaces: props.decimalPlaces,
        largeNumber: props.largeNumber,
        isToFixed: true,
      });
      inputStr = num || num === 0 ? String(num) : '';
      if (props.format) {
        inputStr = String(props.format(value, { fixedNumber: inputStr }));
      }
    }
    return inputStr;
  };

  watch(
    tValue,
    (val) => {
      const { largeNumber, decimalPlaces } = props;
      const inputValue = [undefined, null].includes(val) ? '' : String(val);
      // userInput.value 为非合法数字，则表示用户正在输入，此时无需处理
      if (!largeNumber && !Number.isNaN(userInput.value)) {
        if (parseFloat(userInput.value) !== val) {
          userInput.value = getUserInput(inputValue);
        }
        const fixedNumber = Number(largeNumberToFixed(inputValue, decimalPlaces, largeNumber));
        if (
          decimalPlaces !== undefined &&
          ![undefined, null].includes(val) &&
          Number(fixedNumber) !== Number(tValue.value)
        ) {
          setTValue(fixedNumber, { type: 'props', e: undefined });
        }
      }
      if (largeNumber) {
        userInput.value = getUserInput(inputValue);

        if (decimalPlaces !== undefined && largeNumberToFixed(inputValue, decimalPlaces, largeNumber) !== val) {
          let completeValue = inputValue;
          if (!inputRef.value?.inputRef?.contains(document.activeElement)) {
            // isToFixed为true 只可能是string
            completeValue = formatUnCompleteNumber(completeValue, {
              decimalPlaces: props.decimalPlaces,
              largeNumber: props.largeNumber,
              isToFixed: true,
            }) as string;
          }
          setTValue(completeValue, { type: 'props', e: undefined });
        }
      }
    },
    { immediate: true },
  );

  watch(
    [tValue, max, min],
    () => {
      // @ts-ignore 没有输入完成，则无需校验
      if ([undefined, '', null].includes(tValue.value)) return;
      const { max, min, largeNumber } = props;
      const error = getMaxOrMinValidateResult({
        value: tValue.value,
        largeNumber,
        max,
        min,
      });
      isError.value = error;
      props.onValidate?.({ error });
    },
    { immediate: true },
  );

  const handleStepValue = (op: 'add' | 'reduce') => {
    const newValue = getStepValue({
      op,
      step: props.step,
      max: props.max,
      min: props.min,
      lastValue: tValue.value,
      largeNumber: props.largeNumber,
    });
    const { largeNumber, max, min } = props;
    const overLimit = getMaxOrMinValidateResult({
      value: newValue,
      largeNumber,
      max,
      min,
    });
    return {
      overLimit,
      newValue,
    };
  };

  const handleReduce = (e: KeyboardEvent | MouseEvent) => {
    if (disabledReduce.value || isReadonly.value) return;
    const r = handleStepValue('reduce');
    if (r.overLimit && !props.allowInputOverLimit) return;
    setTValue(r.newValue, { type: 'reduce', e });
  };

  const handleAdd = (e: KeyboardEvent | MouseEvent) => {
    if (disabledAdd.value || isReadonly.value) return;
    const r = handleStepValue('add');
    if (r.overLimit && !props.allowInputOverLimit) return;
    setTValue(r.newValue, { type: 'add', e });
  };

  const onInnerInputChange: StrInputProps['onChange'] = (inputValue, { e }) => {
    // 千分位处理
    const val = formatThousandths(inputValue);
    if (!canInputNumber(val, props.largeNumber)) return;

    userInput.value = val;

    if (props.largeNumber) {
      setTValue(val, { type: 'input', e });
      return;
    }

    if (canSetValue(String(val), Number(tValue.value))) {
      const newVal = val === '' ? undefined : Number(val);
      setTValue(newVal, { type: 'input', e });
    }
  };

  const handleBlur = (value: string, ctx: { e: FocusEvent }) => {
    const { largeNumber, max, min, decimalPlaces } = props;
    if (!props.allowInputOverLimit && tValue.value !== undefined) {
      const r = getMaxOrMinValidateResult({ value: tValue.value, largeNumber, max, min });
      if (r === 'below-minimum') {
        setTValue(min, { type: 'blur', e: ctx.e });
        props.onBlur?.(min, ctx);
        return;
      }
      if (r === 'exceed-maximum') {
        setTValue(max, { type: 'blur', e: ctx.e });
        props.onBlur?.(max, ctx);
        return;
      }
    }
    const newValue = formatUnCompleteNumber(value, {
      decimalPlaces,
      largeNumber,
    });
    userInput.value = getUserInput(newValue);

    if (newValue !== tValue.value) {
      setTValue(newValue, { type: 'blur', e: ctx.e });
    }
    props.onBlur?.(newValue, ctx);
  };

  const handleFocus = (value: string, ctx: { e: FocusEvent }) => {
    userInput.value = tValue.value || tValue.value === 0 ? String(tValue.value) : '';
    props.onFocus?.(value, ctx);
  };

  const handleKeydown = (value: string, ctx: { e: KeyboardEvent }) => {
    if (tDisabled.value) return;
    const { e } = ctx;
    const keyEvent = {
      ArrowUp: handleAdd,
      ArrowDown: handleReduce,
    };
    const code = (e.code || e.key) as keyof typeof keyEvent;
    if (keyEvent[code] !== undefined) {
      keyEvent[code](e);
    }
    props.onKeydown?.(value, ctx);
  };

  const handleKeyup = (value: string, ctx: { e: KeyboardEvent }) => {
    props.onKeyup?.(value, ctx);
  };

  const handleKeypress = (value: string, ctx: { e: KeyboardEvent }) => {
    props.onKeypress?.(value, ctx);
  };

  const handleEnter = (value: string, ctx: { e: KeyboardEvent }) => {
    userInput.value = getUserInput(value);
    const newValue = formatUnCompleteNumber(value, {
      decimalPlaces: props.decimalPlaces,
      largeNumber: props.largeNumber,
    });
    if (newValue !== value && String(newValue) !== value) {
      setTValue(newValue, { type: 'enter', e: ctx.e });
    }
    props.onEnter?.(newValue, ctx);
  };

  const focus = () => {
    if (tDisabled.value || isReadonly.value) return;
    (inputRef.value as any).focus();
  };

  const blur = () => {
    (inputRef.value as any).blur();
  };

  const listeners = {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeydown: handleKeydown,
    onKeyup: handleKeyup,
    onKeypress: handleKeypress,
    onEnter: handleEnter,
    onClick: focus,
  };

  return {
    classPrefix,
    wrapClasses,
    reduceClasses,
    addClasses,
    tDisabled,
    isError,
    listeners,
    userInput,
    tValue,
    inputRef,
    focus,
    blur,
    handleReduce,
    handleAdd,
    onInnerInputChange,
    isReadonly,
  };
}
