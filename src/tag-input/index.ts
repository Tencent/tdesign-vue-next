import _TagInput from './tag-input';
import withInstall from '../utils/withInstall';
import { TdTagInputProps } from './type';

import './style';

export * from './type';
export type TagInputProps = TdTagInputProps;

export const TagInput = withInstall(_TagInput);

export default TagInput;
