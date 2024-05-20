import { withInstall } from '@td/adapter-utils';
import _Watermark from './watermark';

export * from '@td/intel/watermark/type';

export const Watermark = withInstall(_Watermark);
export default Watermark;
