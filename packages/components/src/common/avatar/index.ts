import _Avatar from './avatar';
import _AvatarGroup from './group';
import { withInstall } from '@td/adapter-utils';
import type { TdAvatarProps, TdAvatarGroupProps } from '@td/intel/components/avatar/type';

import './style';

export * from '@td/intel/components/avatar/type';

export type AvatarProps = TdAvatarProps;
export type AvatarGroupProps = TdAvatarGroupProps;

export const Avatar = withInstall(_Avatar);
export const AvatarGroup = withInstall(_AvatarGroup);

export default Avatar;
