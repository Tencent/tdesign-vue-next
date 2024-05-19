import _TagInput from './tag-input';
import { withInstall } from '@td/adapter-utils';
import { TdTagInputProps } from '@td/intel/tag-input/type';

import './style';

export * from '@td/intel/tag-input/type';
export type TagInputProps = TdTagInputProps;

export const TagInput = withInstall(_TagInput);

export default TagInput;
