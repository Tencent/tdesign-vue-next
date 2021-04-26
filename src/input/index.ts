import _Input from './input';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Input = mapProps([{
  name: 'value',
  alias: ['modelValue'],
  event: ['update:modelValue'],
}])(_Input);

setInstallFn('Input', Input);

export { Input };
export default Input;
