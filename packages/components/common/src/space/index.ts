import _Space from './space';
import { withInstall } from '@td/adapter-utils';
import { TdSpaceProps } from '@td/intel/space/type';

import './style';

export * from '@td/intel/space/type';

export type SpaceProps = TdSpaceProps;
export const Space = withInstall(_Space);

export default Space;
