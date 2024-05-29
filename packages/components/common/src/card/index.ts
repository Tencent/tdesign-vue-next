import { withInstall } from '@td/adapter-vue';
import type { TdCardProps } from '@td/intel/card/type';
import _Card from './card';

import './style';

export * from '@td/intel/card/type';
export type CardProps = TdCardProps;

export const Card = withInstall(_Card);
export default Card;
