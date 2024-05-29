import { withInstall } from '@td/adapter-vue';
import type { TdCommentProps } from '@td/intel/comment/type';
import _Comment from './comment';

import './style';

export * from '@td/intel/comment/type';
export type CommentProps = TdCommentProps;

export const Comment = withInstall(_Comment);
export default Comment;
