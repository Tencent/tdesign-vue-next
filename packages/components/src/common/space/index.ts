import _Space from './space';
import { withInstall } from '@td/adapter-utils';

import './style';

export * from '@td/intel/components/space/type';

export const Space = withInstall(_Space);

export default Space;
