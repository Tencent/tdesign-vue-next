import _Comment from './comment';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdCommentProps } from './type';

import './style';

export * from './type';
export type CommentProps = TdCommentProps;

export const Comment = withInstall<typeof _Comment>(_Comment);
export default Comment;
