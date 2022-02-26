import _SelectInput from './select-input';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdSelectInputProps } from './type';

import './style';

export * from './type';
export type SelectInputProps = TdSelectInputProps;

export const SelectInput: WithInstallType<typeof _SelectInput> = withInstall(_SelectInput);

export default SelectInput;
