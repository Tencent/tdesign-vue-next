import { withInstall } from '@td/adapter-vue';
import type { TdImageViewerProps } from '@td/components/image-viewer/type';
import _ImageViewer from './image-viewer';

import './style';

export * from '@td/components/image-viewer/type';
export type ImageViewerProps = TdImageViewerProps;
export const ImageViewer = withInstall(_ImageViewer);
export default ImageViewer;
