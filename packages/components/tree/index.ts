import _TdTree from './tree';
import { withInstall } from './utils/adapt';

import './style';

export const Tree = withInstall(_TdTree);

export * from './types';
export default Tree;
