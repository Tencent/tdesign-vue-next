import _TreeSelect from './tree-select';
import { withInstall } from '@td/adapter-utils';

import './style';

export * from './interface';
export const TreeSelect = withInstall(_TreeSelect);
export default TreeSelect;
