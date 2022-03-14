import _ColorPickerPanel from './color-picker-panel';
import _ColorPicker from './color-picker';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdColorPickerProps } from './type';

import './style';

export * from './type';
export type ColorPickerProps = TdColorPickerProps;

export const ColorPickerPanel: WithInstallType<typeof _ColorPickerPanel> = withInstall(_ColorPickerPanel);
export const ColorPicker: WithInstallType<typeof _ColorPicker> = withInstall(_ColorPicker);
