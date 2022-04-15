import { computed, Ref, ref, toRefs } from 'vue';
import useInputAction from './useInputAction';
import CLASSNAMES from '../utils/classnames';
import { TdInputNumberProps } from './type';

export default function useInputNumberStep(
  COMPONENT_NAME: Ref<string>,
  props: TdInputNumberProps,
  isError: Ref<boolean>,
) {
  const filterValue = ref(null);

  const disabledReduce = computed(
    () => props.disabled || isError.value || Number(props.value) - props.step < props.min,
  );
  const disabledAdd = computed(() => props.disabled || isError.value || Number(props.value) + props.step > props.max);

  const reduceClasses = computed(() => [
    `${COMPONENT_NAME.value}__decrease`,
    {
      [CLASSNAMES.STATUS.disabled]: disabledReduce.value,
    },
  ]);

  const addClasses = computed(() => [
    `${COMPONENT_NAME.value}__increase`,
    {
      [CLASSNAMES.STATUS.disabled]: disabledAdd.value,
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
        : String(props.value);
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

  const toDecimalPlaces = (value: number) => {
    const decimalPlaces = props.decimalPlaces === undefined ? digitsNum.value : props.decimalPlaces;
    const factor = 10 ** decimalPlaces;
    return Math.round(value * factor) / factor;
  };

  const clearFilterValue = () => (filterValue.value = '');

  const { handleAction } = useInputAction(props, digitsNum);

  const handleAdd = (e: MouseEvent) => {
    if (disabledAdd.value || props.readonly) return;
    const value = props.value || 0;
    const factor = 10 ** digitsNum.value;
    handleAction(
      Number(toDecimalPlaces((value * factor + props.step * factor) / factor).toFixed(digitsNum.value)),
      'add',
      e,
    );
  };

  const handleReduce = (e: MouseEvent) => {
    if (disabledReduce.value || props.readonly) return;
    const value = props.value || 0;
    const factor = 10 ** digitsNum.value;
    handleAction(
      Number(toDecimalPlaces((value * factor - props.step * factor) / factor).toFixed(digitsNum.value)),
      'reduce',
      e,
    );
  };

  return {
    reduceClasses,
    addClasses,
    clearFilterValue,
    handleAdd,
    handleReduce,
    digitsNum,
    filterValue,
  };
}
