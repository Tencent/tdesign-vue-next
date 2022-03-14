import { Ref } from 'vue';
import { ColorObject, ColorPickerChangeTrigger } from '.';

// provides
export enum TdColorPickerProvides {
  POPUP = 'POPUP',
  USED_COLORS = 'USED_COLORS',
}

// used colors provide
export interface TdColorPickerUsedColorsProvide {
  colors: Ref<string[]>;
  activeColor: Ref<string>;
  setActiveColor: (color: string) => void;
  addColor: (color: string) => void;
  removeColor: (color: string) => void;
}

// popup visible provide
export interface TdColorPickerPopupProvide {
  visible: Ref<boolean>;
  setVisible: (value: boolean) => void;
}

// color modes
export type TdColorModes = 'monochrome' | 'linear-gradient';

// color context
export interface TdColorContext {
  color: ColorObject;
  trigger: ColorPickerChangeTrigger;
}
