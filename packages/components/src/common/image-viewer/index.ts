import _ImageViewer from './image-viewer';
import { withInstall } from '@td/adapter-utils';
import type { TdImageViewerProps } from '@td/intel/components/image-viewer/type';

import './style';

export * from '@td/intel/components/image-viewer/type';
export type ImageViewerProps = TdImageViewerProps;
export const ImageViewer = withInstall(_ImageViewer);
export default ImageViewer;
