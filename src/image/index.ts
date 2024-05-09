import withInstall from '../utils/withInstall';

import _Image from './image';
import { TdImageProps } from './type';

import './style';

export type ImageProps = TdImageProps;
export * from './type';

export const Image = withInstall(_Image);
export default Image;
