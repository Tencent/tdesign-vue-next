import _Image from './image';
import { withInstall } from '@td/adapter-utils';
import type { TdImageProps } from '@td/intel/components/image/type';

import './style';

export type ImageProps = TdImageProps;
export * from '@td/intel/components/image/type';

export const Image = withInstall(_Image);
export default Image;
