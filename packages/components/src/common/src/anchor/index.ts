import _Anchor from './anchor';
import _AnchorItem from './anchor-item';
import _AnchorTarget from './anchor-target';
import withInstall from '../utils/withInstall';
import { TdAnchorProps, TdAnchorTargetProps, TdAnchorItemProps } from './type';

import './style';

export * from './type';
export type AnchorProps = TdAnchorProps;
export type AnchorTargetProps = TdAnchorTargetProps;
export type AnchorItemProps = TdAnchorItemProps;

export const Anchor = withInstall(_Anchor);
export const AnchorItem = withInstall(_AnchorItem);
export const AnchorTarget = withInstall(_AnchorTarget);

export default Anchor;
