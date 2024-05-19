import _Switch from './switch';
import { withInstall } from '@td/adapter-utils';
import type { TdSwitchProps } from '@td/intel/components/switch/type';

import './style';

export * from '@td/intel/components/switch/type';
export type SwitchProps = TdSwitchProps;

export const Switch = withInstall(_Switch);
export default Switch;