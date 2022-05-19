import _Collapse from './collapse';
import _CollapsePanel from './collapse-panel';
import withInstall from '../utils/withInstall';
import { TdCollapseProps } from './type';

import './style';

export * from './type';
export type CollapseProps = TdCollapseProps;

export const Collapse = withInstall(_Collapse);

export const CollapsePanel = withInstall(_CollapsePanel);

export default Collapse;
