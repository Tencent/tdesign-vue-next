import { withInstall } from '@td/adapter-vue';
import _TagInput from '@td/components-common/src/tag-input/tag-input';
import type { TdTagInputProps } from './type';

import '@td/components-common/src/tag-input/style';

export * from './type';
export type TagInputProps = TdTagInputProps;

export const TagInput = withInstall(_TagInput);

export default TagInput;
