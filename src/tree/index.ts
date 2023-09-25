import _TdTree from './tree';
import { withInstall } from './adapt';

import './style';

export const Tree = withInstall(_TdTree);

export * from './tree-types';
export default Tree;
