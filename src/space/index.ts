import withInstall from '../utils/withInstall';

import _Space from './space';
import { TdSpaceProps } from './type';

import './style';

export * from './type';

export type SpaceProps = TdSpaceProps;
export const Space = withInstall(_Space);

export default Space;
