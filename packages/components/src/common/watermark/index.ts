import _Watermark from './watermark';
import { withInstall } from '@td/adapter-utils';

export * from '@td/intel/components/watermark/type';

export const Watermark = withInstall(_Watermark);
export default Watermark;
