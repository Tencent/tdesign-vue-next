import { withInstall } from '@td/adapter-vue';
import _Image from '@td/components-common/src/image/image';
import type { TdImageProps } from './type';

import '@td/components-common/src/image/style';

export type ImageProps = TdImageProps;
export * from './type';

export const Image = withInstall(_Image);
export default Image;
