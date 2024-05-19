import _SelectInput from './select-input';
import withInstall from '../utils/withInstall';
import { TdSelectInputProps } from '@td/intel/select-input/type';

import './style';

export * from '@td/intel/select-input/type';
export type SelectInputProps = TdSelectInputProps;

export const SelectInput = withInstall(_SelectInput);

export default SelectInput;
