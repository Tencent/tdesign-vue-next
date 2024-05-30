import { withInstall } from '@td/adapter-vue';
import _Watermark from '@td/components-common/src/watermark/watermark';

export * from '@td/components/watermark/type';

export const Watermark = withInstall(_Watermark);
export default Watermark;
