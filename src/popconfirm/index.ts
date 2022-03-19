import _Popconfirm from './popconfirm';
import { withInstall, WithInstallType } from '../utils/withInstall';
import { TdPopconfirmProps } from './type';

import './style';

export * from './type';
export type PopconfirmProps = TdPopconfirmProps;

export const Popconfirm: WithInstallType<typeof _Popconfirm> = withInstall(_Popconfirm);
export default Popconfirm;
