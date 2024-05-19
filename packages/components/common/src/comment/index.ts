import _Comment from './comment';
import { withInstall } from '@td/adapter-utils';
import { TdCommentProps } from '@td/intel/comment/type';

import './style';

export * from '@td/intel/comment/type';
export type CommentProps = TdCommentProps;

export const Comment = withInstall(_Comment);
export default Comment;
