import type { TdAnchorItemProps, TdAnchorProps, TdAnchorTargetProps } from '@td/intel/components/anchor/type';
import { withInstall } from '@td/adapter-utils';
import _Anchor from './anchor';
import _AnchorItem from './anchor-item';
import _AnchorTarget from './anchor-target';

import './style';

export * from '@td/intel/components/anchor/type';
export type AnchorProps = TdAnchorProps;
export type AnchorTargetProps = TdAnchorTargetProps;
export type AnchorItemProps = TdAnchorItemProps;

export const Anchor = withInstall(_Anchor);
export const AnchorItem = withInstall(_AnchorItem);
export const AnchorTarget = withInstall(_AnchorTarget);

export default Anchor;
