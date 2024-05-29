import { withInstall } from '@td/adapter-vue';
import type { TdSelectInputProps } from '@td/components/select-input/type';
import _SelectInput from './select-input';

import './style';

export * from '@td/components/select-input/type';
export type SelectInputProps = TdSelectInputProps;

export const SelectInput = withInstall(_SelectInput);

export default SelectInput;
