import _Badge from './badge';
import { withInstall } from '@td/adapter-utils';
import { TdBadgeProps } from '@td/intel/badge/type';

import './style';

export * from '@td/intel/badge/type';
export type BadgeProps = TdBadgeProps;

export const Badge = withInstall(_Badge);
export default Badge;
