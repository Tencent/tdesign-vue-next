import { computed, ref } from 'vue';
import { usePrefixClass } from '..';
import { TdColorContext } from './interfaces';
import { TdColorPickerProps } from './type';

const BASE_COMPONENT_NAME = 'color-picker';

/**
 * 基础样式
 * @param className
 * @returns
 */
export const useBaseClassName = (className?: string) => {
  const baseClassName = usePrefixClass(BASE_COMPONENT_NAME);
  return computed(() => (className ? `${baseClassName.value}-${className}` : baseClassName.value));
};

/**
 * 状态类样式
 * @returns
 */
export const useStatusClassName = () => {
  const prefix = usePrefixClass();
  return {
    disabledClassName: `${prefix.value}-is-disabled`,
    activeClassName: `${prefix.value}-is-active`,
    currentClassName: `${prefix.value}-is-current`,
    inlineClassName: `${prefix.value}-is-inline`,
  };
};

/**
 * 统一处理picker和panel的输入和输出
 * @param value
 * @param onChange
 * @param onPaletteBarChange
 * @returns
 */
export const useColorPanel = (
  value: string,
  onChange?: TdColorPickerProps['onChange'],
  onPaletteBarChange?: TdColorPickerProps['onPaletteBarChange'],
) => {
  const color = ref(value);
  const handleChange = (value: string, context: TdColorContext) => {
    color.value = value;
    onChange?.(value, context);
  };
  const handlePaletteChange = (context: TdColorContext) => {
    onPaletteBarChange?.(context);
  };
  const updateColor = (value: string) => (color.value = value);

  return {
    color,
    updateColor,
    handleChange,
    handlePaletteChange,
  };
};
