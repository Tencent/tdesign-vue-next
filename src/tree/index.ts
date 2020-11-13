import _Tree from './Tree';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Tree = mapProps([
  {
    name: 'value',
    event: ['change', 'update:value'],
  },
  {
    name: 'expanded',
    event: ['expand', 'update:expanded'],
  },
  {
    name: 'actived',
    event: ['active', 'update:actived'],
  },
], {
  model: {
    prop: 'value',
    event: 'change',
  },
})(_Tree);

setInstallFn('Tree', Tree);

export { Tree };
export default Tree;
