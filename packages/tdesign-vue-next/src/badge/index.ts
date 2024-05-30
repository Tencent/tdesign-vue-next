import { withInstall } from '@td/adapter-vue';
import _Badge from '@td/components-common/src/badge/badge';
import type { TdBadgeProps } from './type';

import '@td/components-common/src/badge/style';

export * from './type';
export type BadgeProps = TdBadgeProps;

export const Badge = withInstall(_Badge);
export default Badge;
