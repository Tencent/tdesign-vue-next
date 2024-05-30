import { withInstall } from '@td/adapter-vue';
import type { TdCommentProps } from '@td/components/comment/type';
import _Comment from '@td/components-common/src/comment/comment';

import '@td/components-common/src/comment/style';

export * from '@td/components/comment/type';
export type CommentProps = TdCommentProps;

export const Comment = withInstall(_Comment);
export default Comment;
