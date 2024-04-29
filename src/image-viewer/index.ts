import withInstall from '../utils/withInstall';

import _ImageViewer from './image-viewer';
import { TdImageViewerProps } from './type';

import './style';

export * from './type';
export type ImageViewerProps = TdImageViewerProps;
export const ImageViewer = withInstall(_ImageViewer);
export default ImageViewer;
