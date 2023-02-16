import { computed, Ref } from 'vue';
import { TdSliderProps } from '../type';
import InputNumber, { InputNumberProps } from '../../input-number';
import isBoolean from 'lodash/isBoolean';

const INPUT_NUMBER_PROPS_INITIAL_STATE: InputNumberProps = {
  decimalPlaces: 0,
  format: undefined as InputNumberProps['format'],
  placeholder: '',
  theme: 'column' as InputNumberProps['theme'],
};

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
    let initialState = { ...INPUT_NUMBER_PROPS_INITIAL_STATE };
    const inputProps = config.value;
    if (!isBoolean(inputProps.inputNumberProps)) {
      const inputTheme = inputProps.inputNumberProps?.theme;
      initialState = { ...initialState, ...inputProps.inputNumberProps };
      if (['column', 'row', 'normal'].includes(inputTheme)) {
        initialState.theme = inputTheme;
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
    // if exist min or max prop, onChange callback function will pass undefined value when decrease
    const normalizeChangeFn = (num: number | undefined) => {
      if (num !== undefined && !isNaN(num)) {
        changeFn(num);
      }
    };
    return (
      <InputNumber
        {...sliderInputState.value}
        class={sliderNumberClass.value}
        value={val}
        step={config.value.step}
        onChange={normalizeChangeFn}
        disabled={config.value.disabled}
        min={config.value.min}
        max={config.value.max}
      />
    );
  };

  return renderInputNumber;
};
