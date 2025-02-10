import _Card from './card';
import withInstall from '../utils/withInstall';
import { TdCardProps } from './type';

import './style';

export * from './type';
export type CardProps = TdCardProps;

export const Card = withInstall(_Card);
export default Card;
