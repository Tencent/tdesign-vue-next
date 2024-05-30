import { withInstall } from '@td/adapter-vue';
import type { TdInputAdornmentProps } from './type';
import _InputAdornment from '@td/components-common/src/input-adornment/input-adornment';

import '@td/components-common/src/input-adornment/style';

export * from './type';

export type InputAdornmentProps = TdInputAdornmentProps;
export const InputAdornment = withInstall(_InputAdornment);

export default InputAdornment;
