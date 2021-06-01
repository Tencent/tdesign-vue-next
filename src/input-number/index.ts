import _InputNumber from './input-number';
import { withInstall, WithInstallType } from '../utils/withInstall';
import mapProps from '../utils/map-props';

const LocalInputNumber = mapProps([{
  name: 'value',
  alias: ['modelValue'],
}])(_InputNumber);

const InputNumber: WithInstallType<typeof LocalInputNumber> = withInstall(LocalInputNumber);

export { InputNumber };
export default InputNumber;
