import _Input from './input';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Input = mapProps(['value'])(_Input);

setInstallFn('Input', Input);

export default Input;
