import { withInstall } from '@td/adapter-vue';
import type { TdImageProps } from '@td/components/image/type';
import _Image from './image';

import './style';

export type ImageProps = TdImageProps;
export * from '@td/components/image/type';

export const Image = withInstall(_Image);
export default Image;
