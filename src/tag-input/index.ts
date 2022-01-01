import _TagInput from './tag-input';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTagInputProps } from './type';

import './style';

export * from './type';
export type TagInputProps = TdTagInputProps;

export const TagInput: WithInstallType<typeof _TagInput> = withInstall(_TagInput);
export default TagInput;
