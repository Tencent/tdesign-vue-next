import _TdTree from '@td/components-common/src/tree/tree';
import { withInstall } from '@td/components-common/src/tree/adapt';

import '@td/components-common/src/tree/style';

export const Tree = withInstall(_TdTree);

export * from '@td/components-common/src/tree/tree-types';
export default Tree;
