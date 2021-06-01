import TdTree from './td-tree';
import mapProps from '../utils/map-props';
import { withInstall, WithInstallType } from '../utils/withInstall';

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

const Tree: WithInstallType<typeof LocalTree> = withInstall(LocalTree);

export { Tree };
export default Tree;
