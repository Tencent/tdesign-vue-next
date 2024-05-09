import withInstall from '../utils/withInstall';

import _Collapse from './collapse';
import _CollapsePanel from './collapse-panel';
import { TdCollapseProps, TdCollapsePanelProps } from './type';

import './style';

export * from './type';

export type CollapseProps = TdCollapseProps;
export type CollapsePanelProps = TdCollapsePanelProps;

export const Collapse = withInstall(_Collapse);

export const CollapsePanel = withInstall(_CollapsePanel);

export default Collapse;
