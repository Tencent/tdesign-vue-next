import _ImageViewer from './image-viewer';
import withInstall from '../utils/withInstall';
import { TdImageViewerProps } from '@td/intel/image-viewer/type';

import './style';

export * from '@td/intel/image-viewer/type';
export type ImageViewerProps = TdImageViewerProps;
export const ImageViewer = withInstall(_ImageViewer);
export default ImageViewer;
