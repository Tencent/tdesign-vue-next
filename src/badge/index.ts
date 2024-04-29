import withInstall from '../utils/withInstall';

import _Badge from './badge';
import { TdBadgeProps } from './type';

import './style';

export * from './type';
export type BadgeProps = TdBadgeProps;

export const Badge = withInstall(_Badge);
export default Badge;
