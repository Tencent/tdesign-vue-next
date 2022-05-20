import _Cascader from './cascader';
import { withInstall, WithInstallType } from '../utils/withInstall';

import './style';

export * from './type';

export const Cascader: WithInstallType<typeof _Cascader> = withInstall(_Cascader);

export default Cascader;
