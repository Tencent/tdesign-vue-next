import { withInstall } from '@td/adapter-vue';
import type { TdColorPickerProps } from '@td/components/color-picker/type';
import _ColorPickerPanel from './color-picker-panel';
import _ColorPicker from './color-picker';

import './style';

export * from '@td/components/color-picker/type';
export type ColorPickerProps = TdColorPickerProps;
export type ColorPickerPanelProps = TdColorPickerProps;

export const ColorPickerPanel = withInstall(_ColorPickerPanel);
export const ColorPicker = withInstall(_ColorPicker);
