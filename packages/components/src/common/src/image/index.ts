import _Image from './image';
import withInstall from '../utils/withInstall';
import { TdImageProps } from './type';

import './style';

export type ImageProps = TdImageProps;
export * from './type';

export const Image = withInstall(_Image);
export default Image;
