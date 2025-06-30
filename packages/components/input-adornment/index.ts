import _InputAdornment from './input-adornment';
import { withInstall } from '@tdesign/shared-utils';
import { TdInputAdornmentProps } from './type';

import './style';

export * from './type';

export type InputAdornmentProps = TdInputAdornmentProps;
export const InputAdornment = withInstall(_InputAdornment);

export default InputAdornment;
