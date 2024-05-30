import { withInstall } from '@td/adapter-vue';
import type { TdBadgeProps } from '@td/components/badge/type';
import _Badge from './badge';

import './style';

export * from '@td/components/badge/type';
export type BadgeProps = TdBadgeProps;

export const Badge = withInstall(_Badge);
export default Badge;
