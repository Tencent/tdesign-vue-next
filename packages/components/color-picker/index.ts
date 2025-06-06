import _ColorPickerPanel from './color-picker-panel';
import _ColorPicker from './color-picker';
import { withInstall } from '@tdesign/shared-utils';
import { TdColorPickerProps } from './type';

import './style';

export * from './type';
export type ColorPickerProps = TdColorPickerProps;
export type ColorPickerPanelProps = TdColorPickerProps;

export const ColorPickerPanel = withInstall(_ColorPickerPanel);
export const ColorPicker = withInstall(_ColorPicker);
