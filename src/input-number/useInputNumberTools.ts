import { Ref } from 'vue';
import { TdInputNumberProps } from './type';

export default function useInputNumberTools(props: TdInputNumberProps, digitsNum: Ref<number>, isError: Ref<boolean>) {
  const toDecimalPlaces = (value: number) => {
    const decimalPlaces = props.decimalPlaces === undefined ? digitsNum.value : props.decimalPlaces;
    const factor = 10 ** decimalPlaces;
    return Math.round(value * factor) / factor;
  };

  const multiNegative = (s: string) => {
    const m = s.match(/[-]/g);
    return m === null ? false : m.length > 2;
  };

  const multiDot = (s: string) => {
    const m = s.match(/[.]/g);
    return m === null ? false : m.length > 1;
  };

  const multiE = (s: string) => {
    const m = s.match(/[e]/gi);
    return m === null ? false : m.length > 1;
  };

  const empty = (v: string) => {
    return !v && !v.replace(' ', '');
  };

  const handleInputError = (visible: boolean) => (isError.value = visible);

  const isValidNumber = (v: number) => {
    if (v > props.max) {
      handleInputError(true);
      return false;
    }
    if (v < props.min) {
      handleInputError(true);
      return false;
    }
    handleInputError(false);
    return true;
  };

  const isValid = (v: string) => {
    const numV = Number(v);
    if (empty(v)) {
      return false;
    }
    if (Number.isNaN(numV)) {
      handleInputError(true);
      return false;
    }
    return isValidNumber(numV);
  };

  const toValidStringNumber = (s: string) => {
    let filterVal = s.replace(/[^\d.eE。-]/g, '').replace('。', '.');
    if (multiE(filterVal) || multiDot(filterVal) || multiNegative(filterVal)) {
      filterVal = filterVal.substring(0, filterVal.length - 1);
    }
    return filterVal;
  };

  const toValidNumber = (s: string) => {
    const val = Number(s);
    if (Number.isNaN(val) || Number.isNaN(parseFloat(s))) return props.value;
    if (val > props.max) return props.max;
    if (val < props.min) return props.min;
    return parseFloat(s);
  };

  return {
    toDecimalPlaces,
    multiNegative,
    multiDot,
    multiE,
    empty,
    isValidNumber,
    isValid,
    toValidStringNumber,
    toValidNumber,
    isError,
  };
}
