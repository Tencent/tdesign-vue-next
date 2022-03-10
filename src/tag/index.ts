import _Tag from './tag';
import _CheckTag from './check-tag';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTagProps } from './type';

import './style';

export * from './type';
export type TagProps = TdTagProps;

export const Tag: WithInstallType<typeof _Tag> = withInstall(_Tag);
export const CheckTag: WithInstallType<typeof _CheckTag> = withInstall(_CheckTag);

export default Tag;
