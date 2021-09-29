import _TdTree from './td-tree';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTreeProps } from './type';

import './style';

export * from './type';
export type TreeProps = TdTreeProps;

export const Tree: WithInstallType<typeof _TdTree> = withInstall(mapProps([
  {
    name: 'value',
    event: ['change', 'update:value'],
    alias: ['modelValue'],
  },
  {
    name: 'expanded',
    event: ['expand', 'update:expanded'],
  },
  {
    name: 'actived',
    event: ['active', 'update:actived'],
  },
])(_TdTree));
export default Tree;
