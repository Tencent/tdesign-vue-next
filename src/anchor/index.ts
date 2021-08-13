import _Anchor from './anchor';
import _AnchorItem from './anchor-item';
import _AnchorTarget from './anchor-target';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdAnchorProps, TdAnchorTargetProps, TdAnchorItemProps } from './type';

export * from './type';
export type AnchorProps = TdAnchorProps;
export type AnchorTargetProps = TdAnchorTargetProps;
export type AnchorItemProps = TdAnchorItemProps;

export const Anchor: WithInstallType<typeof _Anchor> = withInstall(_Anchor);
export const AnchorItem: WithInstallType<typeof _AnchorItem> = withInstall(_AnchorItem);
export const AnchorTarget: WithInstallType<typeof _AnchorTarget> = withInstall(_AnchorTarget);

export default Anchor;
