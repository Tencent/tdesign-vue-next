import { computed, Ref } from 'vue';
import { TdSliderProps } from '../type';
import InputNumber, { InputNumberProps } from '../../input-number';

interface useSliderInputProps {
  inputNumberProps: boolean | TdSliderProps['inputNumberProps'];
  max: number;
  min: number;
  step: number;
  prefixName: string;
  vertical: boolean;
  disabled: boolean;
}

/**
 * 聚合管理inputNumber渲染逻辑
 */
export const useSliderInput = (config: Ref<useSliderInputProps>) => {
  const name = config.value.prefixName;

  /** 根据传入属性缓存计算inputNumber props */
  const sliderInputState = computed(() => {
    const initialState = {
      inputDecimalPlaces: 0,
      inputFormat: null as InputNumberProps['format'],
      inputPlaceholder: '',
      inputTheme: 'column' as InputNumberProps['theme'],
    };
    const inputProps = config.value;
    if (typeof inputProps.inputNumberProps !== 'boolean') {
      const inputNumbeConfig = inputProps.inputNumberProps as TdSliderProps['inputNumberProps'];
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
        'is-vertical': config.value.vertical,
      },
    ];
  });

  const renderInputNumber = (val: number, changeFn: (val: number) => void) => {
    return (
      <InputNumber
        class={sliderNumberClass.value}
        value={val}
        step={config.value.step}
        onChange={changeFn}
        disabled={config.value.disabled}
        min={config.value.min}
        max={config.value.max}
        decimalPlaces={sliderInputState.value.inputDecimalPlaces}
        format={sliderInputState.value.inputFormat}
        placeholder={sliderInputState.value.inputPlaceholder}
        theme={sliderInputState.value.inputTheme}
      />
    );
  };

  return renderInputNumber;
};
