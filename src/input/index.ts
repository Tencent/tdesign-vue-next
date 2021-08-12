import _Input from './input';
import _Addon from './addon';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';

const LocalInput = mapProps([{
  name: 'value',
  event: ['input', 'change'],
  alias: ['modelValue'],
}])(_Input);

const Input: WithInstallType<typeof LocalInput> = withInstall(LocalInput);
export const Addon: WithInstallType<typeof LocalInput> = withInstall(_Addon);

export { Input };
export default Input;
