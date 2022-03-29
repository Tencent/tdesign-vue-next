import _TreeSelect from './tree-select';
import { withInstall, WithInstallType } from '../utils/withInstall';

import './style';

export * from './interface';
export const TreeSelect: WithInstallType<typeof _TreeSelect> = withInstall(_TreeSelect);
export default TreeSelect;
