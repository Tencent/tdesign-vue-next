import { withInstall } from '@td/adapter-vue';
import type { TdSpaceProps } from '@td/components/space/type';
import _Space from './space';

import './style';

export * from '@td/components/space/type';

export type SpaceProps = TdSpaceProps;
export const Space = withInstall(_Space);

export default Space;
