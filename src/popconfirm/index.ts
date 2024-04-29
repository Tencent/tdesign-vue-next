import withInstall from '../utils/withInstall';

import _Popconfirm from './popconfirm';
import { TdPopconfirmProps } from './type';

import './style';

export * from './type';
export type PopconfirmProps = TdPopconfirmProps;

export const Popconfirm = withInstall(_Popconfirm);
export default Popconfirm;
