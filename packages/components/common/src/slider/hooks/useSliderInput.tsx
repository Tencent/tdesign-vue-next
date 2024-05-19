import { computed, Ref } from '@td/adapter-vue';
import { omit } from 'lodash-es';
import { TdSliderProps } from '../type';
import InputNumber, { InputNumberProps, ChangeContext } from '../../input-number';
import { isBoolean } from 'lodash-es';

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
    let initialState: InputNumberProps = {
      format: undefined,
      placeholder: '',
      theme: 'column',
      decimalPlaces: config.value.step.toString().split('.')[1]?.length || 0,
    };
    const inputProps = config.value;
    if (!isBoolean(inputProps.inputNumberProps)) {
      const inputTheme = inputProps.inputNumberProps?.theme;
      initialState = { ...initialState, ...omit(inputProps.inputNumberProps, 'onChange') };
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
    const normalizeChangeFn = (num: number | undefined, context: ChangeContext) => {
      if (num !== undefined && !isNaN(num)) {
        changeFn(num);
      }
      (config.value?.inputNumberProps as InputNumberProps)?.onChange?.(num, context);
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
