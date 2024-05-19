import { withInstall } from '@td/adapter-utils';
import type { TdTagInputProps } from '@td/intel/components/tag-input/type';
import _TagInput from './tag-input';

import './style';

export * from '@td/intel/components/tag-input/type';
export type TagInputProps = TdTagInputProps;

export const TagInput = withInstall(_TagInput);

export default TagInput;
