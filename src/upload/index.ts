import _Upload from './upload';
import mapProps from '../utils/map-props';
import setInstallFn from '../utils/setInstallFn';

const Upload = mapProps([
  { name: 'fileList', event: 'change' },
])(_Upload);

setInstallFn('Upload', Upload);

export default Upload;
