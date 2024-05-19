import _Collapse from './collapse';
import _CollapsePanel from './collapse-panel';
import { withInstall } from '@td/adapter-utils';
import type { TdCollapseProps } from '@td/intel/components/collapse/type';

import './style';

export * from '@td/intel/components/collapse/type';
export type CollapseProps = TdCollapseProps;

export const Collapse = withInstall(_Collapse);

export const CollapsePanel = withInstall(_CollapsePanel);

export default Collapse;
