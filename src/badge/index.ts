import _Badge from './badge';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdBadgeProps } from './type';

import './style';

export * from './type';
export type BadgeProps = TdBadgeProps;

export const Badge: WithInstallType<typeof _Badge> = withInstall(_Badge);
export default Badge;
