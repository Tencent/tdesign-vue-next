import _Tag from './tag';
import _CheckTag from './check-tag';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTagProps } from './type';

export * from './type';
export type TagProps = TdTagProps;

const LocalCheckTag = mapProps([{
  name: 'checked', event: 'change',
}])(_CheckTag);

export const Tag: WithInstallType<typeof _Tag> = withInstall(_Tag);
export const CheckTag: WithInstallType<typeof LocalCheckTag> = withInstall(LocalCheckTag);
export default Tag;
