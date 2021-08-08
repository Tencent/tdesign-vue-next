import _Input from './input';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';

const LocalInput = mapProps([{
  name: 'value',
  event: ['input', 'change'],
  alias: ['modelValue'],
}])(_Input);

const Input: WithInstallType<typeof LocalInput> = withInstall(LocalInput);

export { Input };
export default Input;
