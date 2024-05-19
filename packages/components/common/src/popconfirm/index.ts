import _Popconfirm from './popconfirm';
import { withInstall } from '@td/adapter-utils';
import { TdPopconfirmProps } from '@td/intel/popconfirm/type';

import './style';

export * from '@td/intel/popconfirm/type';
export type PopconfirmProps = TdPopconfirmProps;

export const Popconfirm = withInstall(_Popconfirm);
export default Popconfirm;
