import Upload from './upload';
import mapProps from '../utils/map-props';

export default mapProps([
  { name: 'fileList', event: 'change' },
])(Upload);
