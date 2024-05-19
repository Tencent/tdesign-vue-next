import _Comment from './comment';
import withInstall from '../utils/withInstall';
import { TdCommentProps } from './type';

import './style';

export * from './type';
export type CommentProps = TdCommentProps;

export const Comment = withInstall(_Comment);
export default Comment;
