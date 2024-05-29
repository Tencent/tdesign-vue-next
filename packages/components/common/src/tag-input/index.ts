import { withInstall } from '@td/adapter-vue';
import type { TdTagInputProps } from '@td/intel/tag-input/type';
import _TagInput from './tag-input';

import './style';

export * from '@td/intel/tag-input/type';
export type TagInputProps = TdTagInputProps;

export const TagInput = withInstall(_TagInput);

export default TagInput;
