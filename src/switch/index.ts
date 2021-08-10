import _Switch from './switch';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdSwitchProps } from './type';

export * from './type';
export type SwitchProps = TdSwitchProps;

const LocalSwitch = mapProps([{
  name: 'value', event: 'change', alias: ['modelValue'],
}])(_Switch);
export const Switch: WithInstallType<typeof LocalSwitch> = withInstall(LocalSwitch);
export default Switch;
