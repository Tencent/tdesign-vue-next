import { computed, onMounted, ref, toRefs, watch } from 'vue';
import useCommonClassName from '../hooks/useCommonClassName';
import useVModel from '../hooks/useVModel';
import { InputNumberValue, TdInputNumberProps } from './type';
// 计算逻辑，统一到 common 中，方便各框架复用（如超过 16 位的大数处理）
import {
  canAddNumber,
  canInputNumber,
  canReduceNumber,
  formatToNumber,
  getMaxOrMinValidateResult,
  getStepValue,
} from '../_common/js/input-number/number';
import { useFormDisabled } from '../form/hooks';

/**
 * 独立一个组件 Hook 方便用户直接使用相关逻辑 自定义任何样式的数字输入框
 */
export default function useInputNumber(props: TdInputNumberProps) {
  const { classPrefix, sizeClassNames, statusClassNames } = useCommonClassName();
  const { value, modelValue, max, min } = toRefs(props);
  // 统一处理受控、非受控、语法糖 v-model 等
  const [tValue, setTValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
  const inputRef = ref();
  const userInput = ref('');

  const tDisabled = useFormDisabled();

  const isError = ref<'exceed-maximum' | 'below-minimum'>();

  const disabledReduce = computed(
    () => tDisabled.value || !canReduceNumber(tValue.value, props.min, props.largeNumber),
  );

  const disabledAdd = computed(() => tDisabled.value || !canAddNumber(tValue.value, props.max, props.largeNumber));

  const wrapClasses = computed(() => [
    `${classPrefix.value}-input-number`,
    sizeClassNames[props.size],
    {
      [statusClassNames.disabled]: tDisabled.value,
      [`${classPrefix.value}-is-controls-right`]: props.theme === 'column',
      [`${classPrefix.value}-input-number--${props.theme}`]: props.theme,
      [`${classPrefix.value}-input-number--auto-width`]: props.autoWidth,
    },
  ]);

  const reduceClasses = computed(() => [
    `${classPrefix.value}-input-number__decrease`,
    { [statusClassNames.disabled]: disabledReduce.value },
  ]);

  const addClasses = computed(() => [
    `${classPrefix.value}-input-number__increase`,
    { [statusClassNames.disabled]: disabledAdd.value },
  ]);

  const getUserInput = (value: InputNumberValue) => {
    if (!value && value !== 0) return '';
    let inputStr = value || value === 0 ? String(value) : '';
    if (!inputRef.value?.inputRef?.contains(document.activeElement)) {
      const num = formatToNumber(inputStr, {
        decimalPlaces: props.decimalPlaces,
        largeNumber: props.largeNumber,
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
      const inputValue = [undefined, null].includes(val) ? '' : String(val);
      userInput.value = getUserInput(inputValue);
    },
    { immediate: true },
  );

  onMounted(() => {
    userInput.value = getUserInput(tValue.value);
  });

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

  const handleStepValue = (op: 'add' | 'reduce') =>
    getStepValue({
      op,
      step: props.step,
      max: props.max,
      min: props.min,
      lastValue: tValue.value,
      largeNumber: props.largeNumber,
    });

  const handleReduce = (e: KeyboardEvent | MouseEvent) => {
    if (disabledReduce.value || props.readonly) return;
    const newValue = handleStepValue('reduce');
    setTValue(newValue, { type: 'reduce', e });
  };

  const handleAdd = (e: KeyboardEvent | MouseEvent) => {
    if (disabledAdd.value || props.readonly) return;
    const newValue = handleStepValue('add');
    setTValue(newValue, { type: 'add', e });
  };

  const onInnerInputChange = (val: string, ctx: { e: InputEvent }) => {
    if (!canInputNumber(val, props.largeNumber)) return;
    if (props.largeNumber) {
      setTValue(val, { type: 'input', e: ctx.e });
      return;
    }
    // 普通数-数字。此处是为了将 2e3，2.1e3 等内容转换为数字
    const isNumberCode = ['-', '.', 'e', 'E'].includes(val.slice(-1));
    const smallNumber = val === '' ? undefined : Number(val);
    const newVal = isNumberCode ? val : smallNumber;
    if (!isNaN(Number(newVal)) || !newVal || !isNumberCode) {
      setTValue(newVal, { type: 'input', e: ctx.e });
      userInput.value = String(newVal);
    } else {
      userInput.value = val;
    }
  };

  const handleBlur = (value: string, ctx: { e: FocusEvent }) => {
    const { largeNumber, max, min, decimalPlaces } = props;
    if (!props.allowInputOverLimit) {
      const r = getMaxOrMinValidateResult({ value: tValue.value, largeNumber, max, min });
      if (r === 'below-minimum') {
        setTValue(min, { type: 'blur', e: ctx.e });
      } else if (r === 'exceed-maximum') {
        setTValue(max, { type: 'blur', e: ctx.e });
      }
      return;
    }
    userInput.value = getUserInput(tValue.value);
    const newValue = formatToNumber(value, {
      decimalPlaces,
      largeNumber,
    });
    if (newValue !== value && String(newValue) !== value) {
      setTValue(newValue, { type: 'blur', e: ctx.e });
    }
    props.onBlur?.(newValue, ctx);
  };

  const handleFocus = (value: string, ctx: { e: FocusEvent }) => {
    userInput.value = tValue.value || tValue.value === 0 ? String(tValue.value) : '';
    props.onFocus?.(value, ctx);
  };

  const handleKeydown = (value: string, ctx: { e: KeyboardEvent }) => {
    const { e } = ctx;
    const keyEvent = {
      ArrowUp: handleAdd,
      ArrowDown: handleReduce,
    };
    const code = e.code || e.key;
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
    const newValue = formatToNumber(value, {
      decimalPlaces: props.decimalPlaces,
      largeNumber: props.largeNumber,
    });
    if (newValue !== value && String(newValue) !== value) {
      setTValue(newValue, { type: 'enter', e: ctx.e });
    }
    props.onEnter?.(newValue, ctx);
  };

  const focus = () => {
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
  };
}
