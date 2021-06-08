import _Switch from './switch';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';

const LocalSwitch = mapProps([{
  name: 'value', event: 'change', alias: ['modelValue'],
}])(_Switch);

const Switch: WithInstallType<typeof LocalSwitch> = withInstall(LocalSwitch);

export { Switch };
export default Switch;
