import _Comment from './comment';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdCommentProps } from './type';

import './style';

export * from './type';
export type CommentProps = TdCommentProps;

export const Comment: WithInstallType<typeof _Comment> = withInstall(_Comment);
export default Comment;
