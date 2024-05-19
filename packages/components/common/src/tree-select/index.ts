import { withInstall } from '@td/adapter-utils';
import _TreeSelect from './tree-select';

import './style';

export * from './interface';
export const TreeSelect = withInstall(_TreeSelect);
export default TreeSelect;
