import _Switch from './switch';
import withInstall from '../utils/withInstall';
import { TdSwitchProps } from '@td/intel/switch/type';

import './style';

export * from '@td/intel/switch/type';
export type SwitchProps = TdSwitchProps;

export const Switch = withInstall(_Switch);
export default Switch;
