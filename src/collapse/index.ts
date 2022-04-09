import _Collapse from './collapse';
import _CollapsePanel from './collapse-panel';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdCollapseProps } from './type';

import './style';

export * from './type';
export type CollapseProps = TdCollapseProps;

export const Collapse: WithInstallType<typeof _Collapse> = withInstall(_Collapse);

export const CollapsePanel: WithInstallType<typeof _CollapsePanel> = withInstall(_CollapsePanel);

export default Collapse;
