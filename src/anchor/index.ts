import _Anchor from './anchor';
import _AnchorItem from './anchor-item';
import _AnchorTarget from './anchor-target';
import { withInstall, WithInstallType } from '../utils/withInstall';

const Anchor: WithInstallType<typeof _Anchor> = withInstall(_Anchor);
const AnchorItem: WithInstallType<typeof _AnchorItem> = withInstall(_AnchorItem);
const AnchorTarget: WithInstallType<typeof _AnchorTarget> = withInstall(_AnchorTarget);

export { Anchor, AnchorItem, AnchorTarget };
export default Anchor;
