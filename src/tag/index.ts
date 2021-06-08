import _Tag from './tag';
import _CheckTag from './check-tag';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';

const LocalCheckTag = mapProps([{
  name: 'checked', event: 'change',
}])(_CheckTag);

const Tag: WithInstallType<typeof _Tag> = withInstall(_Tag);
const CheckTag: WithInstallType<typeof LocalCheckTag> = withInstall(LocalCheckTag);

export { Tag, CheckTag };
export default Tag;
