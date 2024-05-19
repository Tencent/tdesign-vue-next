import _TdTree from './tree';
import { withInstall } from './adapt';

import './style';

export const Tree = withInstall(_TdTree);

export * from '@td/intel/components/tree/tree-types';
export default Tree;
