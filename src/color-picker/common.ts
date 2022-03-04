import { ref } from 'vue';
import { ColorObject, ColorPickerChangeTrigger } from '.';
import { TdColorEvent } from './const';
import Color from './utils/color';

type Emit = (event: TdColorEvent, ...args: any[]) => void;

const COLOR_OBJECT_OUTPUT_KEYS = [
  'alpha',
  'css',
  'hex',
  'hex8',
  'hsl',
  'hsla',
  'hsv',
  'hsva',
  'rgb',
  'rgba',
  'saturation',
  'value',
  'isGradient',
];

const getColorObject = (color: Color): ColorObject => {
  if (!color) {
    return null;
  }
  const colorObject = Object.create(null);
  COLOR_OBJECT_OUTPUT_KEYS.forEach((key) => (colorObject[key] = color[key]));
  if (color.isGradient) {
    colorObject.linearGradient = color.linearGradient;
  }
  return colorObject;
};

/**
 * picker 和 panel 模式共用
 * 提供变更给组件调用者
 * @param value
 * @param emit
 * @returns
 */
export const useColorPicker = (value: string, emit: Emit) => {
  const color = ref(value);
  const handleChange = (value: string, colorInstance: Color, trigger?: ColorPickerChangeTrigger) => {
    color.value = value;
    emit('change', value, {
      color: getColorObject(colorInstance),
      trigger,
    });
  };
  const handlePaletteChange = (value: string, colorInstance: Color) => {
    emit('palette-bar-change', {
      color: getColorObject(colorInstance),
    });
  };
  const updateColor = (value: string) => (color.value = value);

  return {
    color,
    updateColor,
    handleChange,
    handlePaletteChange,
  };
};
