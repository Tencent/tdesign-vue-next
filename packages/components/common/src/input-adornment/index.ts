import { withInstall } from '@td/adapter-vue';
import type { TdInputAdornmentProps } from '@td/intel/input-adornment/type';
import _InputAdornment from './input-adornment';

import './style';

export * from '@td/intel/input-adornment/type';

export type InputAdornmentProps = TdInputAdornmentProps;
export const InputAdornment = withInstall(_InputAdornment);

export default InputAdornment;
