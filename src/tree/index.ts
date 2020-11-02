import _Tree from './Tree';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Tree = mapProps([
  'value',
])(_Tree);

setInstallFn('Tree', Tree);

export { Tree };
export default Tree;
