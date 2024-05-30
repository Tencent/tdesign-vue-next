import { withInstall } from '@td/adapter-vue';
import _Card from '@td/components-common/src/card/card';
import type { TdCardProps } from './type';

import '@td/components-common/src/card/style';

export * from './type';
export type CardProps = TdCardProps;

export const Card = withInstall(_Card);
export default Card;
