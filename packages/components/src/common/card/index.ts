import _Card from './card';
import { withInstall } from '@td/adapter-utils';
import type { TdCardProps } from '@td/intel/components/card/type';

import './style';

export * from '@td/intel/components/card/type';
export type CardProps = TdCardProps;

export const Card = withInstall(_Card);
export default Card;
