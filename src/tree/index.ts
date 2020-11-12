import _Tree from './Tree';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Tree = mapProps([
  {
    name: 'value',
    event: 'change',
  },
  {
    name: 'expanded',
    event: 'expand',
  },
  {
    name: 'actived',
    event: 'active',
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
