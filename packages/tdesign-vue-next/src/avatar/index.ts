import { withInstall } from '@td/adapter-vue';
import _Avatar from '@td/components-common/src/avatar/avatar';
import _AvatarGroup from '@td/components-common/src/avatar/group';
import type { TdAvatarGroupProps, TdAvatarProps } from './type';

import '@td/components-common/src/avatar/style';

export * from './type';

export type AvatarProps = TdAvatarProps;
export type AvatarGroupProps = TdAvatarGroupProps;

export const Avatar = withInstall(_Avatar);
export const AvatarGroup = withInstall(_AvatarGroup);

export default Avatar;
