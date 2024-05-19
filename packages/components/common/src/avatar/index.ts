import _Avatar from './avatar';
import _AvatarGroup from './group';
import withInstall from '../utils/withInstall';
import { TdAvatarProps, TdAvatarGroupProps } from '@td/intel/avatar/type';

import './style';

export * from '@td/intel/avatar/type';

export type AvatarProps = TdAvatarProps;
export type AvatarGroupProps = TdAvatarGroupProps;

export const Avatar = withInstall(_Avatar);
export const AvatarGroup = withInstall(_AvatarGroup);

export default Avatar;
