import { withInstall } from '@td/adapter-utils';
import type { TdImageProps } from '@td/intel/image/type';
import _Image from './image';

import './style';

export type ImageProps = TdImageProps;
export * from '@td/intel/image/type';

export const Image = withInstall(_Image);
export default Image;
