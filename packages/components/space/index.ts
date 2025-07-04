import _Space from './space';
import { withInstall } from '@tdesign/shared-utils';
import { TdSpaceProps } from './type';

import './style';

export * from './type';

export type SpaceProps = TdSpaceProps;
export const Space = withInstall(_Space);

export default Space;
