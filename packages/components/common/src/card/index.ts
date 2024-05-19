import _Card from './card';
import { withInstall } from '@td/adapter-utils';
import { TdCardProps } from '@td/intel/card/type';

import './style';

export * from '@td/intel/card/type';
export type CardProps = TdCardProps;

export const Card = withInstall(_Card);
export default Card;
