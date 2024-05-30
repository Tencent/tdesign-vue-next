import { withInstall } from '@td/adapter-vue';
import _SelectInput from '@td/components-common/src/select-input/select-input';
import type { TdSelectInputProps } from './type';

import '@td/components-common/src/select-input/style';

export * from './type';
export type SelectInputProps = TdSelectInputProps;

export const SelectInput = withInstall(_SelectInput);

export default SelectInput;
