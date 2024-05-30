import { withInstall } from '@td/adapter-vue';
import type { TdColorPickerProps } from '@td/components/color-picker/type';
import _ColorPickerPanel from '@td/components-common/src/color-picker/color-picker-panel';
import _ColorPicker from '@td/components-common/src/color-picker/color-picker';

import '@td/components-common/src/color-picker/style';

export * from '@td/components/color-picker/type';
export type ColorPickerProps = TdColorPickerProps;
export type ColorPickerPanelProps = TdColorPickerProps;

export const ColorPickerPanel = withInstall(_ColorPickerPanel);
export const ColorPicker = withInstall(_ColorPicker);
