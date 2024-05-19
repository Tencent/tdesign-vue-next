import type { TdPopconfirmProps } from '@td/intel/components/popconfirm/type';
import { withInstall } from '@td/adapter-utils';
import _Popconfirm from './popconfirm';

import './style';

export * from '@td/intel/components/popconfirm/type';
export type PopconfirmProps = TdPopconfirmProps;

export const Popconfirm = withInstall(_Popconfirm);
export default Popconfirm;
