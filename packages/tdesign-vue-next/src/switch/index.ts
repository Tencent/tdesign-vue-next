import { withInstall } from '@td/adapter-vue';
import _Switch from '@td/components-common/src/switch/switch';
import type { TdSwitchProps } from './type';

import '@td/components-common/src/switch/style';

export * from './type';
export type SwitchProps = TdSwitchProps;

export const Switch = withInstall(_Switch);
export default Switch;
