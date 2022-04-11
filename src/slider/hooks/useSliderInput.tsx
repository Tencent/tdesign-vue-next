import { computed, reactive, ComputedRef, watch } from 'vue';
import { TdSliderProps } from '..';
import InputNumber, { InputNumberProps } from '../../input-number/index';

/**
 * 聚合管理inputNumber渲染逻辑
 */
export const useSliderInput = (
  inputNumberProps: boolean | TdSliderProps['inputNumberProps'],
  max: number,
  min: number,
  step: number,
  prefixName: string,
  isVertical: boolean,
  disabled: ComputedRef<boolean>,
) => {
  const name = prefixName;

  /** 根据传入属性缓存计算inputNumber props */
  const sliderInputState = computed(() => {
    const initialState = {
      inputDecimalPlaces: 0,
      inputFormat: null as InputNumberProps['format'],
      inputPlaceholder: '',
      inputTheme: 'column' as InputNumberProps['theme'],
    };
    if (typeof inputNumberProps !== 'boolean') {
      const inputNumbeConfig = inputNumberProps as TdSliderProps['inputNumberProps'];
      const inputDecimalPlaces = inputNumbeConfig.decimalPlaces;
      const inputFormat = inputNumbeConfig.format;
      const inputPlaceholder = inputNumbeConfig.placeholder;
      const inputTheme = inputNumbeConfig.theme;
      if (typeof inputDecimalPlaces === 'number' && !Number.isNaN(inputDecimalPlaces)) {
        initialState.inputDecimalPlaces = inputDecimalPlaces;
      }
      if (inputPlaceholder) {
        initialState.inputPlaceholder = inputPlaceholder;
      }
      if (typeof inputFormat === 'function') {
        initialState.inputFormat = inputFormat;
      }
      if (['column', 'row', 'normal'].includes(inputTheme)) {
        initialState.inputTheme = inputTheme;
      }
    }
    return initialState;
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
        decimalPlaces={sliderInputState.value.inputDecimalPlaces}
        format={sliderInputState.value.inputFormat}
        placeholder={sliderInputState.value.inputPlaceholder}
        theme={sliderInputState.value.inputTheme}
      />
    );
  };

  return renderInputNumber;
};
