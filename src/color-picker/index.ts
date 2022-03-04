import _ColorPickerPanel from './color-picker-panel';
import _ColorPicker from './color-picker';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdColorPickerProps } from './type';
import mapProps from '../utils/map-props';

import './style';

export * from './type';
export type ColorPickerProps = TdColorPickerProps;

export const ColorPickerPanel: WithInstallType<typeof _ColorPickerPanel> = withInstall(
  mapProps([
    {
      name: 'value',
      event: ['change'],
      alias: ['modelValue'],
    },
  ])(_ColorPickerPanel),
);
export const ColorPicker: WithInstallType<typeof _ColorPicker> = withInstall(
  mapProps([
    {
      name: 'value',
      event: ['change'],
      alias: ['modelValue'],
    },
  ])(_ColorPicker),
);
