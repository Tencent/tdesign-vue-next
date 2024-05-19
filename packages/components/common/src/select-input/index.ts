import { withInstall } from '@td/adapter-utils';
import type { TdSelectInputProps } from '@td/intel/select-input/type';
import _SelectInput from './select-input';

import './style';

export * from '@td/intel/select-input/type';
export type SelectInputProps = TdSelectInputProps;

export const SelectInput = withInstall(_SelectInput);

export default SelectInput;
