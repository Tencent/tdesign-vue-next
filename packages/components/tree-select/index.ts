import _TreeSelect from './tree-select';
import { withInstall } from '@tdesign/shared-utils';

import './style';

export * from './interface';
export const TreeSelect = withInstall(_TreeSelect);
export default TreeSelect;
