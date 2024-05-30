import { withInstall } from '@td/adapter-vue';
import type { TdImageViewerProps } from '@td/components/image-viewer/type';
import _ImageViewer from '@td/components-common/src/image-viewer/image-viewer';

import '@td/components-common/src/image-viewer/style';

export * from '@td/components/image-viewer/type';
export type ImageViewerProps = TdImageViewerProps;
export const ImageViewer = withInstall(_ImageViewer);
export default ImageViewer;
