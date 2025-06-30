import _ImageViewer from './image-viewer';
import { withInstall } from '@tdesign/shared-utils';
import { TdImageViewerProps } from './type';

import './style';

export * from './type';
export type ImageViewerProps = TdImageViewerProps;
export const ImageViewer = withInstall(_ImageViewer);
export default ImageViewer;
