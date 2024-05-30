import { withInstall } from '@td/adapter-vue';
import type { TdSpaceProps } from './type';
import _Space from '@td/components-common/src/space/space';

import '@td/components-common/src/space/style';

export * from './type';

export type SpaceProps = TdSpaceProps;
export const Space = withInstall(_Space);

export default Space;
