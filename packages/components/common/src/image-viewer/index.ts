import { withInstall } from '@td/adapter-utils';
import type { TdImageViewerProps } from '@td/intel/image-viewer/type';
import _ImageViewer from './image-viewer';

import './style';

export * from '@td/intel/image-viewer/type';
export type ImageViewerProps = TdImageViewerProps;
export const ImageViewer = withInstall(_ImageViewer);
export default ImageViewer;
