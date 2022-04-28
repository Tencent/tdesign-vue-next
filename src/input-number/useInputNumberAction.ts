import { computed, Ref, ref, toRefs } from 'vue';
import { ChangeSource, TdInputNumberProps } from './type';
import useVModel from '../hooks/useVModel';
import { useCommonClassName } from '../hooks/useConfig';
import useInputNumberTools from './useInputNumberTools';

type ChangeContextEvent = InputEvent | MouseEvent | FocusEvent;

export default function useInputNumberAction(
  COMPONENT_NAME: Ref<string>,
  props: TdInputNumberProps,
  isError: Ref<boolean>,
) {
  const { STATUS } = useCommonClassName();
  const filterValue = ref(null);
  const userInput = ref(null);
  const { value, modelValue } = toRefs(props);
  const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

  const disabledReduce = computed(
    () => props.disabled || isError.value || Number(innerValue.value) - props.step < props.min,
  );
  const disabledAdd = computed(
    () => props.disabled || isError.value || Number(innerValue.value) + props.step > props.max,
  );

  const reduceClasses = computed(() => [
    `${COMPONENT_NAME.value}__decrease`,
    {
      [STATUS.value.disabled]: disabledReduce.value,
    },
  ]);

  const addClasses = computed(() => [
    `${COMPONENT_NAME.value}__increase`,
    {
      [STATUS.value.disabled]: disabledAdd.value,
    },
  ]);

  const stepDecimalPlaces = computed(() => {
    const tempVal = String(props.step);
    const tempIndex = tempVal.indexOf('.') + 1;
    return tempIndex > 0 ? tempVal.length - tempIndex : 0;
  });

  const valueDecimalPlaces = computed(() => {
    const tempVal =
      filterValue.value !== null &&
      !Number.isNaN(Number(filterValue.value)) &&
      !Number.isNaN(parseFloat(filterValue.value))
        ? filterValue.value
        : String(innerValue.value);
    const tempIndex = tempVal.indexOf('.') + 1;
    return tempIndex > 0 ? tempVal.length - tempIndex : 0;
  });

  const digitsNum = computed(() => {
    if (props.decimalPlaces !== undefined) {
      if (props.decimalPlaces < stepDecimalPlaces.value) {
        console.warn('decimal places of step should be less than decimal-places');
      }
      return props.decimalPlaces;
    }
    return valueDecimalPlaces.value > stepDecimalPlaces.value ? valueDecimalPlaces.value : stepDecimalPlaces.value;
  });

  const clearInput = () => (userInput.value = '');

  const handleChange = (value: number, ctx: { type: ChangeSource; e: ChangeContextEvent }) => {
    if (value !== undefined) {
      const v = Number(value.toFixed(digitsNum.value));
      setInnerValue(v, { type: ctx.type, e: ctx.e });
    }
  };

  const handleAction = (value: number, actionType: ChangeSource, e: ChangeContextEvent) => {
    if (actionType !== 'input') {
      clearInput();
    }
    handleChange(value, { type: actionType, e });
  };

  const toDecimalPlaces = (value: number) => {
    const decimalPlaces = props.decimalPlaces === undefined ? digitsNum.value : props.decimalPlaces;
    const factor = 10 ** decimalPlaces;
    return Math.round(value * factor) / factor;
  };

  const clearFilterValue = () => (filterValue.value = '');

  const handleAdd = (e: MouseEvent) => {
    if (disabledAdd.value || props.readonly) return;
    const value = innerValue.value || 0;
    const factor = 10 ** digitsNum.value;
    handleAction(
      Number(toDecimalPlaces((value * factor + props.step * factor) / factor).toFixed(digitsNum.value)),
      'add',
      e,
    );
  };

  const handleReduce = (e: MouseEvent) => {
    if (disabledReduce.value || props.readonly) return;
    const value = innerValue.value || 0;
    const factor = 10 ** digitsNum.value;
    handleAction(
      Number(toDecimalPlaces((value * factor - props.step * factor) / factor).toFixed(digitsNum.value)),
      'reduce',
      e,
    );
  };

  const inputNumberTools = useInputNumberTools(props, digitsNum, isError);

  const handleInput = (val: string, e: InputEvent) => {
    userInput.value = val;
    filterValue.value = inputNumberTools.toValidStringNumber(userInput.value);
    userInput.value = '';
    if (!inputNumberTools.isValid(filterValue.value) || Number(filterValue.value) === innerValue.value) return;
    handleAction(Number(filterValue.value), 'input', e);
  };

  return {
    reduceClasses,
    addClasses,
    clearFilterValue,
    handleAdd,
    handleReduce,
    digitsNum,
    filterValue,
    innerValue,
    handleAction,
    userInput,
    handleInput,
  };
}
