import { withInstall } from '@td/adapter-vue';
import _InputAdornment from '@td/components-common/src/input-adornment/input-adornment';
import type { TdInputAdornmentProps } from './type';

import '@td/components-common/src/input-adornment/style';

export * from './type';

export type InputAdornmentProps = TdInputAdornmentProps;
export const InputAdornment = withInstall(_InputAdornment);

export default InputAdornment;
