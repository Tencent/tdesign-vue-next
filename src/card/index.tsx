import _Card from './card';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdCardProps } from './type';

import './style';

export * from './type';
export type CardProps = TdCardProps;

export const Card: WithInstallType<typeof _Card> = withInstall(_Card);
export default Card;
