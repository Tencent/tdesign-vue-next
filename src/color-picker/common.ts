import { ref } from 'vue';
import { ColorContext, TdColorEvent } from './const';

type Emit = (event: TdColorEvent, ...args: any[]) => void;

/**
 * picker 和 panel 模式共用
 * 提供变更给组件调用者
 * @param value
 * @param emit
 * @returns
 */
export const useColorPicker = (value: string, emit: Emit) => {
  const color = ref(value);
  const handleChange = (value: string, context: ColorContext) => {
    color.value = value;
    emit('change', value, context);
  };
  const handlePaletteChange = (context: ColorContext) => {
    emit('palette-bar-change', context);
  };
  const updateColor = (value: string) => (color.value = value);

  return {
    color,
    updateColor,
    handleChange,
    handlePaletteChange,
  };
};
