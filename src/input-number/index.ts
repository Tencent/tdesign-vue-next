import _InputNumber from './input-number';
import setInstallFn from '../utils/setInstallFn';
import mapProps from '../utils/map-props';

const InputNumber = mapProps([{
  name: 'value',
  alias: ['modelValue'],
}])(_InputNumber);
setInstallFn('InputNumber', InputNumber);

export { InputNumber };
export default InputNumber;
