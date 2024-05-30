import { withInstall } from '@td/adapter-vue';
import type { TdSwitchProps } from '@td/components/switch/type';
import _Switch from './switch';

import './style';

export * from '@td/components/switch/type';
export type SwitchProps = TdSwitchProps;

export const Switch = withInstall(_Switch);
export default Switch;
