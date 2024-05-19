import type { ColorObject, ColorPickerChangeTrigger } from './type';

// color modes
export type TdColorModes = 'monochrome' | 'linear-gradient';

// color context
export interface TdColorContext {
  color: ColorObject;
  trigger: ColorPickerChangeTrigger;
}

export type TdColorHandler = (...args: any) => void;
