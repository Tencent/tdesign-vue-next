import TdTree from './td-tree';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Tree = mapProps([
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

setInstallFn('Tree', Tree);

export { Tree };
export default Tree;
