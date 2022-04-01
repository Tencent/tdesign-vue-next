import { computed, reactive, ComputedRef } from 'vue';
import InputNumber, { InputNumberProps } from '../../input-number/index';

export const useSliderInput = (
  max: number,
  min: number,
  step: number,
  prefixName: string,
  isVertical: boolean,
  disabled: ComputedRef<boolean>,
) => {
  const name = prefixName;

  const sliderInputState = reactive({
    inputDecimalPlaces: 0,
    inputFormat: null,
    inputPlaceholder: '',
    inputTheme: 'column' as InputNumberProps['theme'],
  });

  const sliderNumberClass = computed(() => {
    return [
      `${name}__input`,
      {
        'is-vertical': isVertical,
      },
    ];
  });

  const renderInputNumber = (val: number | number[], changeFn: (val: number) => void) => {
    return (
      <InputNumber
        class={sliderNumberClass.value}
        value={val}
        step={step}
        onChange={changeFn}
        disabled={disabled.value}
        min={min}
        max={max}
        decimalPlaces={sliderInputState.inputDecimalPlaces}
        format={sliderInputState.inputFormat}
        placeholder={sliderInputState.inputPlaceholder}
        theme={sliderInputState.inputTheme}
      />
    );
  };

  return renderInputNumber;
};
