import _TagInput from './tag-input';
import { withInstall } from '@tdesign/shared-utils';
import { TdTagInputProps } from './type';

import './style';

export * from './type';
export type TagInputProps = TdTagInputProps;

export const TagInput = withInstall(_TagInput);

export default TagInput;
