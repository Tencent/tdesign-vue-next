import _Comment from './comment';
import { withInstall } from '@td/adapter-utils';
import type { TdCommentProps } from '@td/intel/components/comment/type';

import './style';

export * from '@td/intel/components/comment/type';
export type CommentProps = TdCommentProps;

export const Comment = withInstall(_Comment);
export default Comment;
