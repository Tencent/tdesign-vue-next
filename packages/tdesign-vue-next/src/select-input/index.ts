import { withInstall } from '@td/adapter-vue';
import type { TdSelectInputProps } from '@td/components/select-input/type';
import _SelectInput from '@td/components-common/src/select-input/select-input';

import '@td/components-common/src/select-input/style';

export * from '@td/components/select-input/type';
export type SelectInputProps = TdSelectInputProps;

export const SelectInput = withInstall(_SelectInput);

export default SelectInput;
