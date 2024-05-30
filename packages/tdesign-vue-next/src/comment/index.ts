import { withInstall } from '@td/adapter-vue';
import _Comment from '@td/components-common/src/comment/comment';
import type { TdCommentProps } from './type';

import '@td/components-common/src/comment/style';

export * from './type';
export type CommentProps = TdCommentProps;

export const Comment = withInstall(_Comment);
export default Comment;
