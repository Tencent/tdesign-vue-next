import { withInstall } from '@td/adapter-utils';
import type { TdCollapsePanelProps, TdCollapseProps } from '@td/intel/collapse/type';
import _Collapse from './collapse';
import _CollapsePanel from './collapse-panel';

import './style';

export * from '@td/intel/collapse/type';

export type CollapseProps = TdCollapseProps;
export type CollapsePanelProps = TdCollapsePanelProps;

export const Collapse = withInstall(_Collapse);

export const CollapsePanel = withInstall(_CollapsePanel);

export default Collapse;
