import { withInstall } from '@td/adapter-vue';
import _TreeSelect from '@td/components-common/src/tree-select/tree-select';

import '@td/components-common/src/tree-select/style';

export * from '@td/components-common/src/tree-select/interface';
export const TreeSelect = withInstall(_TreeSelect);
export default TreeSelect;
