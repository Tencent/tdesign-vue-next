import { withInstall } from '@td/adapter-vue';
import type { TdImageViewerProps } from './type';
import _ImageViewer from '@td/components-common/src/image-viewer/image-viewer';

import '@td/components-common/src/image-viewer/style';

export * from './type';
export type ImageViewerProps = TdImageViewerProps;
export const ImageViewer = withInstall(_ImageViewer);
export default ImageViewer;
