import _Image from './image';
import withInstall from '../utils/withInstall';
import { TdImageProps } from '@td/intel/image/type';

import './style';

export type ImageProps = TdImageProps;
export * from '@td/intel/image/type';

export const Image = withInstall(_Image);
export default Image;
