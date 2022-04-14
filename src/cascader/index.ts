import _Cascader from './cascader';
import _CascaderPanel from './cascader-panel';
import { withInstall, WithInstallType } from '../utils/withInstall';

import './style';

export * from './type';

export const CascaderPanel: WithInstallType<typeof _CascaderPanel> = withInstall(_CascaderPanel);
export const Cascader: WithInstallType<typeof _Cascader> = withInstall(_Cascader);

export default Cascader;
