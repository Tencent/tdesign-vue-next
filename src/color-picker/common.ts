import { ref } from 'vue';
import { TdColorEvent } from './const';
import { TdColorContext } from './interfaces';

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
  const handleChange = (value: string, context: TdColorContext) => {
    color.value = value;
    emit('change', value, context);
  };
  const handlePaletteChange = (context: TdColorContext) => {
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
