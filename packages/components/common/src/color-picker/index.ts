import _ColorPickerPanel from './color-picker-panel';
import _ColorPicker from './color-picker';
import withInstall from '../utils/withInstall';
import { TdColorPickerProps } from '@td/intel/color-picker/type';

import './style';

export * from '@td/intel/color-picker/type';
export type ColorPickerProps = TdColorPickerProps;
export type ColorPickerPanelProps = TdColorPickerProps;

export const ColorPickerPanel = withInstall(_ColorPickerPanel);
export const ColorPicker = withInstall(_ColorPicker);
