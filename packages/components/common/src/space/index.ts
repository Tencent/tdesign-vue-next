import { withInstall } from '@td/adapter-utils';
import type { TdSpaceProps } from '@td/intel/space/type';
import _Space from './space';

import './style';

export * from '@td/intel/space/type';

export type SpaceProps = TdSpaceProps;
export const Space = withInstall(_Space);

export default Space;
