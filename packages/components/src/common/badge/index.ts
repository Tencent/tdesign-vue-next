import _Badge from './badge';
import { withInstall } from '@td/adapter-utils';
import type { TdBadgeProps } from '@td/intel/components/badge/type';

import './style';

export * from '@td/intel/components/badge/type';
export type BadgeProps = TdBadgeProps;

export const Badge = withInstall(_Badge);
export default Badge;
