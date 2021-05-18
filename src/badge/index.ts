import _Badge from './badge';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Badge: WithInstallType<typeof _Badge> = withInstall(_Badge);

export * from '@TdTypes/badge/TdBadgeProps';
export { Badge };
export default Badge;
