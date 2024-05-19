import { withInstall } from '@td/adapter-utils';
import type { TdColorPickerProps } from '@td/intel/components/color-picker/type';
import _ColorPickerPanel from './color-picker-panel';
import _ColorPicker from './color-picker';

import './style';

export * from '@td/intel/components/color-picker/type';
export type ColorPickerProps = TdColorPickerProps;
export type ColorPickerPanelProps = TdColorPickerProps;

export const ColorPickerPanel = withInstall(_ColorPickerPanel);
export const ColorPicker = withInstall(_ColorPicker);
