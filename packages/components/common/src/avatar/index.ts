import { withInstall } from '@td/adapter-utils';
import type { TdAvatarGroupProps, TdAvatarProps } from '@td/intel/avatar/type';
import _Avatar from './avatar';
import _AvatarGroup from './group';

import './style';

export * from '@td/intel/avatar/type';

export type AvatarProps = TdAvatarProps;
export type AvatarGroupProps = TdAvatarGroupProps;

export const Avatar = withInstall(_Avatar);
export const AvatarGroup = withInstall(_AvatarGroup);

export default Avatar;
