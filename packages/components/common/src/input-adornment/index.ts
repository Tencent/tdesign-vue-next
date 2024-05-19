import _InputAdornment from './input-adornment';
import withInstall from '../utils/withInstall';
import { TdInputAdornmentProps } from '@td/intel/input-adornment/type';

import './style';

export * from '@td/intel/input-adornment/type';

export type InputAdornmentProps = TdInputAdornmentProps;
export const InputAdornment = withInstall(_InputAdornment);

export default InputAdornment;
