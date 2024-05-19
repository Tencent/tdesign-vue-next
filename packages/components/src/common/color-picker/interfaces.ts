import type { ColorObject, ColorPickerChangeTrigger } from '@td/intel/components/color-picker/type';

// color modes
export type TdColorModes = 'monochrome' | 'linear-gradient';

// color context
export interface TdColorContext {
  color: ColorObject;
  trigger: ColorPickerChangeTrigger;
}
