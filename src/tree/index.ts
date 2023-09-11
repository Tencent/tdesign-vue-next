import _TdTree from './td-tree';
import { withInstall } from './adapt';

import './style';

export const Tree = withInstall(_TdTree);

export * from './tree-types';
export default Tree;
