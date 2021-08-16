import TdTree from './td-tree';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdTreeProps } from './type';

export * from './type';
export type TreeProps = TdTreeProps;

const LocalTree = mapProps([
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
])(TdTree);
export const Tree: WithInstallType<typeof LocalTree> = withInstall(LocalTree);
export default Tree;
