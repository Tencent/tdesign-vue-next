import _TdTree from './td-tree';
import withInstall from '../utils/withInstall';
import { TdTreeProps } from './type';

import './style';

export * from './type';
export type TreeProps = TdTreeProps;

export const Tree = withInstall(_TdTree);
export default Tree;
