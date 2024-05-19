import _Watermark from './watermark';
import withInstall from '../utils/withInstall';

export * from '@td/intel/watermark/type';

export const Watermark = withInstall(_Watermark);
export default Watermark;
