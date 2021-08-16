import _Input from './input';
import _InputGroup from './input-group';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdInputProps } from './type';

export * from './type';
export type InputProps = TdInputProps;

const LocalInput = mapProps([{
  name: 'value',
  event: ['input', 'change'],
  alias: ['modelValue'],
}])(_Input);

export const Input: WithInstallType<typeof LocalInput> = withInstall(LocalInput);
export const InputGroup: WithInstallType<typeof _InputGroup> = withInstall(_InputGroup);
export default Input;
