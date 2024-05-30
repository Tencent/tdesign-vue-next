import { withInstall } from '@td/adapter-vue';
import type { TdInputAdornmentProps } from '@td/components/input-adornment/type';
import _InputAdornment from '@td/components-common/src/input-adornment/input-adornment';

import '@td/components-common/src/input-adornment/style';

export * from '@td/components/input-adornment/type';

export type InputAdornmentProps = TdInputAdornmentProps;
export const InputAdornment = withInstall(_InputAdornment);

export default InputAdornment;
