import { withInstall } from './adapt';
import _TdTree from './tree';

import './style';

export const Tree = withInstall(_TdTree);

export * from './tree-types';
export default Tree;
